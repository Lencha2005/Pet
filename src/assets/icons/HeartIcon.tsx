import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

export default function HeartIcon({color = '#838383', isFocused = false}) {
  return (
    <Svg width="18" height="18" fill="none" viewBox="0 0 16 16">
      <G clipPath="url(#clip0_90_322)">
        <Path
          fill={isFocused ? color : 'none'}
          stroke={!isFocused ? '#838383' : undefined}
          strokeWidth={1}
          d="M11.667.278A4.267 4.267 0 008 2.478a4.267 4.267 0 00-3.667-2.2A4.533 4.533 0 000 4.978c0 3.031 3.19 6.342 5.867 8.586a3.316 3.316 0 004.266 0C12.81 11.32 16 8.01 16 4.978a4.534 4.534 0 00-4.333-4.7z"
        />
      </G>
    </Svg>
  );
}
