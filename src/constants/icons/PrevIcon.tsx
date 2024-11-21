import React from 'react';

import Svg, {Path} from 'react-native-svg';

const PrevIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 16 16" fill="none">
      <Path
        d="M10 4L6 8L10 12"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.64"
      />
    </Svg>
  );
};
export default PrevIcon;
