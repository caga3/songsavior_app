import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useRoute, RouteProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Text, View} from '../components/Themed';
import ModalFull from '../components/ModalFull';
import ProfileNav from '../components/ProfileNav';
import Typography from '../constants/Typography';
import GoBack from '../components/GoBack';
import LinearGradient from 'react-native-linear-gradient';
import LocationIcon from '../constants/icons/LocationIcon';
import HBars from '../constants/icons/HBarIcon';
import IconSvg from '../components/IconsSvg';
import VBarIcon from '../constants/icons/VBarIcon';
import RestApiServer from '../constants/RestApiServer';
import {slugText} from '../constants/Helper';
import {RootAppStackParamList} from '../types/types';
import AddIcon from '../constants/icons/AddIcon';
import GraphArrowIcon from '../constants/icons/GraphArrowIcon';
import AccuracyIcon from '../constants/icons/AccuracyIcon';
import GraphIcon from '../constants/icons/GraphIcon';
import FollowIcon from '../constants/icons/FollowIcon';
import {SITE_ROOT} from '../../global';
import MinusIcon from '../constants/icons/MinusIcon';
import {useAuth} from '../context/AuthContext';
import ModalListing from '../components/ModalListing';
import ModalUsers from '../components/ModalUsers';
import StarsIcon from '../constants/icons/StarsIcon';

type ProfileScreenProp = NativeStackNavigationProp<RootAppStackParamList>;

type RootStackParamList = {
  Profile: {item?: string};
};
interface CollectItem {
  song_id: string;
  image: string;
  title: string;
}

interface RatedItem {
  song_id: string;
  vote: number;
  image: string;
  title: string;
}
interface FollowProp {
  ID: number;
  user_display_name: string;
  avatar_url: string;
  online: any;
}
interface DataItem {
  id: number;
  city: string;
  country: string;
  user_level: string;
  user_badges: string;
  avatar_url: string;
  user_display_name: string;
  followers: number;
  following: number;
  followings: any;
  rated: any;
}

