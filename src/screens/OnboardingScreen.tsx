import React, {useEffect, useRef, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View} from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import Typography from '../constants/Typography';
import {RootAuthStackParamList} from '../types/types';

type OnboardingScreenProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'Onboarding'
>;

const OnBoardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const swiperRef = useRef<Swiper>(null);
  const [isOpaque, setIsOpaque] = useState(false);
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };
  const handleFinishIntro = async () => {
    await AsyncStorage.setItem('hasSeenIntro', 'true');
    navigation.navigate('Login');
  };

  useEffect(() => {
    const checkScreen = async () => {
      const seenIntro = await AsyncStorage.getItem('hasSeenIntro');
      if (seenIntro !== null) {
        navigation.navigate('Login');
      } else {
        setTimeout(function () {
          setIsOpaque(true);
        }, 1000);
      }
    };
    checkScreen();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={isOpaque ? styles.opaque : styles.transparent}>
        <Text style={[Typography.text, styles.title]}>SONG SAVIOR</Text>
        <Swiper
          loop={false}
          ref={swiperRef}
          paginationStyle={styles.pagination}
          dotStyle={styles.dot}
          activeDotStyle={Typography.button}>
          <View style={styles.slide}>
            <Image
              source={require('../assets/images/unsplash_IUn1O500LMI.png')}
              style={styles.imgFluid}
            />
            <Image
              source={require('../assets/images/gradientBottom.png')}
              style={styles.gradient}
            />
            <View style={styles.section}>
              <View style={styles.wrapper}>
                <Text style={[Typography.h1, Typography.highlight]}>
                  Have fun discovering music in multiple ways!
                </Text>
                <Text style={[Typography.size1, Typography.text3]}>
                  Through gamified discovery streaming, rating charts, and even
                  other users.
                </Text>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={handleNextSlide}>
                  <Image
                    source={require('../assets/images/next-button.png')}
                    style={styles.buttonContainer}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.slide}>
            <Image
              source={require('../assets/images/unsplash_UFlO384euRI.png')}
              style={styles.imgFluid}
            />
            <Image
              source={require('../assets/images/gradientBottom.png')}
              style={styles.gradient}
            />
            <View style={styles.section}>
              <View style={styles.wrapper}>
                <Text style={[Typography.h1, Typography.highlight]}>
                  Help artists rise on the charts.
                </Text>
                <Text style={[Typography.size1, Typography.text3]}>
                  Your song ratings not only help your score, but also helps
                  unknown, talented artists get exposure.
                </Text>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={handleNextSlide}>
                  <Image
                    source={require('../assets/images/next-button.png')}
                    style={styles.buttonContainer}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.slide}>
            <Image
              source={require('../assets/images/unsplash_hxnBkzz9iL4.png')}
              style={styles.imgFluid}
            />
            <Image
              source={require('../assets/images/gradientBottom.png')}
              style={styles.gradient}
            />
            <View style={styles.section}>
              <View style={styles.wrapper}>
                <Text style={[Typography.h1, Typography.highlight]}>
                  Become a rising star yourself.
                </Text>
                <Text style={[Typography.size1, Typography.text3]}>
                  The higher you rank, the more others will see and follow your
                  musical taste!
                </Text>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={handleFinishIntro}>
                  <Image
                    source={require('../assets/images/start-button.png')}
                    style={styles.buttonStartContainer}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Swiper>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    top: 60,
    zIndex: 1,
    width: '100%',
    letterSpacing: 5,
  },
  opaque: {
    opacity: 1,
  },
  transparent: {
    opacity: 0,
  },
  slide: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  imgFluid: {
    flex: 1,
    width: '100%',
    height: 'auto',
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    left: 50,
    bottom: 85,
    justifyContent: 'flex-start',
  },
  dot: {
    backgroundColor: 'rgba(32, 73, 118, 0.32)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  section: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
  wrapper: {
    paddingHorizontal: 50,
  },
  buttonContainer: {
    width: 155,
    height: 136,
    marginRight: -10,
    marginVertical: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonStartContainer: {
    width: 211,
    height: 136,
    marginRight: -14,
    marginVertical: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '100%',
    marginRight: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default OnBoardingScreen;
