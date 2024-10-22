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

import TrackPlayer from 'react-native-track-player';

import {View, Text} from './Themed';
import Typography from '../constants/Typography';
import HbarIcon from '../constants/icons/HBarIcon';
import IconSvg from './IconsSvg';
import {setupPlayer} from '../constants/Player';
import PauseMiniIcon from '../constants/icons/PauseMiniIcon';
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
const OverallChart: React.FC<Props> = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window'));
  const [loading, setLoading] = useState(true);
  const [showChart, setShowChart] = useState<DataItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [_, setDuration] = useState(0);
  const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);

  const handlePlay = async ($item: any) => {
    if (currentTrackId !== $item.id) {
      if (isPlaying) {
        setIsPlaying(false);
        await TrackPlayer.stop();
      }
      setCurrentTrackId($item.id);
      setIsPlaying(true);
      await playerSetup($item);
    } else {
      if (isPlaying) {
        setIsPlaying(false);
        await TrackPlayer.pause();
      } else {
        setIsPlaying(true);
        await TrackPlayer.play();
      }
    }
  };

  const playerSetup = async (trackData: any) => {
    await TrackPlayer.reset();
    const artworkUrl = trackData?.image;
    const previewUrl = trackData?.track;
    const options = {
      id: 1,
      url: previewUrl,
      title: trackData?.title,
      artist: trackData?.artist,
      artwork: artworkUrl,
    };
    //setDuration(trackData?.duration_ms); // Real full Songs
    setDuration(29000); // Preview Songs
    TrackPlayer.add(options);
    await TrackPlayer.play();
  };

  useEffect(() => {
    setupPlayer();
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
    <Pressable onPress={() => handlePlay(item)}>
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
        <View style={{width: screenWidth.width - (40 + 118)}}>
          <View style={[Typography.flexBetweenStart]}>
            <View style={styles.groupName}>
              <Text
                style={[Typography.h3, Typography.mb0, styles.titleWrapper]}>
                {trimString(item.title, 26)}
              </Text>
            </View>
            <View style={[Typography.flexEnd, styles.rateWrapper]}>
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
              <View style={styles.rating}>
                <StarsIcon width="16" height="16" fill="#FFBF00" />
                <Text
                  style={[Typography.semibold, Typography.orange, styles.rate]}>
                  {item.avg}
                </Text>
              </View>
            </View>
          </View>
          <View style={Typography.flexBetween}>
            <Text style={Typography.tight}>{item.artist}</Text>
            <View style={Typography.flexBetween}>
              <View style={Typography.flex}>
                {currentTrackId === item.id && isPlaying ? (
                  <PauseMiniIcon />
                ) : (
                  <IconSvg
                    width="16"
                    height="16"
                    color="#FDF15D"
                    path="M4 2.66666V13.3333L12.6667 7.99999L4 2.66666Z"
                  />
                )}
                <Text style={Typography.ms}>{item.total}</Text>
              </View>
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
    width: 18,
    fontSize: 14,
  },
  titleWrapper: {
    fontSize: 15,
    lineHeight: 17,
  },
  group: {
    minWidth: 118,
  },
  hbar: {
    marginTop: 0,
    marginBottom: 6,
  },
  gridImage: {
    marginLeft: 8,
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  groupName: {
    width: '44%',
    paddingRight: 2,
  },
  category: {
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#262519',
  },
  rateWrapper: {
    width: '56%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#262112',
  },
  rate: {
    marginLeft: 2,
  },
});

export default OverallChart;
