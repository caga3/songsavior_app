import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';

interface IconSvgProps {
  path: string;
  width?: string;
  height?: string;
  color?: string;
  fill?: string;
  stroke?: boolean;
  style?: StyleProp<ViewStyle>; // Add style prop
}

const IconSvg: React.FC<IconSvgProps> = ({
  width = '24',
  height = '24',
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
      viewBox={`0 0 ${width} ${height}`}
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