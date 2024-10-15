import React from 'react';

import Svg, {Path} from 'react-native-svg';

const AddIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 20 24" fill="none">
      <Path
        d="M12 5V19"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5 12H19"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default AddIcon;
