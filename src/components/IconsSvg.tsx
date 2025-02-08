import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';

interface IconSvgProps {
  path: string;
  width?: string;
  height?: string;
  boxWidth?: string;
  boxHeight?: string;
  color?: string;
  fill?: string;
  stroke?: boolean;
  style?: StyleProp<ViewStyle>; // Add style prop
}

const IconSvg: React.FC<IconSvgProps> = ({
  width = '24',
  height = '24',
  boxWidth = '24',
  boxHeight = '24',
  color = '#ffffff',
  fill = 'none',
  path,
  stroke = true,
  style,
  ...otherProps
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${boxWidth} ${boxHeight}`}
      fill="none"
      style={style}
      {...otherProps}>
      {stroke ? (
        <Path
          d={path}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <Path d={path} fill={fill} />
      )}
    </Svg>
  );
};

export default IconSvg;
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
    stroke="white"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>;
