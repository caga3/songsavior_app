import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface ShareIconProps {
  width?: string;
  height?: string;
  stroke?: string;
}
const ShareIcon: React.FC<ShareIconProps> = ({
  width = '25',
  height = '24',
  stroke = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <Path
        d="M9.03301 10.7L15.633 7.3M9.03301 13.3L15.633 16.7M9.33301 12C9.33301 13.6569 7.98986 15 6.33301 15C4.67615 15 3.33301 13.6569 3.33301 12C3.33301 10.3431 4.67615 9 6.33301 9C7.98986 9 9.33301 10.3431 9.33301 12ZM21.333 6C21.333 7.65685 19.9899 9 18.333 9C16.6762 9 15.333 7.65685 15.333 6C15.333 4.34315 16.6762 3 18.333 3C19.9899 3 21.333 4.34315 21.333 6ZM21.333 18C21.333 19.6569 19.9899 21 18.333 21C16.6762 21 15.333 19.6569 15.333 18C15.333 16.3431 16.6762 15 18.333 15C19.9899 15 21.333 16.3431 21.333 18Z"
        stroke={stroke}
      />
    </Svg>
  );
};
export default ShareIcon;
