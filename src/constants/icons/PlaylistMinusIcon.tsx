import React from 'react';

import Svg, {Path} from 'react-native-svg';

interface PlaylistMinusIconProps {
  stroke?: string;
}
const PlaylistMinusIcon: React.FC<PlaylistMinusIconProps> = ({
  stroke = '#FFFFFF',
}) => {
  return (
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 17M18 6H4H18ZM4 10H13H4ZM10 14H4H10ZM14 14H20H14Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default PlaylistMinusIcon;
