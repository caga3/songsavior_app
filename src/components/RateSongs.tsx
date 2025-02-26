import React, {useLayoutEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
  Event,
} from 'react-native-track-player';
import Swiper from 'react-native-swiper';

import {Text, View} from './Themed';
import IconSvg from './IconsSvg';
import PlayIcon from '../constants/icons/PlayIcon';
import HBars from '../constants/icons/HBarIcon';
import Typography from '../constants/Typography';
import DownArrow from '../constants/icons/DownArrow';
import StarsIcon from '../constants/icons/StarsIcon';
import {setupPlayer} from '../constants/Player';
import {useFocusEffect} from '@react-navigation/native';
import RestApiServer from '../constants/RestApiServer';
import {useAuth} from '../context/AuthContext';
import PauseIcon from '../constants/icons/PauseIcon';
import ModalFull from './ModalFull';
import AccuracyIcon from '../constants/icons/AccuracyIcon';
import GraphArrowIcon from '../constants/icons/GraphArrowIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format, formatTime} from '../constants/Helper';
import UpArrow from '../constants/icons/UpArrow';
import PlaylistIcon from '../constants/icons/PlaylistIcon';

interface Props {
  item: string;
  filter: string;
  redirect?: string;
}

interface VoteData {
  points: string;
  vote_id: number;
  user_id: number;
  song_id: string;
  vote: number;
  total: number;
  avg: number;
  accuracy: string;
  score: number;
  total_score: number;
}

