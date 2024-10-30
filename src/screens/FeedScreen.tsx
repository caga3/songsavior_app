import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {Text, TextInput, View} from '../components/Themed';
import Typography from '../constants/Typography';
import ProfileNav from '../components/ProfileNav';
import {useAuth} from '../context/AuthContext';
import ThreeDots from '../constants/icons/ThreeDots';
import LikesIcon from '../constants/icons/LikesIcon';
import CommentsIcon from '../constants/icons/CommentsIcon';
import ShareIcon from '../constants/icons/ShareIcon';

const FeedScreen: React.FC = () => {
  const {userInfo} = useAuth();
  const getUserInfo =
    typeof userInfo === 'string' ? JSON.parse(userInfo) : null;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ProfileNav />
        <View style={Typography.container}>
          <View style={Typography.headerWrapper}>
            <Text style={[Typography.h3, Typography.textCenter]}>FEED</Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={[Typography.w100, styles.wrapper]}>
              <View style={[Typography.flexCenter, Typography.mb3]}>
                <Image
                  source={{uri: getUserInfo.avatar}}
                  style={[styles.gridImage]}
                  resizeMode="cover"
                />
                <TextInput
                  style={{marginBottom: 0, width: '100%', ...Typography.ms1}}
                  placeholder="What's on your mind?"
                />
              </View>
            </View>
            <View style={Typography.w100}>
              <View style={[Typography.flexBetween, Typography.w100]}>
                <Text
                  style={[
                    Typography.textCenter,
                    Typography.col3,
                    styles.tabActive,
                  ]}>
                  All
                </Text>
                <Text style={[Typography.textCenter, Typography.col3]}>
                  Artists
                </Text>
                <Text style={[Typography.textCenter, Typography.col3]}>
                  Users
                </Text>
              </View>
            </View>
            <View style={[Typography.card, Typography.mt, Typography.mb0]}>
              <View style={[Typography.w100, Typography.flexBetween]}>
                <View style={[Typography.flexCenter, Typography.mb3]}>
                  <Image
                    source={require('../assets/images/kendrick.png')}
                    style={styles.gridImage}
                    resizeMode="cover"
                  />
                  <View style={Typography.ms1}>
                    <Text style={[Typography.h3, Typography.mb0]}>
                      Kendrik Lamar
                    </Text>
                    <Text style={[Typography.text3]}>24 mins ago</Text>
                  </View>
                </View>
                <ThreeDots />
              </View>
              <View style={Typography.mt3}>
                <Text style={[Typography.text, Typography.sizeSm]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate.
                </Text>
              </View>
              <View
                style={[Typography.flexBetween, Typography.mt, styles.social]}>
                <View style={Typography.flex}>
                  <LikesIcon />
                  <Text
                    style={[
                      Typography.text,
                      Typography.sizeSm,
                      Typography.ms1,
                    ]}>
                    107
                  </Text>
                </View>
                <View style={Typography.flex}>
                  <CommentsIcon />
                  <Text
                    style={[
                      Typography.text,
                      Typography.sizeSm,
                      Typography.ms1,
                    ]}>
                    Comment
                  </Text>
                </View>
                <View style={Typography.flex}>
                  <ShareIcon />
                  <Text
                    style={[
                      Typography.text,
                      Typography.sizeSm,
                      Typography.ms1,
                    ]}>
                    Share
                  </Text>
                </View>
              </View>
            </View>
            <View style={[Typography.card, Typography.mt]}>
              <View style={[Typography.w100, Typography.flexBetween]}>
                <View style={[Typography.flexCenter, Typography.mb3]}>
                  <Image
                    source={require('../assets/images/snake.png')}
                    style={styles.gridImage}
                    resizeMode="cover"
                  />
                  <View style={Typography.ms1}>
                    <Text style={[Typography.h3, Typography.mb0]}>
                      DJ Snake
                    </Text>
                    <Text style={[Typography.text3]}>24 mins ago</Text>
                  </View>
                </View>
                <ThreeDots />
              </View>
              <View style={Typography.mt}>
                <Text style={[Typography.text, Typography.sizeSm]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate.
                </Text>
              </View>
              <View
                style={[Typography.flexBetween, Typography.mt, styles.social]}>
                <View style={Typography.flex}>
                  <LikesIcon />
                  <Text
                    style={[
                      Typography.text,
                      Typography.sizeSm,
                      Typography.ms1,
                    ]}>
                    107
                  </Text>
                </View>
                <View style={Typography.flex}>
                  <CommentsIcon />
                  <Text
                    style={[
                      Typography.text,
                      Typography.sizeSm,
                      Typography.ms1,
                    ]}>
                    Comment
                  </Text>
                </View>
                <View style={Typography.flex}>
                  <ShareIcon />
                  <Text
                    style={[
                      Typography.text,
                      Typography.sizeSm,
                      Typography.ms1,
                    ]}>
                    Share
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.modalContainer]}>
          <View style={[styles.modalContent]}>
            <View style={styles.modalWrapper}>
              <Text
                style={[
                  Typography.h2,
                  Typography.textCenter,
                  Typography.highlight,
                ]}>
                Feature Not Available {'\n'}... Yet
              </Text>
              <Text style={[styles.modalTitle, Typography.text]}>
                Update feed is unavailable during the beta phase
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: '#fdf15d',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },
  modalWrapper: {
    margin: 'auto',
    width: 260,
  },
  modalTitle: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContent: {
    height: 170,
    width: '100%',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#131314',
  },

  gridImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  social: {
    width: '80%',
    margin: 'auto',
  },
});

export default FeedScreen;
