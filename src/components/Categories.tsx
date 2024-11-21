import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {View, Text, CheckBox} from './Themed';
import {useFilter} from '../context/FilterCategoryContext';
import Typography from '../constants/Typography';
import SpotifyService from '../constants/SpotifyService';
import {slugText} from '../constants/Helper';

type Category = {
  id: string;
  name: string;
  icons: {url: string}[];
  images: {url: string}[];
};
interface Checkbox {
  checked: boolean;
}

interface CheckboxState {
  id: string;
  name: string;
}

// Main component to display Spotify categories
const Categories: React.FC = () => {
  const image_path = 'https://www.songsavior.com/wp-content/uploads';
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkboxes, setCheckboxes] = useState<{[key: string]: Checkbox}>({});
  const screenWidth = Dimensions.get('window').width;
  const calculatedWidth = screenWidth * 0.5 - 39;
  const {byGenres, byArtists, searchArtists, handleSelectedCheckBox} =
    useFilter();

  const handleCheckboxChange = (obj: CheckboxState, isGenres: boolean) => {
    setCheckboxes(prevCheckboxes => {
      const updatedCheckboxes: Record<string, {checked: boolean}> = {};
      Object.keys(prevCheckboxes).forEach(key => {
        updatedCheckboxes[key] = {checked: false};
      });
      updatedCheckboxes[obj.id] = {checked: !prevCheckboxes[obj.id]?.checked};
      const categoryType = isGenres ? obj.name.toLowerCase() : obj.id;
      !prevCheckboxes[obj.id]?.checked
        ? handleSelectedCheckBox(categoryType)
        : null;
      return updatedCheckboxes;
    });
  };

  useEffect(() => {
    const filterCategories = (
      categoryData: Category[],
      categoryNames: string[],
    ): Category[] => {
      return categoryData.filter(category =>
        categoryNames.includes(category.name),
      );
    };
    const fetchData = async () => {
      try {
        const token = await SpotifyService.getAccessToken();
        if (token) {
          let filteredCategories;
          if (searchArtists && searchArtists.length > 2) {
            filteredCategories = await SpotifyService.searchArtists(
              token,
              searchArtists,
            );
          } else {
            if (byGenres) {
              const categoryNames = [
                'Pop',
                'Rock',
                'Country',
                'Hip-Hop',
                'R&B',
                'Dance/Electronic',
              ];
              const categoriesData = await SpotifyService.fetchGenres(token);
              filteredCategories = filterCategories(
                categoriesData,
                categoryNames,
              );
            } else if (byArtists && searchArtists === '') {
              filteredCategories = await SpotifyService.fetchRandomArtists(
                token,
              );
            }
          }
          setCategories(filteredCategories);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    setLoading(true);
    fetchData();
  }, [byGenres, byArtists, searchArtists]);

  if (loading) {
    return (
      <View style={Typography.vertCenter}>
        <ActivityIndicator
          size={'large'}
          color="rgba(255,255,255, 0.35)"
          style={{opacity: 0.35, height: 400}}
        />
      </View>
    );
  }

  return (
    <View style={styles.gridView}>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        numColumns={2}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={[styles.grid, {width: calculatedWidth}]} key={item.id}>
            <Pressable onPress={() => handleCheckboxChange(item, byGenres)}>
              {byArtists && item.images && item.images.length > 0 && (
                <Image
                  source={{uri: item.images[0].url}}
                  style={(Typography.imgFluid, styles.gridImage)}
                />
              )}

              {byGenres && (
                <Image
                  source={{
                    uri: `${image_path}/category/${slugText(item.name)}.png`,
                  }}
                  style={(Typography.imgFluid, styles.gridImage)}
                />
              )}

              <Text style={styles.gridText}>{item.name}</Text>
              <CheckBox
                style={styles.checkbox}
                checked={checkboxes[item.id]?.checked}
                onPress={() => handleCheckboxChange(item, byGenres)}
              />
            </Pressable>
          </View>
        )}
      />
      {byGenres && (
        <Text
          style={[
            Typography.h3,
            Typography.mt,
            Typography.textCenter,
            Typography.highlight,
          ]}>
          More genres will be available post-beta.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginVertical: 10,
  },
  grid: {
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 8,
    position: 'relative',
  },
  gridImage: {
    borderRadius: 8,
    width: 175,
    height: 96,
  },
  gridText: {
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  checkbox: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    right: 0,
  },
});

export default Categories;
