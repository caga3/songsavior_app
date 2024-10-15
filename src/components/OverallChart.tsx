import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
} from 'react-native';

import {View, Text} from './Themed';
import Typography from '../constants/Typography';
import HbarIcon from '../constants/icons/HBarIcon';
import LocationIcon from '../constants/icons/LocationIcon';
import IconSvg from './IconsSvg';
import DownArrow from '../constants/icons/DownArrow';
import StarsIcon from '../constants/icons/StarsIcon';
import RestApiServer from '../constants/RestApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {trimString} from '../constants/Helper';

interface DataItem {
  id: number;
  song_id: string;
  avg: number;
  total: number;
  title: string;
  artist: string;
  track: string;
  image: string;
  genre: string;
}

interface Props {
  nav: {
    navigate: (
      screenName: string,
      params?: {
        allow: boolean;
        item?: string;
        filter?: string;
        redirect?: string;
      },
    ) => void;
  };
}
const OverallChart: React.FC<Props> = ({nav}) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window'));
  const [loading, setLoading] = useState(true);
  const [showChart, setShowChart] = useState<DataItem[]>([]);

  const handlePlayerScreen = ($item: string) => {
    nav.navigate('PlayerRating', {
      allow: false,
      item: $item,
      filter: 'track',
      redirect: 'Charts',
    });
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      setScreenWidth(Dimensions.get('window'));
    };
    const subscription = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );
    const fetchData = async () => {
      try {
        const tokenData = await AsyncStorage.getItem('userToken');
        if (tokenData) {
          const responds = await RestApiServer.fetchSongs(tokenData);
          if (responds) {
            setShowChart(responds);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => {
      subscription?.remove();
    };
  }, []);

  const renderItem: ListRenderItem<DataItem> = ({item, index}) => (
    <Pressable onPress={() => handlePlayerScreen(item.song_id)}>
      <View style={styles.grid}>
        <View style={styles.group}>
          <View style={Typography.flex}>
            <Text style={[Typography.size1, Typography.me, styles.rankText]}>
              {index + 1}
            </Text>
            <DownArrow />
            <Image source={{uri: item.image}} style={styles.gridImage} />
          </View>
        </View>
        <View style={{width: screenWidth.width - (50 + 118)}}>
          <View style={[Typography.flexBetween, Typography.flexTop]}>
            <Text style={[Typography.h3, Typography.mb0, styles.title]}>
              {trimString(item.title, 26)}
            </Text>
            <View style={Typography.flex}>
              <View style={[styles.category, Typography.me]}>
                <Text
                  style={[
                    Typography.semibold,
                    Typography.highlight,
                    Typography.uppercase,
                  ]}>
                  {item.genre}
                </Text>
              </View>
              <View style={[Typography.flex, styles.rating]}>
                <StarsIcon width="16" height="16" fill="#FFBF00" />
                <Text
                  style={[Typography.semibold, Typography.orange, styles.rate]}>
                  {item.avg}
                </Text>
              </View>
            </View>
          </View>
          <Text style={Typography.tight}>{item.artist}</Text>
          <View style={Typography.flexBetween}>
            <View style={[Typography.flex, Typography.hide]}>
              <LocationIcon />
              <Text style={[Typography.ms, Typography.text4, Typography.tight]}>
                Redditch, UK
              </Text>
            </View>
            <View style={Typography.flex}>
              <IconSvg
                width="16"
                height="16"
                color="#FDF15D"
                path="M4 2.66666V13.3333L12.6667 7.99999L4 2.66666Z"
              />
              <Text style={Typography.ms}>{item.total}</Text>
            </View>
          </View>
        </View>
      </View>
      <HbarIcon style={styles.hbar} />
    </Pressable>
  );

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
    <>
      <View style={styles.containerWrapper}>
        <FlatList
          scrollEnabled={false}
          data={showChart}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    marginTop: 15,
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  rankText: {
    width: 20,
  },
  title: {
    width: 118,
  },
  group: {
    minWidth: 118,
  },
  hbar: {
    marginTop: 0,
    marginBottom: 6,
  },
  gridImage: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    width: 56,
    height: 56,
  },
  category: {
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#262519',
  },
  rating: {
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#262112',
  },
  rate: {
    marginLeft: 2,
  },
});

export default OverallChart;