const RateSongs: React.FC<Props> = ({item, filter, redirect}) => {
  const progress = useProgress();
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLikes, setIsLikes] = useState(0);
  const [songPlayer, setSongPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [disablePlaying, setDisablePlaying] = useState(false);
  const [isVoteReady, setIsVoteReady] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteData, setVoteData] = useState<VoteData>();
  const [modalVisible, setModalVisible] = useState(false);
  const playbackState = usePlaybackState();
  const {userInfo, userToken} = useAuth();

  interface trackDataProp {
    id: number;
    track: string;
    title: string;
    artist: string;
    image: string;
  }

  const getUserInfo =
    typeof userInfo === 'string' ? JSON.parse(userInfo) : null;

  const playerSetup = async (trackData: trackDataProp) => {
    await setupPlayer();
    const options = {
      id: trackData.id,
      url: trackData.track,
      title: trackData.title,
      artist: trackData.artist,
      artwork: trackData.image,
    };
    await TrackPlayer.add(options);
    setTimeout(async () => {
      const trackDuration = await TrackPlayer.getProgress().then(
        dur => dur.duration,
      );
      setDuration(trackDuration);
    }, 1000);
  };

  const fetchData = async () => {
    try {
      if (item) {
        let playerData = [];
        let playerId = '';
        const tokenData = await AsyncStorage.getItem('userToken');
        //console.log(tokenData);
        if (filter === 'genres') {
          //     // playerData = await SevenDigitalService.searchRandomTrackByCategory(
          //     //   item,
          //     // );
          if (tokenData) {
            playerData = await RestApiServer.searchRandomTrackByCategory(
              item,
              tokenData,
            );
            playerId = playerData.id;
          }
        } else if (filter === 'artists') {
          //     // playerData = await SevenDigitalService.searchRandomTrackByArtist(
          //     //   tokenObj,
          //     //   item,
          //     //   getUserInfo.id,
          //     //   userToken,
          //     // );
          //     // playerId = playerData.id;
        } else {
          if (tokenData) {
            playerData = await RestApiServer.searchTrack(item, tokenData);
          }
          playerId = item;
        }
        if (playerId) {
          const votedOnSong = await RestApiServer.fetchVoteById(
            playerId,
            getUserInfo.id,
            userToken,
          );
          if (votedOnSong.avg) {
            setHasVoted(true);
            setVoteData(votedOnSong);
          }
          const likesData = await RestApiServer.fetchLikes(
            playerId,
            getUserInfo.id,
            userToken,
          );
          if (likesData && likesData.likes) {
            setIsLikes(1);
          } else {
            setIsLikes(0);
          }
          setSongPlayer(playerData);
          await playerSetup(playerData);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  <svg
    width="18"
    height="13"
    viewBox="0 0 18 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 6V12M15 1H1H15ZM1 5H10H1ZM7 9H1H7ZM11 9H17H11Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>;

  const progressBar = (position: number): number => {
    if (redirect !== 'Charts') {
      if (position >= 60 && !isVoteReady) {
        setIsVoteReady(true);
      }
    }
    return duration > 0 ? (position / duration) * 100 : 0;
  };

  const handleRePlay = async () => {
    await TrackPlayer.seekTo(0);
  };

  const handlePlaylist = async () => {
    // await TrackPlayer.seekTo(0);
  };

  const handlePlay = async () => {
    if (playbackState.state === State.Playing) {
      setIsPlaying(false);
      await TrackPlayer.pause();
    } else {
      setIsPlaying(true);
      await TrackPlayer.play();
    }
  };

  const handleForward = async () => {
    setLoading(true);
    setIsPlaying(false);
    setDisablePlaying(false);
    setHasVoted(false);
    setVoteData(undefined);
    setIsVoteReady(false);
    await TrackPlayer.reset();
    await fetchData();
    setTimeout(() => {
      handlePlay();
    }, 3000);
  };

  const handleShare = () => {};
  const handleHelpModal = () => {
    setModalVisible(true);
  };

  const handleLikes = async () => {
    if (getUserInfo && songPlayer) {
      const setLike = isLikes === 1 ? 0 : 1;
      const song_id = songPlayer.id;
      const user_id = getUserInfo.id;
      const msg = await RestApiServer.toggleLikes(
        song_id,
        user_id,
        setLike,
        userToken,
      );
      if (msg) {
        setIsLikes(setLike);
      }
    }
  };

  const handleVote = async (vote: number) => {
    if (getUserInfo && songPlayer) {
      const song_id = songPlayer.id;
      const user_id = getUserInfo.id;
      const image = songPlayer?.image;
      const track = songPlayer?.track;
      const title = songPlayer?.title;
      const artist = songPlayer?.artist;
      const year = songPlayer?.year;
      const msg = await RestApiServer.sendVote(
        item,
        song_id,
        user_id,
        vote,
        track,
        title,
        artist,
        image,
        year,
        userToken,
      );
      if (msg) {
        //console.log(msg);
        setHasVoted(true);
        setVoteData(msg);
      }
    }
  };

  useLayoutEffect(() => {
    // DEVONLY
    // setIsVoteReady(true);
    // setDisablePlaying(true);
    setLoading(true);
    fetchData();

    // Listener for playback events
    const queueEndedListener = TrackPlayer.addEventListener(
      Event.PlaybackQueueEnded,
      async () => {
        await TrackPlayer.seekTo(0); // Seek to the start of the track
        await TrackPlayer.pause();
        if (!isVoteReady) {
          setIsVoteReady(true);
          setDisablePlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
    );

    return () => {
      setIsPlaying(false);
      setDisablePlaying(false);
      TrackPlayer.reset();
      queueEndedListener.remove();
    };
  }, [item]);

  useFocusEffect(
    React.useCallback(() => {
      if (redirect === 'Charts' || !hasVoted) {
        setTimeout(() => {
          handlePlay();
        }, 3000);
      }
      return async () => {
        setVoteData(undefined);
        setHasVoted(false);
        setIsPlaying(false);
        setDisablePlaying(false);
        await TrackPlayer.reset();
      };
    }, []),
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
  const imageUrl = songPlayer?.image;

  return (
    <>
      {songPlayer && (
        <View style={styles.container}>
          <View style={styles.cardWraper}>
            {redirect === 'Charts' ? (
              <Image
                source={
                  imageUrl
                    ? {uri: imageUrl}
                    : require('../assets/images/card-image.jpg')
                }
                style={styles.cardImage}
              />
            ) : (
              <Image
                source={
                  hasVoted && imageUrl
                    ? {uri: imageUrl}
                    : require('../assets/images/card-image.jpg')
                }
                style={styles.cardImage}
              />
            )}
          </View>

          {!hasVoted && redirect !== 'Charts' ? (
            <View
              style={
                isVoteReady
                  ? styles.rateSongWrapper
                  : styles.rateSongWrapperMuted
              }>
              <Text
                style={[
                  Typography.textCenter,
                  Typography.size2,
                  Typography.mt,
                ]}>
                RATE THIS SONG
              </Text>
              <View style={styles.rateWrapper}>
                <View style={styles.downArrows}>
                  <DownArrow />
                </View>
                <Text
                  style={[
                    Typography.textCenter,
                    Typography.size1,
                    Typography.highlight,
                    Typography.bold,
                  ]}>
                  TO REVEAL THE ARTIST
                </Text>
                <View style={styles.downArrows}>
                  <DownArrow />
                </View>
              </View>
              <TouchableOpacity style={styles.help} onPress={handleHelpModal}>
                <IconSvg path="M12 17V17.01M12 13.5C11.9816 13.1754 12.0692 12.8536 12.2495 12.583C12.4299 12.3125 12.6933 12.1079 13 12C13.3759 11.8563 13.7132 11.6272 13.9856 11.331C14.2579 11.0347 14.4577 10.6792 14.5693 10.2926C14.6809 9.90595 14.7013 9.49869 14.6287 9.10287C14.5562 8.70704 14.3928 8.33345 14.1513 8.01151C13.9099 7.68958 13.597 7.42808 13.2373 7.24762C12.8776 7.06715 12.4809 6.97264 12.0785 6.97152C11.6761 6.97041 11.2789 7.06272 10.9182 7.24119C10.5576 7.41965 10.2432 7.67941 10 8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
              </TouchableOpacity>
              {!isVoteReady && (
                <Text
                  style={[
                    styles.unlock,
                    Typography.textCenter,
                    Typography.size1,
                    Typography.highlight,
                    Typography.bold,
                  ]}>
                  RATING UNLOCKED SHORTLY
                </Text>
              )}
              <View style={styles.rateContainer}>
                {Array.from({length: 5}, (_val, id) =>
                  isVoteReady ? (
                    <TouchableOpacity
                      onPress={() => {
                        handleVote(id + 1);
                      }}
                      key={id}>
                      <StarsIcon />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.opacity} key={id}>
                      <StarsIcon />
                    </View>
                  ),
                )}
              </View>
              <HBars />
            </View>
          ) : (
            <>
              <View>
                <Text style={Typography.size2}>{songPlayer.title}</Text>
                <Text
                  style={[Typography.size1, Typography.text3, Typography.mb]}>
                  {songPlayer.artist}
                </Text>

                <TouchableOpacity style={styles.like} onPress={handleLikes}>
                  {isLikes ? (
                    <IconSvg
                      fill="#fdf15d"
                      stroke={false}
                      path="M3.00173 8.86834C2.98356 9.55836 3.10845 10.2447 3.36854 10.884C4.8192 14.4501 9.35229 17.3762 12.013 20.0114C14.675 17.3749 19.1738 14.5478 20.6471 10.8907C20.9043 10.2524 21.0269 9.56794 21.0073 8.88012C20.9877 8.19229 20.8264 7.51591 20.5334 6.8933C20.2404 6.27069 19.8221 5.71526 19.3045 5.26177C18.787 4.80828 18.1815 4.46649 17.5258 4.2578C16.8701 4.04911 16.1784 3.978 15.4939 4.04893C14.8095 4.11986 14.1471 4.3313 13.5481 4.67001C12.9491 5.00873 12.4265 5.46743 12.013 6.01741C11.6012 5.46341 11.0792 5.00066 10.4799 4.65831C9.8805 4.31596 9.21673 4.10143 8.53036 4.02821C7.844 3.95499 7.14991 4.02468 6.49181 4.23289C5.8337 4.4411 5.22583 4.78331 4.70648 5.23799C4.18713 5.69266 3.76755 6.24994 3.47415 6.87474C3.18076 7.49954 3.01991 8.17832 3.00173 8.86834Z"
                    />
                  ) : (
                    <IconSvg
                      style={[
                        {
                          opacity: 0.4,
                        },
                      ]}
                      path="M3.00173 8.86834C2.98356 9.55836 3.10845 10.2447 3.36854 10.884C4.8192 14.4501 9.35229 17.3762 12.013 20.0114C14.675 17.3749 19.1738 14.5478 20.6471 10.8907C20.9043 10.2524 21.0269 9.56794 21.0073 8.88012C20.9877 8.19229 20.8264 7.51591 20.5334 6.8933C20.2404 6.27069 19.8221 5.71526 19.3045 5.26177C18.787 4.80828 18.1815 4.46649 17.5258 4.2578C16.8701 4.04911 16.1784 3.978 15.4939 4.04893C14.8095 4.11986 14.1471 4.3313 13.5481 4.67001C12.9491 5.00873 12.4265 5.46743 12.013 6.01741C11.6012 5.46341 11.0792 5.00066 10.4799 4.65831C9.8805 4.31596 9.21673 4.10143 8.53036 4.02821C7.844 3.95499 7.14991 4.02468 6.49181 4.23289C5.8337 4.4411 5.22583 4.78331 4.70648 5.23799C4.18713 5.69266 3.76755 6.24994 3.47415 6.87474C3.18076 7.49954 3.01991 8.17832 3.00173 8.86834Z"
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.ratedSongWrapper}>
                {hasVoted && voteData && voteData.avg ? (
                  <View style={Typography.flexBetweenStart}>
                    <View>
                      <Text
                        style={[
                          Typography.size,
                          Typography.bold,
                          Typography.textCenter,
                          Typography.mb2,
                        ]}>
                        Song Rating
                      </Text>
                      <Text
                        style={[
                          Typography.h1,
                          Typography.textCenter,
                          Typography.mb3,
                        ]}>
                        {voteData.avg}
                      </Text>
                      <Text style={[Typography.text3, Typography.textCenter]}>
                        {voteData.total} Rating
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={[
                          Typography.size,
                          Typography.bold,
                          Typography.textCenter,
                          Typography.mb2,
                        ]}>
                        Your Rating
                      </Text>
                      <Text
                        style={[
                          Typography.h1,
                          Typography.textCenter,
                          Typography.mb3,
                        ]}>
                        {voteData.vote}
                      </Text>
                      <View
                        style={[
                          Typography.flex,
                          Typography.mb,
                          !hasVoted ? Typography.hide : '',
                        ]}>
                        <UpArrow />
                        <Text
                          style={[
                            Typography.size1,
                            Typography.text3,
                            Typography.textCenter,
                            Typography.highlight,
                            Typography.ms1,
                          ]}>
                          {voteData.points}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <Text
                        style={[
                          Typography.size,
                          Typography.bold,
                          Typography.textCenter,
                          Typography.mb2,
                        ]}>
                        Overall Score
                      </Text>
                      <View style={[Typography.flex, Typography.mb]}>
                        <GraphArrowIcon />
                        <Text
                          style={[
                            Typography.size1,
                            Typography.textCenter,
                            Typography.highlight,
                            Typography.ms1,
                          ]}>
                          {voteData.score}
                        </Text>
                      </View>
                      <View
                        style={[
                          Typography.mt3,
                          Typography.tintBkgBlue,
                          styles.accuracy,
                        ]}>
                        <View style={Typography.flex}>
                          <AccuracyIcon width="20" height="20" fill="#FFFFFF" />
                          <Text style={[Typography.semibold, Typography.size]}>
                            {voteData.accuracy}%
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text
                      style={[
                        Typography.size1,
                        Typography.bold,
                        Typography.textCenter,
                        Typography.mt,
                      ]}>
                      YOU HAVE NOT RATED THIS SONG
                    </Text>
                    <View style={[Typography.flexBetween, Typography.mb]}>
                      <Text
                        style={[
                          Typography.size1,
                          Typography.text3,
                          Typography.textCenter,
                          styles.maxWidth,
                        ]}>
                        To rate, you will need to hear it on the discovery
                        stream
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </>
          )}

          <View style={styles.progressBarContainer}>
            <View
              style={{
                ...styles.progressBar,
                width: `${progressBar(progress.position)}%`,
              }}
            />
          </View>
          <View style={styles.timeContainer}>
            <Text>{format(progress.position)}</Text>
            <Text style={Typography.text3}>{formatTime(duration)}</Text>
          </View>
          <View style={styles.controlsWrapper}>
            <TouchableOpacity
              style={[Typography.hide, styles.options]}
              onPress={() => handleRePlay()}>
              <IconSvg path="M4 12V9C4 8.20435 4.31607 7.44129 4.87868 6.87868C5.44129 6.31607 6.20435 6 7 6H20M20 6L17 3M20 6L17 9M20 12V15C20 15.7956 19.6839 16.5587 19.1213 17.1213C18.5587 17.6839 17.7956 18 17 18H4M4 18L7 21M4 18L7 15" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.options]} onPress={handlePlaylist}>
              <PlaylistIcon />
            </TouchableOpacity>

            {!disablePlaying ? (
              <TouchableOpacity
                style={[styles.options, styles.play]}
                onPress={() => handlePlay()}>
                <View style={styles.icon}>
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </View>
              </TouchableOpacity>
            ) : (
              <View style={[styles.options, styles.playDisabled]}>
                <View style={[styles.icon]}>
                  <PlayIcon />
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.options,
                redirect === 'Charts' ? Typography.hide : '',
              ]}
              onPress={handleForward}>
              <IconSvg path="M20 5V19M4 5V19L16 12L4 5Z" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[Typography.hide, styles.options]}
              onPress={handleShare}>
              <IconSvg path="M17 11V17M18 6H4H18ZM4 10H13H4ZM10 14H4H10ZM14 14H20H14Z" />
            </TouchableOpacity>
          </View>

          <ModalFull
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}>
            <View>
              <Text
                style={[
                  Typography.size2,
                  Typography.highlight,
                  Typography.textCenter,
                  Typography.mb,
                ]}>
                Song Savior Game
              </Text>
              <HBars />
              <View style={styles.slider}>
                <Swiper
                  dotStyle={styles.dot}
                  activeDotStyle={styles.dotActive}
                  loop={false}>
                  <View key={1} style={styles.slide}>
                    <Text
                      style={[
                        Typography.size1,
                        Typography.highlight,
                        Typography.mb,
                        Typography.mt,
                      ]}>
                      Rating Songs
                    </Text>
                    <Text style={[Typography.mb, Typography.text3]}>
                      To get placed on the leaderboard, all you have to do is
                      rate songs when you hear them on the player. However, to
                      eliminate an unfair advantage, you will only get to rate
                      songs you have accessed through the randomized stream and
                      not through charts or profiles.
                    </Text>
                  </View>
                  <View key={2} style={styles.slide}>
                    <Text
                      style={[
                        Typography.size1,
                        Typography.highlight,
                        Typography.mb,
                        Typography.mt,
                      ]}>
                      Liking Songs
                    </Text>
                    <Text style={[Typography.mb, Typography.text3]}>
                      To get placed on the leaderboard, all you have to do is
                      rate songs when you hear them on the player. However, to
                      eliminate an unfair advantage, you will only get to rate
                      songs you have accessed through the randomized stream and
                      not through charts or profiles.
                    </Text>
                  </View>
                  <View key={2} style={styles.slide}>
                    <Text
                      style={[
                        Typography.size1,
                        Typography.highlight,
                        Typography.mb,
                        Typography.mt,
                      ]}>
                      Accuracy
                    </Text>
                    <Text style={[Typography.mb, Typography.text3]}>
                      To get placed on the leaderboard, all you have to do is
                      rate songs when you hear them on the player. However, to
                      eliminate an unfair advantage, you will only get to rate
                      songs you have accessed through the randomized stream and
                      not through charts or profiles.
                    </Text>
                  </View>
                </Swiper>
              </View>
            </View>
          </ModalFull>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  controlsWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  options: {
    marginHorizontal: 4,
  },
  accuracy: {
    width: 80,
    borderRadius: 8,
    padding: 4,
    margin: 'auto',
    alignItems: 'center',
  },
  play: {
    width: 80,
    height: 80,
    backgroundColor: '#204976',
    borderRadius: 40,
  },
  playDisabled: {
    width: 80,
    height: 80,
    backgroundColor: '#adadae',
    borderRadius: 40,
  },
  unlock: {
    position: 'absolute',
    bottom: 26,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  icon: {
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWraper: {
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 30,
  },
  cardImage: {
    width: 300,
    height: 300,
    borderRadius: 16,
  },
  maxWidth: {
    maxWidth: 220,
    margin: 'auto',
  },
  rateContainer: {
    marginVertical: 14,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rateSongWrapper: {
    flex: 1,
    position: 'relative',
    paddingTop: 8,
    marginBottom: 5,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: '#204976',
  },
  rateSongWrapperMuted: {
    flex: 1,
    position: 'relative',
    paddingTop: 8,
    marginBottom: 5,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: '#676767',
  },
  ratedSongWrapper: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 6,
    marginBottom: 5,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: '#204976',
  },
  rateWrapper: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  help: {
    position: 'absolute',
    top: 14,
    right: 20,
  },
  like: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  downArrows: {
    marginHorizontal: 8,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffd700',
  },
  opacity: {
    opacity: 0.1,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  slider: {
    height: 300,
  },
  slide: {
    paddingHorizontal: 20,
  },
  dotActive: {
    backgroundColor: '#fdf15d',
  },
  dot: {
    backgroundColor: 'rgba(253, 240, 93, 0.40)',
  },
});

export default RateSongs;
