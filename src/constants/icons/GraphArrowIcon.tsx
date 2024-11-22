import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface GraphArrowIconProps {
  width?: string;
  height?: string;
  fill?: string;
}
const GraphArrowIcon: React.FC<GraphArrowIconProps> = ({
  width = '21',
  height = '20',
  fill = '#fdf15d',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
      <Path
        d="M19.2499 4.375V9.375C19.25 9.49868 19.2134 9.61962 19.1447 9.72249C19.076 9.82536 18.9784 9.90554 18.8641 9.95289C18.7498 10.0002 18.6241 10.0126 18.5028 9.98846C18.3815 9.9643 18.2701 9.9047 18.1827 9.81719L16.1249 7.75859L11.567 12.3172C11.509 12.3753 11.4401 12.4214 11.3642 12.4529C11.2883 12.4843 11.207 12.5005 11.1249 12.5005C11.0427 12.5005 10.9614 12.4843 10.8855 12.4529C10.8096 12.4214 10.7407 12.3753 10.6827 12.3172L7.99986 9.63359L2.81705 14.8172C2.69977 14.9345 2.54071 15.0003 2.37486 15.0003C2.20901 15.0003 2.04995 14.9345 1.93267 14.8172C1.8154 14.6999 1.74951 14.5409 1.74951 14.375C1.74951 14.2091 1.8154 14.0501 1.93267 13.9328L7.55767 8.30781C7.61572 8.2497 7.68465 8.2036 7.76052 8.17215C7.8364 8.1407 7.91773 8.12451 7.99986 8.12451C8.08199 8.12451 8.16332 8.1407 8.2392 8.17215C8.31507 8.2036 8.384 8.2497 8.44205 8.30781L11.1249 10.9914L15.2413 6.875L13.1827 4.81719C13.0952 4.72978 13.0356 4.61837 13.0114 4.49707C12.9872 4.37576 12.9996 4.25002 13.047 4.13576C13.0943 4.02149 13.1745 3.92384 13.2774 3.85517C13.3802 3.78651 13.5012 3.7499 13.6249 3.75H18.6249C18.7906 3.75 18.9496 3.81585 19.0668 3.93306C19.184 4.05027 19.2499 4.20924 19.2499 4.375Z"
        fill={fill}
      />
    </Svg>
  );
};
export default GraphArrowIcon;