import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

export default function PLIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_44_2634)">
        <Path
          d="M21.3333 3.33334H2.66667C1.95942 3.33334 1.28115 3.61429 0.781049 4.11438C0.280952 4.61448 0 5.29276 0 6L0 12H24V6C24 5.29276 23.719 4.61448 23.219 4.11438C22.7189 3.61429 22.0406 3.33334 21.3333 3.33334Z"
          fill="#E7E7E7"
        />
        <Path
          d="M0 18C0 18.7072 0.280952 19.3855 0.781049 19.8856C1.28115 20.3857 1.95942 20.6667 2.66667 20.6667H21.3333C22.0406 20.6667 22.7189 20.3857 23.219 19.8856C23.719 19.3855 24 18.7072 24 18V12H0V18Z"
          fill="#DC143C"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_44_2634">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
