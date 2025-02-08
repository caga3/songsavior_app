import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface GraphIconProps {
  width?: string;
  height?: string;
  fill?: string;
}
const GraphIcon: React.FC<GraphIconProps> = ({
  width = '20',
  height = '20',
  fill = '#FDF15D',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 7H16.333V4C16.333 3.73478 16.2276 3.48043 16.0401 3.29289C15.8526 3.10536 15.5982 3 15.333 3H8.667C8.40178 3 8.14743 3.10536 7.95989 3.29289C7.77236 3.48043 7.667 3.73478 7.667 4V11H2C1.73478 11 1.48043 11.1054 1.29289 11.2929C1.10536 11.4804 1 11.7348 1 12V20C1 20.2652 1.10536 20.5196 1.29289 20.7071C1.48043 20.8946 1.73478 21 2 21H22C22.2652 21 22.5196 20.8946 22.7071 20.7071C22.8946 20.5196 23 20.2652 23 20V8C23 7.73478 22.8946 7.48043 22.7071 7.29289C22.5196 7.10536 22.2652 7 22 7ZM7.667 19H3V13H7.667V19ZM14.333 8V19H9.667V5H14.333V8ZM21 19H16.333V9H21V19Z"
        fill={fill}
      />
    </Svg>
  );
};
export default GraphIcon;
