import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

export default function FavoriteIcon({isFavorite = false}) {
  return (
    <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <Rect width="36" height="36" rx="8" fill="white" />
      <G clip-path="url(#clip0_123_339)">
        <Path
          d="M22.5833 9.59711C21.645 9.6117 20.7271 9.87365 19.9223 10.3565C19.1176 10.8393 18.4545 11.526 18 12.3471C17.5455 11.526 16.8825 10.8393 16.0777 10.3565C15.273 9.87365 14.355 9.6117 13.4167 9.59711C11.9208 9.6621 10.5114 10.3165 9.49649 11.4173C8.48156 12.5181 7.94355 13.9759 8.00001 15.4721C8.00001 19.2613 11.9883 23.3996 15.3333 26.2054C16.0802 26.833 17.0245 27.1771 18 27.1771C18.9755 27.1771 19.9198 26.833 20.6667 26.2054C24.0117 23.3996 28 19.2613 28 15.4721C28.0565 13.9759 27.5185 12.5181 26.5035 11.4173C25.4886 10.3165 24.0792 9.6621 22.5833 9.59711Z"
          {...(isFavorite ? {fill: '#7A71BA'} : {})}
          stroke={'#838383'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_123_339">
          <Rect
            width="20"
            height="20"
            fill="white"
            transform="translate(8 8)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
