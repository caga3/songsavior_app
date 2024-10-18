import {StyleSheet} from 'react-native';
import Colors from './Colors';
const colorScheme = 'dark';

const Typography = StyleSheet.create({
  size: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  size1: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
  size2: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '600',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
    marginBottom: 15,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 15,
  },
  h3: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 15,
  },
  alignCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  vertCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'relative',
    padding: 20,
    backgroundColor: Colors[colorScheme].background,
  },
  relative: {
    position: 'relative',
  },
  containerTrans: {
    position: 'relative',
    paddingRight: 20,
    paddingLeft: 20,
  },
  fluid: {
    backgroundColor: Colors[colorScheme].background,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexBetweenStart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  flexAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flexAroundStart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flexEvenlyStart: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  flexTop: {
    alignItems: 'flex-start',
  },
  flexStretch: {
    alignItems: 'stretch',
  },
  flexBottom: {
    alignItems: 'flex-end',
  },
  textCenter: {
    textAlign: 'center',
  },
  textEnd: {
    textAlign: 'right',
  },
  tight: {
    lineHeight: 14,
  },
  menuRight: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    right: 20,
  },
  menuLeft: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    left: 20,
  },
  w100: {
    width: '100%',
  },
  ms: {
    marginLeft: 7,
  },
  me: {
    marginRight: 7,
  },
  mb: {
    marginBottom: 15,
  },
  mb0: {
    marginBottom: 0,
  },
  mb3: {
    marginBottom: 3,
  },
  mt: {
    marginTop: 15,
  },
  mt0: {
    marginTop: 0,
  },
  mt3: {
    marginTop: 3,
  },
  my: {
    marginVertical: 7,
  },
  tab: {
    backgroundColor: Colors[colorScheme].tab,
  },
  button: {
    backgroundColor: Colors[colorScheme].button,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMuted: {backgroundColor: Colors[colorScheme].text2},
  highlight: {
    color: Colors[colorScheme].highlight,
  },
  text: {
    color: Colors[colorScheme].text,
  },
  text2: {
    color: Colors[colorScheme].text2,
  },
  text3: {
    color: Colors[colorScheme].text3,
  },
  text4: {
    color: Colors[colorScheme].text4,
  },
  muted: {
    color: Colors[colorScheme].muted,
  },
  tintBkgGreen: {
    backgroundColor: '#151f12',
  },
  green: {
    color: '#26A300',
  },
  orange: {
    color: '#ffbf00',
  },
  background: {
    backgroundColor: Colors[colorScheme].background,
  },
  imgFluid: {
    flex: 1,
  },
  hide: {
    opacity: 0,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  marginAuto: {
    marginHorizontal: 'auto',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors[colorScheme].tab,
  },
  headerWrapper: {
    paddingVertical: 10,
  },
});

export default Typography;
