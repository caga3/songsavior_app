import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Pressable,
  ListRenderItem,
} from 'react-native';

import {View, Text} from './Themed';
import Typography from '../constants/Typography';
import HbarIcon from '../constants/icons/HBarIcon';
import LocationIcon from '../constants/icons/LocationIcon';
import DownArrow from '../constants/icons/DownArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestApiServer from '../constants/RestApiServer';
import {sortWithMiddleFirst} from '../constants/Helper';

interface DataItem {
  user_id: string;
  cnt: number;
  total_avg_vote: string;
  user_display_name: string;
  avatar_url: string;
}

interface Props {
  nav: {
    navigate: (
      screenName: string,
      params?: {
        item?: string;
      },
    ) => void;
  };
}

const OverallLeader: React.FC<Props> = ({nav}) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window'));
  const [showLeaderboard, setShowLeaderboard] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const orderPosition = ['2nd', '1st', '3rd'];
  const default_avatar =
    'https://www.songsavior.com/wp-content/uploads/2024/07/default_avatar.jpg';

  const handleProfileScreen = ($item: string) => {
    nav.navigate('Profile', {
      item: $item,
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
          const responds = await RestApiServer.fetchLeaderBoard(tokenData);
          if (responds) {
            setShowLeaderboard(responds);
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

  const renderItemRanked = () => {
    const reSort = sortWithMiddleFirst(showLeaderboard);
    return reSort.map((item: DataItem, index: number) => {
      if (index < 3) {
        const totalAvgVote = parseFloat(item.total_avg_vote);
        const votePercentage = totalAvgVote.toFixed(2);
        return (
          <Pressable
            key={index}
            onPress={() => handleProfileScreen(item.user_id)}>
            <View id={`place-${orderPosition[index]}`}>
              {index === 1 && (
                <Image
                  source={require('../assets/images/wings.png')}
                  style={styles.wings}
                />
              )}

              <Image
                source={{uri: item.avatar_url || default_avatar}}
                style={[styles.rankImage, index === 1 ? styles.firstPlace : {}]}
              />
              <Text
                style={[
                  Typography.size2,
                  Typography.bold,
                  Typography.highlight,
                  Typography.textCenter,
                ]}>
                {orderPosition[index]}
              </Text>
              <Text
                style={[Typography.h3, Typography.textCenter, Typography.mb0]}>
                {item.user_display_name}
              </Text>
            </View>
            <View
              style={[
                Typography.mt3,
                Typography.tintBkgGreen,
                styles.accuracy,
                styles.accuracyRank,
              ]}>
              <View style={[Typography.flex, Typography.marginAuto]}>
                <Text style={[Typography.semibold, Typography.green]}>
                  {votePercentage}%
                </Text>
                <Text
                  style={[
                    Typography.semibold,
                    Typography.text4,
                    Typography.ms,
                  ]}>
                  ({item.cnt})
                </Text>
              </View>
            </View>
          </Pressable>
        );
      }
    });
  };

  const renderItem: ListRenderItem<DataItem> = ({item, index}) => (
    <Pressable key={index} onPress={() => handleProfileScreen(item.user_id)}>
      {index > 2 && (
        <>
          <View style={styles.grid}>
            <View style={styles.group}>
              <View style={Typography.flex}>
                <Text
                  style={[Typography.size1, Typography.me, styles.rankText]}>
                  {index + 1}
                </Text>
                <DownArrow />
                <Image
                  source={{uri: item.avatar_url || default_avatar}}
                  style={styles.gridImage}
                />
              </View>
            </View>
            <View style={{width: screenWidth.width - (40 + 118)}}>
              <View style={[Typography.flexBetween, Typography.flexTop]}>
                <Text style={[Typography.h3, Typography.mb0]}>
                  {item.user_display_name}
                </Text>
                <View style={[Typography.tintBkgGreen, styles.accuracy]}>
                  <Text style={[Typography.semibold, Typography.green]}>
                    {parseFloat(item.total_avg_vote).toFixed(2)} Accuracy
                  </Text>
                </View>
              </View>
              <View style={Typography.flexBetween}>
                <View style={[Typography.hide, Typography.flex]}>
                  <LocationIcon />
                  <Text
                    style={[Typography.text4, Typography.ms, Typography.tight]}>
                    ---
                  </Text>
                </View>
                <Text style={[Typography.text4, Typography.ms]}>
                  {item.cnt} Songs Rated
                </Text>
              </View>
            </View>
          </View>
          <HbarIcon style={styles.hbar} />
        </>
      )}
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
        <View
          style={[
            Typography.flexBetween,
            Typography.flexStretch,
            styles.marginTop,
          ]}>
          {renderItemRanked()}
        </View>
      </View>
      <View style={styles.containerWrapper}>
        <FlatList
          scrollEnabled={true}
          data={showLeaderboard}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 24,
  },
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
  group: {
    width: 118,
  },
  hbar: {
    marginTop: 6,
    marginBottom: 4,
  },
  wings: {
    position: 'absolute',
    top: '-16%',
    left: '-65%',
    width: 292,
    height: 117,
  },
  rankImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 3,
    marginTop: 40,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  firstPlace: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginTop: 0,
  },
  gridImage: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 24,
    width: 48,
    height: 48,
  },
  accuracy: {
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 24,
  },
  accuracyRank: {
    height: 28,
  },
});

export default OverallLeader;
