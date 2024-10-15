import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface StarsIconProps {
  width?: string;
  height?: string;
  fill?: string;
}
const StarsIcon: React.FC<StarsIconProps> = ({
  width = '48',
  height = '48',
  fill = '#717172',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 48" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.75 8C25.1954 8 25.6022 8.25308 25.7993 8.65283L30.3416 17.8646L40.4977 19.3377C40.9387 19.4017 41.3051 19.7108 41.4428 20.135C41.5804 20.5592 41.4653 21.0249 41.146 21.336L33.7864 28.506L35.5217 38.6309C35.5971 39.0704 35.4164 39.5147 35.0558 39.7766C34.6952 40.0386 34.2172 40.0729 33.8229 39.8649L24.7603 35.0852L15.6761 39.8655C15.2819 40.0729 14.8041 40.0384 14.4438 39.7763C14.0834 39.5143 13.903 39.0702 13.9783 38.6309L15.7136 28.506L8.35398 21.336C8.03466 21.0249 7.91961 20.5592 8.05725 20.135C8.19488 19.7108 8.56131 19.4017 9.00233 19.3377L19.1584 17.8646L23.7007 8.65283C23.8978 8.25308 24.3046 8 24.75 8Z"
        fill={fill}
      />
    </Svg>
  );
};
export default StarsIcon;
