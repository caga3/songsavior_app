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
import SevenDigitalService from '../constants/SevenDigitalService';
import {slugText} from '../constants/Helper';
import SpotifyService from '../constants/SpotifyService';

type Category = {
  id: string;
  name: string;
  title: string;
  images?: {url: string}[];
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

  const handleCheckboxChange = (obj: CheckboxState) => {
    setCheckboxes(prevCheckboxes => {
      const updatedCheckboxes: Record<string, {checked: boolean}> = {};
      Object.keys(prevCheckboxes).forEach(key => {
        updatedCheckboxes[key] = {checked: false};
      });
      updatedCheckboxes[obj.name] = {
        checked: !prevCheckboxes[obj.name]?.checked,
      };
      const categoryType = obj.name;
      !prevCheckboxes[obj.name]?.checked
        ? handleSelectedCheckBox(categoryType)
        : handleSelectedCheckBox('');
      return updatedCheckboxes;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filteredCategories = [];
        if (searchArtists && searchArtists.length > 2) {
        } else {
          if (byGenres) {
            filteredCategories = await SevenDigitalService.fetchGenres();
          } else if (byArtists && searchArtists === '') {
            const tokenObj = await SpotifyService.getAccessToken();
            if (tokenObj) {
              filteredCategories = await SpotifyService.fetchRandomArtists(
                tokenObj,
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
            <Pressable onPress={() => handleCheckboxChange(item)}>
              {byArtists && item.images && item.images.length > 0 && (
                <Image
                  source={{uri: item.images[0].url}}
                  style={(Typography.imgFluid, styles.gridImageDisable)}
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

              <Text
                style={byArtists ? styles.gridTextDisable : styles.gridText}>
                {item.title}
              </Text>
              {!byArtists && (
                <CheckBox
                  style={styles.checkbox}
                  checked={checkboxes[item.name]?.checked}
                  onPress={() => handleCheckboxChange(item)}
                />
              )}
            </Pressable>
          </View>
        )}
      />
      {byGenres && (
        <Text
          style={[
            Typography.mt,
            Typography.size,
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
  gridImageDisable: {
    borderRadius: 8,
    width: 175,
    height: 96,
    opacity: 0.4,
  },
  gridText: {
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  gridTextDisable: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    opacity: 0.5,
  },
  checkbox: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    right: 0,
  },
});

export default Categories;
