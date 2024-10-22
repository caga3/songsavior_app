import React from 'react';

import Svg, {Path} from 'react-native-svg';

const PauseMiniIcon = () => {
  return (
    <Svg width="16" height="16" viewBox="0 0 48 48"> 
      <Path
        d="M12 38h8V10h-8v28zm16-28v28h8V10h-8z" 
        fill="#FDF15D"
      /> 
    </Svg>
  );
};
export default PauseMiniIcon;