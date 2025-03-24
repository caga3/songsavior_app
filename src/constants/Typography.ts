import {StyleSheet} from 'react-native';
import Colors from './Colors';
const colorScheme = 'dark';

const Typography = StyleSheet.create({
  sizeSm: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
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
  exbold: {
    fontWeight: '800',
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
  disabled: {
    color: 'rgba(255,255,255,0.24)',
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
  flip: {
    transform: [{scaleY: -1}],
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
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
  flexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flexMiddle: {
    justifyContent: 'center',
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
  flexHalf: {
    flex: 5,
  },
  flexWrap: {
    flexWrap: 'wrap',
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
  ms1: {
    marginLeft: 4,
  },
  ms15: {
    marginLeft: 15,
  },
  me: {
    marginRight: 7,
  },
  me5: {
    marginRight: 5,
  },
  mb: {
    marginBottom: 15,
  },
  mb0: {
    marginBottom: 0,
  },
  mb5: {
    marginBottom: 5,
  },
  mb2: {
    marginBottom: 8,
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
  mx10: {
    marginHorizontal: 10,
  },
  p10: {
    padding: 10,
  },
  p20: {
    padding: 20,
  },
  p15: {
    padding: 15,
  },
  py15: {
    paddingVertical: 15,
  },
  py10: {
    paddingVertical: 10,
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
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors[colorScheme].button,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMuted: {backgroundColor: Colors[colorScheme].text2},
  highlight: {
    color: Colors[colorScheme].highlight,
  },
  col3: {
    width: '33.33333%',
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
  tintBkgBlue: {
    backgroundColor: '#204976',
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
