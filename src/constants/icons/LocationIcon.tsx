import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';

interface LocationIconProps {
  width?: string;
  height?: string;
  stroke?: string;
  style?: StyleProp<ViewStyle>;
}
const LocationIcon: React.FC<LocationIconProps> = ({
  width = '12',
  height = '14',
  stroke = '#FDF15D',
  style,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 12 14"
      fill="none"
      style={style}>
      <Path
        d="M5.99984 8.33314C7.10441 8.33314 7.99984 7.43771 7.99984 6.33314C7.99984 5.22857 7.10441 4.33314 5.99984 4.33314C4.89527 4.33314 3.99984 5.22857 3.99984 6.33314C3.99984 7.43771 4.89527 8.33314 5.99984 8.33314Z"
        stroke={stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.77117 10.1045L6.94251 12.9331C6.6925 13.1829 6.35356 13.3232 6.00017 13.3232C5.64678 13.3232 5.30785 13.1829 5.05784 12.9331L2.22851 10.1045C1.48265 9.35858 0.97473 8.40827 0.768965 7.37371C0.563199 6.33916 0.668833 5.26681 1.07251 4.29229C1.47618 3.31777 2.15977 2.48483 3.03683 1.89881C3.91388 1.31279 4.94502 1 5.99984 1C7.05466 1 8.0858 1.31279 8.96285 1.89881C9.83991 2.48483 10.5235 3.31777 10.9272 4.29229C11.3308 5.26681 11.4365 6.33916 11.2307 7.37371C11.0249 8.40827 10.517 9.35858 9.77117 10.1045Z"
        stroke={stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default LocationIcon;