interface ProfileProps {
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

interface StarsIconProps {
  rating: number;
}

const StarRating: React.FC<StarsIconProps> = ({rating}) => {
  const maxStars = 5;
  return (
    <View style={Typography.flex}>
      {Array.from({length: maxStars}, (_, index) => (
        <StarsIcon
          key={index}
          fill={index < rating ? '#fdf15d' : '#717172'}
          width="18"
          height="18"
        />
      ))}
    </View>
  );
};

const ProfileScreen: React.FC<ProfileProps> = ({nav}) => {
  const route = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const navigation = useNavigation<ProfileScreenProp>();
  const routes = route.params;
  const {userInfo, userToken} = useAuth();
  const [showProfile, setShowProfile] = useState<DataItem>();
  const [loading, setLoading] = useState(true);
  const [isFollowers, setIsFollowers] = useState(false);
  const [addFollow, setAddFollow] = useState(0);
  const [groupBy, setGroupBy] = useState('game');
  const [totalRated, setTotalRated] = useState(0);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState();
  const [likes, setLikes] = useState<CollectItem[]>([]);
  const [playlist, setPlaylist] = useState<CollectItem[]>([]);
  const [followings, setFollowings] = useState<FollowProp[]>([]);
  const [rated, setRated] = useState<RatedItem[]>([]);
  const [ranking, setRanking] = useState(0);
  const [modalLevelVisible, setModalLevelVisible] = useState(false);
  const [modalBadgesVisible, setModalBadgesVisible] = useState(false);
  const [modalPlaylistVisible, setModalPlaylistVisible] = useState(false);
  const [modalLikesVisible, setModalLikesVisible] = useState(false);
  const [modalFollowingVisible, setModalFollowingVisible] = useState(false);
  const [modalRatedVisible, setModalRatedVisible] = useState(false);
  const getUserInfo =
    typeof userInfo === 'string' ? JSON.parse(userInfo) : null;
  const user_id = routes && routes.item ? routes.item : getUserInfo.id;
  const default_avatar = `${SITE_ROOT}uploads/2024/07/default_avatar.jpg`;
  const default_song = require('../assets/images/card-image.jpg');

  const handleSelection = (type: string) => {
    setGroupBy(type);
  };

  // Go to Messages
  const handleMessageAction = () => {
    if (getUserInfo.id !== user_id) {
      navigation.navigate('Chat', {
        recipient_id: user_id,
      });
    } else {
      navigation.navigate('Messages');
    }
  };

  // Follow a User
  const handleFollowAction = async () => {
    setIsFollowers(true);
    if (getUserInfo) {
      const msg = await RestApiServer.toggleFollow(
        user_id,
        getUserInfo.id,
        userToken,
      );
      if (msg) {
        setAddFollow(msg.followers);
      }
    }
  };

  // UnFollow a User
  const handleUnFollowAction = async () => {
    setIsFollowers(false);
    if (getUserInfo) {
      const msg = await RestApiServer.toggleFollow(
        user_id,
        getUserInfo.id,
        userToken,
      );
      if (msg) {
        setAddFollow(msg.followers);
      }
    }
  };

  const badgeImages: {[key: string]: any} = {
    default: {
      name: 'Fan',
      img: require('../assets/images/badges/fan.png'),
      range: 0,
    },
    superfan: {
      name: 'Super Fan',
      img: require('../assets/images/badges/superfan.png'),
      range: 25,
    },
    roadie: {
      name: 'Roadie',
      img: require('../assets/images/badges/roadie.png'),
      range: 50,
    },
    streetteamleader: {
      name: 'Street Team Leader',
      img: require('../assets/images/badges/streetteamleader.png'),
      range: 100,
    },
    promoter: {
      name: 'Promoter',
      img: require('../assets/images/badges/promoter.png'),
      range: 200,
    },
  };

  const levelImages: {[key: string]: any} = {
    default: {
      name: 'Beginner Record',
      img: require('../assets/images/levels/beginner.png'),
      range: [0, 69.9],
    },
    silver: {
      name: 'Silver Record',
      img: require('../assets/images/levels/silver.png'),
      range: [70, 79.9],
    },
    gold: {
      name: 'Gold Record',
      img: require('../assets/images/levels/gold.png'),
      range: [80, 89.9],
    },
    platinum: {
      name: 'Platinum Record',
      img: require('../assets/images/levels/platinum.png'),
      range: [90, 94.9],
    },
    diamond: {
      name: 'Diamond Record',
      img: require('../assets/images/levels/diamond.png'),
      range: [95, 100],
    },
  };

  const handlePlayerScreen = ($item: string) => {
    nav.navigate('PlayerRating', {
      allow: false,
      item: $item,
      filter: 'track',
      redirect: 'Charts',
    });
  };

  const handleMorePlaylist = () => {
    setModalPlaylistVisible(true);
  };

  const handleMoreLikes = () => {
    setModalLikesVisible(true);
  };

  const handleMoreFollowing = () => {
    setModalFollowingVisible(true);
  };

  const handleMoreRated = () => {
    setModalRatedVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userToken) {
          const responds = await RestApiServer.fetchProfileStats(
            user_id,
            getUserInfo.id,
            userToken,
          );
          const likesData = await RestApiServer.fetchLikes(
            getUserInfo.id,
            userToken,
          );
          if (likesData && typeof likesData === 'object') {
            const likesArray = Object.keys(likesData).map(key => {
              const item = likesData[key];
              return {
                song_id: item.song_id,
                image: item.image,
                title: item.title,
              };
            });
            setLikes(likesArray);
          } else {
            setLikes([]); // Set empty array if no data
          }
          const playlistData = await RestApiServer.fetchPlaylist(
            getUserInfo.id,
            userToken,
          );
          if (playlistData && typeof playlistData === 'object') {
            const playlistArray = Object.keys(playlistData).map(key => {
              const item = playlistData[key];
              return {
                song_id: item.song_id,
                image: item.image,
                title: item.title,
              };
            });
            setPlaylist(playlistArray);
          } else {
            setPlaylist([]); // Set empty array if no data
          }
          if (responds) {
            if (getUserInfo.id !== user_id) {
              if (responds.is_following > 0) {
                setIsFollowers(true);
              }
            }
            setRated(responds.rated);
            setFollowings(responds.followings);
            setAddFollow(responds.followers);
            setShowProfile(responds);
            setTotalRated(responds.votes);
            // setDisplayName(responds.user_display_name);
            setScore(responds.score);
            setAccuracy(responds.accuracy);
            setRanking(responds.rank);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [showProfile?.id, userInfo]);

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
      {showProfile && (
        <SafeAreaView style={{flex: 1}}>
          <View style={{flexGrow: 1}}>
            <Image
              source={{
                uri: showProfile.avatar_url || default_avatar,
              }}
              style={[Typography.backgroundImage, styles.backgroundImage]}
            />
            <LinearGradient
              colors={['rgba(19,19,20,0)', 'rgba(19,19,20,1)']}
              style={styles.backgroundGradient}
            />
            <ProfileNav show={false} />
            <GoBack />
            <View style={styles.containerInfo}>
              <View
                style={[
                  Typography.flexCenter,
                  Typography.flexStart,
                  Typography.mb,
                ]}>
                <Image
                  source={{
                    uri: showProfile.avatar_url || default_avatar,
                  }}
                  style={styles.profileImg}
                />
                <View>
                  <Text style={[Typography.size2, Typography.mb3]}>
                    {showProfile && showProfile.user_display_name
                      ? showProfile.user_display_name
                      : ''}
                  </Text>
                  <View>
                    {showProfile.city && (
                      <View style={Typography.flex}>
                        <LocationIcon />
                        <Text style={[Typography.ms, Typography.text4]}>
                          {showProfile.city}
                          {showProfile.country
                            ? `, ${showProfile.country}`
                            : ''}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={Typography.flex}>
                    <TouchableOpacity
                      onPress={() => setModalBadgesVisible(true)}>
                      <Image
                        source={
                          badgeImages[slugText(showProfile.user_badges)].img
                        }
                        style={styles.badges}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setModalLevelVisible(true)}>
                      <Image
                        source={
                          levelImages[slugText(showProfile.user_level)].img
                        }
                        style={styles.level}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={[{flexGrow: 1}]}>
              <ScrollView style={{flex: 1, ...styles.scrollView}}>
                {showProfile.id !== Number(getUserInfo?.id) && (
                  <View style={[Typography.flexBetween, Typography.mb]}>
                    <View style={styles.buttonWrapper}>
                      <TouchableOpacity
                        style={styles.buttonIcon}
                        onPress={handleMessageAction}>
                        <IconSvg path="M12 12V12.01M8 12V12.01M16 12V12.01M3 20L4.3 16.1C3.17644 14.4383 2.76999 12.4704 3.15622 10.5623C3.54244 8.65419 4.69506 6.93567 6.39977 5.72628C8.10447 4.51688 10.2453 3.8989 12.4241 3.98724C14.6029 4.07559 16.6715 4.86424 18.2453 6.20656C19.819 7.54889 20.7909 9.35354 20.9801 11.285C21.1693 13.2164 20.563 15.1432 19.2739 16.7071C17.9848 18.271 16.1007 19.3656 13.9718 19.7874C11.8429 20.2091 9.6142 19.9293 7.7 19L3 20Z" />
                        <Text style={Typography.ms}>Message</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonWrapper}>
                      {isFollowers ? (
                        <TouchableOpacity
                          style={[styles.buttonIcon, styles.buttonTeal]}
                          onPress={handleUnFollowAction}>
                          <MinusIcon />
                          <Text style={Typography.ms}>Unfollow</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[styles.buttonIcon, styles.buttonTeal]}
                          onPress={handleFollowAction}>
                          <AddIcon />
                          <Text style={Typography.ms}>Follow</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
                <View>
                  {groupBy === 'game' ? (
                    <View>
                      <Text style={[Typography.h2, Typography.semibold]}>
                        Stats
                      </Text>
                      <View style={Typography.card}>
                        <View style={Typography.flexBetween}>
                          <View style={Typography.flex}>
                            <GraphArrowIcon />
                            <Text style={[Typography.sizeSm, Typography.ms]}>
                              Score
                            </Text>
                          </View>
                          <Text style={Typography.highlight}>{score}</Text>
                        </View>
                        <View style={Typography.flexBetween}>
                          <View style={Typography.flex}>
                            <IconSvg
                              width="20"
                              height="20"
                              color="#FDF15D"
                              path="M12.375 4C12.5977 4 12.8011 4.12654 12.8996 4.32642L15.1708 8.93229L20.2488 9.66887C20.4693 9.70085 20.6526 9.85542 20.7214 10.0675C20.7902 10.2796 20.7327 10.5124 20.573 10.668L16.8932 14.253L17.7609 19.3154C17.7985 19.5352 17.7082 19.7573 17.5279 19.8883C17.3476 20.0193 17.1086 20.0364 16.9115 19.9325L12.3802 17.5426L7.83805 19.9327C7.64093 20.0365 7.40206 20.0192 7.22189 19.8882C7.04172 19.7571 6.95149 19.5351 6.98914 19.3154L7.85681 14.253L4.17699 10.668C4.01733 10.5124 3.9598 10.2796 4.02862 10.0675C4.09744 9.85542 4.28066 9.70085 4.50117 9.66887L9.5792 8.93229L11.8504 4.32642C11.9489 4.12654 12.1523 4 12.375 4Z"
                            />
                            <Text style={[Typography.sizeSm, Typography.ms]}>
                              Songs Rated
                            </Text>
                          </View>
                          <Text style={Typography.highlight}>{totalRated}</Text>
                        </View>
                        <View style={[Typography.flexBetween, Typography.mt3]}>
                          <View style={Typography.flex}>
                            <AccuracyIcon fill="#fdf15d" />
                            <Text style={[Typography.sizeSm, Typography.ms]}>
                              Rating Accuracy
                            </Text>
                          </View>
                          <Text style={Typography.highlight}>{accuracy}%</Text>
                        </View>
                        <View style={[Typography.flexBetween, Typography.mt3]}>
                          <View style={Typography.flex}>
                            <GraphIcon />
                            <Text style={[Typography.sizeSm, Typography.ms]}>
                              Ranking
                            </Text>
                          </View>
                          <Text style={Typography.highlight}>{ranking}</Text>
                        </View>
                      </View>
                      <View style={Typography.card}>
                        <View style={styles.divider}>
                          <VBarIcon />
                        </View>
                        <View style={Typography.flexAround}>
                          <View>
                            <View style={Typography.flexCenter}>
                              <FollowIcon />
                              <Text style={[Typography.sizeSm, Typography.ms]}>
                                Followers
                              </Text>
                            </View>
                            <Text
                              style={[Typography.text4, Typography.textCenter]}>
                              {addFollow}
                            </Text>
                          </View>
                          <View>
                            <View style={Typography.flexCenter}>
                              <IconSvg
                                width="22"
                                height="22"
                                color="#FDF15D"
                                path="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M21 21V19C20.9949 18.1172 20.6979 17.2608 20.1553 16.5644C19.6126 15.868 18.8548 15.3707 18 15.15M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM3 21V19C3 17.9391 3.42143 16.9217 4.17157 16.1716C4.92172 15.4214 5.93913 15 7 15H11C12.0609 15 13.0783 15.4214 13.8284 16.1716C14.5786 16.9217 15 17.9391 15 19V21H3Z"
                              />
                              <Text style={[Typography.sizeSm, Typography.ms]}>
                                Following
                              </Text>
                            </View>
                            <Text
                              style={[Typography.text4, Typography.textCenter]}>
                              {showProfile.following}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Text style={[Typography.h2, Typography.semibold]}>
                        Achievements
                      </Text>
                      <View style={Typography.card}>
                        <View style={Typography.flex}>
                          <Image
                            source={require('../assets/images/achievements/rookie.png')}
                            style={styles.achievements}
                          />
                          <Image
                            source={require('../assets/images/achievements/rookie.png')}
                            style={styles.achievements}
                          />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={Typography.flexAroundStart}>
                        <Text style={[Typography.h2, Typography.semibold]}>
                          Playlists
                        </Text>
                        <Text
                          style={[Typography.muted]}
                          onPress={handleMorePlaylist}>
                          View More {'>'}
                        </Text>
                      </View>
                      <View style={Typography.card}>
                        <FlatList
                          data={playlist.slice(0, 3)}
                          scrollEnabled={false}
                          keyExtractor={(_item, index) => index.toString()}
                          renderItem={({item, index}) => {
                            return (
                              <Pressable
                                key={index}
                                style={[Typography.flex, Typography.my]}
                                onPress={() =>
                                  handlePlayerScreen(item.song_id)
                                }>
                                <Image
                                  source={{uri: item.image || default_song}}
                                  style={styles.gridImage}
                                />
                                <Text
                                  style={[
                                    Typography.text,
                                    Typography.size,
                                    Typography.bold,
                                  ]}>
                                  {item.title}
                                </Text>
                              </Pressable>
                            );
                          }}
                        />
                      </View>

                      <View style={Typography.flexAroundStart}>
                        <Text style={[Typography.h2, Typography.semibold]}>
                          Rated Songs
                        </Text>
                        <Text
                          style={[Typography.muted]}
                          onPress={handleMoreRated}>
                          View More {'>'}
                        </Text>
                      </View>
                      <View style={Typography.card}>
                        <FlatList
                          data={rated.slice(0, 3)}
                          scrollEnabled={false}
                          keyExtractor={(_item, index) => index.toString()}
                          renderItem={({item, index}) => {
                            return (
                              <Pressable
                                key={index}
                                style={[Typography.flex, Typography.my]}
                                onPress={() =>
                                  handlePlayerScreen(item.song_id)
                                }>
                                <Image
                                  source={{uri: item.image || default_song}}
                                  style={styles.gridImage}
                                />
                                <View style={[Typography.flex, styles.wrap]}>
                                  <Text
                                    style={[
                                      Typography.text,
                                      Typography.size,
                                      Typography.bold,
                                    ]}>
                                    {item.title}
                                  </Text>
                                </View>
                                <View style={Typography.flex}>
                                  <StarRating rating={item.vote} />
                                </View>
                              </Pressable>
                            );
                          }}
                        />
                      </View>

                      <View style={Typography.flexAroundStart}>
                        <Text style={[Typography.h2, Typography.semibold]}>
                          Following
                        </Text>
                        <Text
                          style={[Typography.muted]}
                          onPress={handleMoreFollowing}>
                          View More {'>'}
                        </Text>
                      </View>
                      <View style={Typography.card}>
                        <FlatList
                          data={followings.slice(0, 3)}
                          scrollEnabled={false}
                          keyExtractor={(_item, index) => index.toString()}
                          renderItem={({item, index}) => {
                            return (
                              <View
                                key={index}
                                style={[Typography.flex, Typography.my]}>
                                <Image
                                  source={{
                                    uri: item.avatar_url || default_avatar,
                                  }}
                                  style={styles.gridImage}
                                />
                                <Text
                                  style={[
                                    Typography.text,
                                    Typography.size,
                                    Typography.bold,
                                  ]}>
                                  {item.user_display_name} {item.online}
                                </Text>
                              </View>
                            );
                          }}
                        />
                      </View>

                      <View style={Typography.flexAroundStart}>
                        <Text style={[Typography.h2, Typography.semibold]}>
                          Likes
                        </Text>
                        <Text
                          style={[Typography.muted]}
                          onPress={handleMoreLikes}>
                          View More {'>'}
                        </Text>
                      </View>
                      <View style={Typography.card}>
                        <FlatList
                          data={likes.slice(0, 3)}
                          scrollEnabled={false}
                          keyExtractor={(_item, index) => index.toString()}
                          renderItem={({item, index}) => {
                            return (
                              <Pressable
                                key={index}
                                style={[Typography.flex, Typography.my]}
                                onPress={() =>
                                  handlePlayerScreen(item.song_id)
                                }>
                                <Image
                                  source={{uri: item.image || default_song}}
                                  style={styles.gridImage}
                                />
                                <Text
                                  style={[
                                    Typography.text,
                                    Typography.size,
                                    Typography.bold,
                                  ]}>
                                  {item.title} {item.song_id}
                                </Text>
                              </Pressable>
                            );
                          }}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </ScrollView>
              <View
                style={[styles.buttonContainer, Typography.tab, Typography.mb]}>
                <View style={styles.buttonWrapper}>
                  <Button
                    style={
                      groupBy === 'game'
                        ? [Typography.button, styles.button]
                        : [Typography.tab, styles.button]
                    }
                    onPress={() => handleSelection('game')}
                    label="Game"
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <Button
                    style={
                      groupBy === 'playlist'
                        ? [Typography.button, styles.button]
                        : [Typography.tab, styles.button]
                    }
                    onPress={() => handleSelection('playlist')}
                    label="Music"
                  />
                </View>
              </View>
              <ModalFull
                isVisible={modalLevelVisible}
                onClose={() => setModalLevelVisible(false)}>
                <View>
                  <Text style={[Typography.h2, Typography.semibold]}>
                    Your Current Level
                  </Text>
                  <View style={{marginBottom: 10}}>
                    {levelImages[slugText(showProfile.user_level)] && (
                      <View style={{marginLeft: -10, ...Typography.flex}}>
                        <Image
                          source={
                            levelImages[slugText(showProfile.user_level)].img
                          }
                          style={styles.level}
                        />
                        <View style={{marginLeft: 5}}>
                          <Text style={styles.badgeText}>
                            {levelImages[slugText(showProfile.user_level)].name}
                          </Text>
                          <Text style={styles.badgeText2}>
                            {
                              levelImages[slugText(showProfile.user_level)]
                                .range[0]
                            }
                            % -{' '}
                            {
                              levelImages[slugText(showProfile.user_level)]
                                .range[1]
                            }
                            %
                          </Text>
                        </View>
                      </View>
                    )}
                    <View style={{marginBottom: 15, ...Typography.flexBetween}}>
                      <View style={Typography.flex}>
                        <IconSvg
                          color="#FDF15D"
                          path="M6 18L18 6M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17ZM8 7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7C6 6.44772 6.44772 6 7 6C7.55228 6 8 6.44772 8 7Z"
                        />
                        <Text
                          style={[
                            Typography.semibold,
                            Typography.size,
                            Typography.ms,
                            Typography.textCenter,
                            Typography.text,
                          ]}>
                          Rating Accuracy
                        </Text>
                      </View>
                      <View>
                        <Text style={[Typography.semibold, Typography.green]}>
                          92% Accuracy
                        </Text>
                      </View>
                    </View>
                  </View>
                  <HBars />
                  <View style={{marginTop: 30}}>
                    <Text style={[Typography.h2, Typography.semibold]}>
                      Levels
                    </Text>
                  </View>
                  <View>
                    {Object.keys(levelImages).map(key => {
                      const level = levelImages[key];
                      return (
                        <View
                          key={key}
                          style={{marginLeft: -10, ...Typography.flex}}>
                          <Image source={level.img} style={styles.level} />
                          <View style={{marginLeft: 5}}>
                            <Text style={styles.badgeText}>{level.name}</Text>
                            <Text style={styles.badgeText2}>
                              {level.range[0]}% - {level.range[1]}%
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </ModalFull>
              <ModalFull
                isVisible={modalBadgesVisible}
                onClose={() => setModalBadgesVisible(false)}>
                <Text style={[Typography.h2, Typography.semibold]}>
                  Your Current Status
                </Text>
                <View style={{marginBottom: 10}}>
                  {badgeImages[slugText(showProfile.user_level)] && (
                    <View style={Typography.flexBetween}>
                      <Image
                        source={
                          badgeImages[slugText(showProfile.user_badges)].img
                        }
                        style={styles.badges}
                      />
                      <View>
                        <Text style={{textAlign: 'right', ...styles.badgeText}}>
                          0/
                          {badgeImages[slugText(showProfile.user_level)].range}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                <HBars />
                <View
                  style={{
                    marginTop: 30,
                    ...Typography.flexBetween,
                    ...Typography.ms,
                  }}>
                  <Text style={[Typography.h2, Typography.semibold]}>
                    Status
                  </Text>
                  <Text style={[Typography.h2, Typography.semibold]}>
                    Ratings
                  </Text>
                </View>
                <View>
                  {Object.keys(badgeImages).map(key => {
                    const badge = badgeImages[key];
                    return (
                      <View
                        key={key}
                        style={{marginVertical: 8, ...Typography.flexBetween}}>
                        <Image source={badge.img} style={styles.badges} />
                        <View>
                          <Text
                            style={{textAlign: 'right', ...styles.badgeText}}>
                            {badge.range}
                          </Text>
                          <Text style={styles.badgeText3}>
                            <IconSvg
                              width="16"
                              height="12"
                              boxWidth="16"
                              boxHeight="12"
                              stroke={true}
                              color="#FDF15D"
                              path="M3.3335 7.99996L6.66683 11.3333L13.3335 4.66663"
                            />{' '}
                            Completed!
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ModalFull>

              <ModalListing
                data={playlist}
                navigation={navigation}
                title="SAVED PLAYLIST"
                isVisible={modalPlaylistVisible}
                onClose={() => setModalPlaylistVisible(false)}
              />

              <ModalListing
                data={likes}
                navigation={navigation}
                title="LIKES"
                isVisible={modalLikesVisible}
                onClose={() => setModalLikesVisible(false)}
              />

              <ModalUsers
                data={followings}
                title="FOLLOWING"
                isVisible={modalFollowingVisible}
                onClose={() => setModalFollowingVisible(false)}
              />

              <ModalListing
                data={rated}
                navigation={navigation}
                title="RATED SONGS"
                hasVotes={true}
                isVisible={modalRatedVisible}
                onClose={() => setModalRatedVisible(false)}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: 304,
    opacity: 0.32,
  },
  backgroundGradient: {
    position: 'absolute',
    width: '100%',
    height: 304,
    top: 0,
    left: 0,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollView: {
    paddingHorizontal: 20,
    marginTop: 0,
    marginBottom: 10,
  },
  containerInfo: {
    marginTop: 90,
    paddingHorizontal: 20,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonWrapper: {
    flex: 1,
    margin: 4,
  },
  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    height: 56,
    borderWidth: 0,
    borderRadius: 16,
    paddingHorizontal: 15,
    backgroundColor: '#1D1D1F',
  },
  button: {
    height: 56,
    borderWidth: 0,
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  buttonTeal: {
    backgroundColor: '#376B86',
  },
  buttonMuted: {
    backgroundColor: 'gray',
  },
  buttonFilters: {
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    width: 128,
    height: 128,
    borderRadius: 16,
    marginRight: 15,
  },
  badges: {
    width: 160,
    height: 48,
    resizeMode: 'contain',
  },
  achievements: {
    width: 54,
    height: 74,
    resizeMode: 'contain',
    marginRight: 4,
  },
  level: {
    width: 65,
    height: 66,
    position: 'relative',
    resizeMode: 'contain',
  },
  divider: {
    position: 'absolute',
    left: '50%',
    width: 80,
    transform: [{rotate: '90deg'}, {translateX: -40}],
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 6,
    fontWeight: 700,
    fontSize: 9,
    lineHeight: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  gridImage: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  badgeText: {
    fontSize: 14,
  },
  badgeText2: {
    fontSize: 14,
    color: '#afafaf',
    fontWeight: 300,
  },
  badgeText3: {
    fontSize: 14,
    fontWeight: 300,
    color: '#FDF15D',
  },
  wrap: {
    width: '56%',
  },
});

export default ProfileScreen;
