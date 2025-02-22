import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface DownIconProps {
  width?: string;
  height?: string;
  fill?: string;
  style?: StyleProp<ViewStyle>;
}
const DownArrow: React.FC<DownIconProps> = ({
  width = '24',
  height = '24',
  fill = '#FDF15D',
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
        d="M11.7929 14.2929L8.20711 10.7071C7.57714 10.0771 8.02331 9 8.91421 9H16.0858C16.9767 9 17.4229 10.0771 16.7929 10.7071L13.2071 14.2929C12.8166 14.6834 12.1834 14.6834 11.7929 14.2929Z"
        fill={fill}
      />
    </Svg>
  );
};
export default DownArrow;
