// src/components/TabBarIcons.js
import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface TabBarIconProps {
  name: string;
  color: string;
  fill: string;
}

const TabBarIcons: React.FC<TabBarIconProps> = ({name, color, fill}) => {
  let iconPath;

  if (name === 'Player') {
    iconPath = 'M6.75 4V20L19.75 12L6.75 4Z';
  } else if (name === 'Feed') {
    iconPath =
      'M4.25 4H10.25V12H4.25V4ZM4.25 16H10.25V20H4.25V16ZM14.25 12H20.25V20H14.25V12ZM14.25 4H20.25V8H14.25V4Z';
  } else if (name === 'Charts') {
    iconPath = 'M4.75 19H20.75M4.75 15L8.75 9L12.75 11L16.75 6L20.75 10';
  } else if (name === 'Leaderboards') {
    iconPath =
      'M8.25 20H16.25M12.25 16V20M12.25 16C13.5761 16 14.8479 15.4732 15.7855 14.5355C16.7232 13.5979 17.25 12.3261 17.25 11V3H7.25V11C7.25 12.3261 7.77678 13.5979 8.71447 14.5355C9.65215 15.4732 10.9239 16 12.25 16ZM7.25 8C7.25 9.10457 6.35457 10 5.25 10C4.14543 10 3.25 9.10457 3.25 8C3.25 6.89543 4.14543 6 5.25 6C6.35457 6 7.25 6.89543 7.25 8ZM21.25 8C21.25 9.10457 20.3546 10 19.25 10C18.1454 10 17.25 9.10457 17.25 8C17.25 6.89543 18.1454 6 19.25 6C20.3546 6 21.25 6.89543 21.25 8Z';
  }
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill={fill}>
      <Path
        d={iconPath}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TabBarIcons;
