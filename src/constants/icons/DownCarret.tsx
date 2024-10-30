import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface UpIconProps {
  width?: string;
  height?: string;
  stroke?: string;
  style?: StyleProp<ViewStyle>;
}
const DownCarret: React.FC<UpIconProps> = ({
  width = '24',
  height = '24',
  stroke = '#ffffff',
  style,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      <Path
        d="M6 9L12 15L18 9"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default DownCarret;
