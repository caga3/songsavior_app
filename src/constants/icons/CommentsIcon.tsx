import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface CommentsIconProps {
  width?: string;
  height?: string;
  stroke?: string;
}
const CommentsIcon: React.FC<CommentsIconProps> = ({
  width = '25',
  height = '24',
  stroke = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <Path
        d="M8.5 8H16.5M8.5 12H14.5M4.5 20V7C4.5 6.20435 4.81607 5.44129 5.37868 4.87868C5.94129 4.31607 6.70435 4 7.5 4H17.5C18.2956 4 19.0587 4.31607 19.6213 4.87868C20.1839 5.44129 20.5 6.20435 20.5 7V13C20.5 13.7956 20.1839 14.5587 19.6213 15.1213C19.0587 15.6839 18.2956 16 17.5 16H8.5L4.5 20Z"
        stroke={stroke}
      />
    </Svg>
  );
};
export default CommentsIcon;
