import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

import {useRoute, RouteProp} from '@react-navigation/native';
import {Text, View} from '../components/Themed';
import ModalFull from '../components/ModalFull';
import ProfileNav from '../components/ProfileNav';
import Typography from '../constants/Typography';
import GoBack from '../components/GoBack';
import LinearGradient from 'react-native-linear-gradient';
import LocationIcon from '../constants/icons/LocationIcon';
import HBars from '../constants/icons/HBarIcon';
import IconSvg from '../components/IconsSvg';
import VBarIcon from '../constants/icons/VBarIcon';
import {useAuth} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestApiServer from '../constants/RestApiServer';
import {cleanText, slugText} from '../constants/Helper';

interface DataItem {
  id: number;
  city: string;
  country: string;
  user_level: string;
  user_badges: string;
  avatar_url: string;
  user_display_name: string;
  votes: {
    song_id: string;
    vote: number;
    title: string;
    artist: string;
    image: string;
    genre: string;
    avg: number;
    total: number;
  };
}
type Genre =
  | 'rock'
  | 'jazz'
  | 'pop'
  | 'country'
  | 'rb'
  | 'hiphop'
  | 'danceelectronic';

type RootStackParamList = {
  Profile: {item?: string};
};

const genreImages: Record<Genre, ImageSourcePropType> = {
  rock: require('../assets/images/genres/genre_rock.png'),
  jazz: require('../assets/images/genres/genre_jazz.png'),
  pop: require('../assets/images/genres/genre_pop.png'),
  country: require('../assets/images/genres/genre_country.png'),
  rb: require('../assets/images/genres/genre_rb.png'),
  hiphop: require('../assets/images/genres/genre_hiphop.png'),
  danceelectronic: require('../assets/images/genres/genre_danceelectronic.png'),
};

const ProfileScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const routes = route.params;
  const {userInfo, setLogout} = useAuth();
  const [showProfile, setShowProfile] = useState<DataItem>();
  const [showGenres, setShowGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRated, setTotalRated] = useState(0);
  const [modalLevelVisible, setModalLevelVisible] = useState(false);
  const [modalBadgesVisible, setModalBadgesVisible] = useState(false);
  const getUserInfo =
    typeof userInfo === 'string' ? JSON.parse(userInfo) : null;
  const user_id = routes && routes.item ? routes.item : getUserInfo.id;
  const default_avatar =
    'https://www.songsavior.com/wp-content/uploads/2024/07/default_avatar.jpg';

  const handleEdit = () => {};

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenData = await AsyncStorage.getItem('userToken');
        if (tokenData) {
          const responds = await RestApiServer.fetchProfileStats(
            user_id,
            tokenData,
          );
          if (responds) {
            setShowProfile(responds);
            setTotalRated(responds.length);
            const groupedGenres = groupGenres(responds.votes[0]);
            setShowGenres(groupedGenres);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [showProfile]);

  const groupGenres = (data: DataItem['votes']): string[] => {
    const genreSet = new Set<string>();

    // Add genre from single vote object
    genreSet.add(data.genre);

    return Array.from(genreSet); // Return an array with the single genre
  };

  const renderItem = ({item}: {item: string}) => {
    const sanitizedItem = cleanText(item) as Genre;
    return (
      <View style={[Typography.flexBetween, Typography.flexTop, Typography.mb]}>
        <View style={Typography.relative}>
          <Image source={genreImages[sanitizedItem]} style={styles.gridImage} />
          <Text style={[Typography.textCenter, styles.overlay]}>{item}</Text>
        </View>
        <View>
          <Text style={[Typography.textCenter, Typography.highlight]}>
            Ranking
          </Text>
          <Text style={Typography.textCenter}>26</Text>
        </View>
        <View>
          <Text style={[Typography.textCenter, Typography.highlight]}>
            Accuracy
          </Text>
          <Text style={Typography.textCenter}>88%</Text>
        </View>
        <View>
          <Text style={[Typography.textCenter, Typography.highlight]}>
            Rating
          </Text>
          <Text style={Typography.textCenter}>480</Text>
        </View>
      </View>
    );
  };

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
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                    {showProfile.id === Number(getUserInfo.id) && (
                      <>
                        <TouchableOpacity onPress={handleEdit}>
                          <Text style={Typography.text4}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={setLogout}>
                          <Text style={[Typography.ms15, Typography.text4]}>
                            Logout
                          </Text>
                        </TouchableOpacity>
                      </>
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
              <View style={Typography.card}>
                <View style={styles.divider}>
                  <VBarIcon />
                </View>
                <View style={Typography.flexAround}>
                  <View>
                    <View style={Typography.flexCenter}>
                      <IconSvg
                        width="24"
                        height="24"
                        color="#FDF15D"
                        path="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M21 21V19C20.9949 18.1172 20.6979 17.2608 20.1553 16.5644C19.6126 15.868 18.8548 15.3707 18 15.15M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM3 21V19C3 17.9391 3.42143 16.9217 4.17157 16.1716C4.92172 15.4214 5.93913 15 7 15H11C12.0609 15 13.0783 15.4214 13.8284 16.1716C14.5786 16.9217 15 17.9391 15 19V21H3Z"
                      />
                      <Text
                        style={[
                          Typography.semibold,
                          Typography.size1,
                          Typography.text,
                          Typography.ms,
                          Typography.textCenter,
                        ]}>
                        Followers
                      </Text>
                    </View>
                    <Text
                      style={[
                        Typography.text4,
                        Typography.size1,
                        Typography.textCenter,
                      ]}>
                      257
                    </Text>
                  </View>
                  <View>
                    <View style={Typography.flexCenter}>
                      <IconSvg
                        width="24"
                        height="24"
                        fill="#26A300"
                        stroke={false}
                        path="M11.2929 9.70711L7.70711 13.2929C7.07714 13.9229 7.52331 15 8.41421 15H15.5858C16.4767 15 16.9229 13.9229 16.2929 13.2929L12.7071 9.70711C12.3166 9.31658 11.6834 9.31658 11.2929 9.70711Z"
                      />

                      <Text
                        style={[
                          Typography.semibold,
                          Typography.size1,
                          Typography.text,
                          Typography.ms,
                          Typography.textCenter,
                        ]}>
                        Overall Ranking
                      </Text>
                    </View>
                    <Text
                      style={[
                        Typography.text4,
                        Typography.size1,
                        Typography.textCenter,
                      ]}>
                      1,882
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[{flexGrow: 1}, styles.container]}>
              <ScrollView style={{flex: 1, ...styles.scrollView}}>
                <Text style={[Typography.h2, Typography.semibold]}>Stats</Text>
                <View style={Typography.card}>
                  <View style={Typography.flexBetween}>
                    <View style={Typography.flex}>
                      <IconSvg
                        width="24"
                        height="24"
                        color="#FDF15D"
                        path="M12.375 4C12.5977 4 12.8011 4.12654 12.8996 4.32642L15.1708 8.93229L20.2488 9.66887C20.4693 9.70085 20.6526 9.85542 20.7214 10.0675C20.7902 10.2796 20.7327 10.5124 20.573 10.668L16.8932 14.253L17.7609 19.3154C17.7985 19.5352 17.7082 19.7573 17.5279 19.8883C17.3476 20.0193 17.1086 20.0364 16.9115 19.9325L12.3802 17.5426L7.83805 19.9327C7.64093 20.0365 7.40206 20.0192 7.22189 19.8882C7.04172 19.7571 6.95149 19.5351 6.98914 19.3154L7.85681 14.253L4.17699 10.668C4.01733 10.5124 3.9598 10.2796 4.02862 10.0675C4.09744 9.85542 4.28066 9.70085 4.50117 9.66887L9.5792 8.93229L11.8504 4.32642C11.9489 4.12654 12.1523 4 12.375 4Z"
                      />
                      <Text
                        style={[
                          Typography.semibold,
                          Typography.size1,
                          Typography.ms,
                          Typography.textCenter,
                          Typography.text,
                        ]}>
                        Songs Rated
                      </Text>
                    </View>
                    <Text
                      style={[
                        Typography.text4,
                        Typography.size1,
                        Typography.textCenter,
                      ]}>
                      {totalRated}
                    </Text>
                  </View>
                  <View style={[Typography.flexBetween, Typography.mt3]}>
                    <View style={Typography.flex}>
                      <IconSvg
                        width="24"
                        height="24"
                        color="#FDF15D"
                        path="M6 18L18 6M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17ZM8 7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7C6 6.44772 6.44772 6 7 6C7.55228 6 8 6.44772 8 7Z"
                      />
                      <Text
                        style={[
                          Typography.semibold,
                          Typography.size1,
                          Typography.ms,
                          Typography.textCenter,
                          Typography.text,
                        ]}>
                        Rating Accuracy
                      </Text>
                    </View>
                    <View style={[Typography.tintBkgGreen, styles.accuracy]}>
                      <Text style={[Typography.semibold, Typography.green]}>
                        92%
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={[Typography.h2, Typography.semibold]}>
                  Related Genres
                </Text>
                <View style={Typography.card}>
                  <FlatList
                    scrollEnabled={false}
                    data={showGenres}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                  />
                </View>

                <Text style={[Typography.h2, Typography.semibold]}>
                  Related Songs
                </Text>
              </ScrollView>
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
                          width="24"
                          height="24"
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
                      <View style={[Typography.tintBkgGreen, styles.accuracy]}>
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
            </View>
          </ScrollView>
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
    marginTop: 0,
    marginBottom: -20,
  },
  containerInfo: {
    marginTop: 70,
    paddingHorizontal: 20,
  },
  container: {
    paddingHorizontal: 20,
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
  level: {
    width: 65,
    height: 66,
    position: 'relative',
    resizeMode: 'contain',
  },
  accuracy: {
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 24,
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
    width: 56,
    height: 56,
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
});

export default ProfileScreen;
