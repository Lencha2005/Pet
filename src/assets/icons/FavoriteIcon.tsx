import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

export default function FavoriteIcon() {
  return (
    <Svg width="36" height="36" fill="none" viewBox="0 0 36 36">
      <Rect width="36" height="36" fill="#fff" rx="8" />
      <G clipPath="url(#clip0_12_2657)">
        <Path
          fill="#838383"
          d="M22.583 9.597A5.334 5.334 0 0018 12.347a5.333 5.333 0 00-4.583-2.75A5.667 5.667 0 008 15.472c0 3.79 3.988 7.928 7.333 10.733a4.145 4.145 0 005.334 0C24.012 23.4 28 19.261 28 15.472a5.666 5.666 0 00-5.417-5.875zM19.596 24.93a2.477 2.477 0 01-3.192 0c-4.281-3.592-6.737-7.039-6.737-9.458a4 4 0 013.75-4.208 4 4 0 013.75 4.208.833.833 0 001.666 0 4 4 0 013.75-4.208 4 4 0 013.75 4.208c0 2.42-2.455 5.866-6.737 9.455v.003z"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_12_2657">
          <Path fill="#fff" d="M0 0H20V20H0z" transform="translate(8 8)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
