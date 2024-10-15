import React from 'react';
import Svg, {Defs, Line, LinearGradient, Stop} from 'react-native-svg';

const VBarIcon = (props: any) => {
  const {...otherProps} = props;
  return (
    <Svg height="100%" width="1" {...otherProps}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#131314" stopOpacity="1" />
          <Stop offset="0.3" stopColor="#363637" stopOpacity="1" />
          <Stop offset="0.7" stopColor="#363637" stopOpacity="1" />
          <Stop offset="1" stopColor="#131314" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Line
        x1="1"
        y1="0"
        x2="1"
        y2="100%"
        stroke="url(#grad)"
        strokeWidth="1"
      />
    </Svg>
  );
};
export default VBarIcon;
