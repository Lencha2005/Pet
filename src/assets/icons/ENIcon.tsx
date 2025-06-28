import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

export default function ENIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_44_2628)">
        <Path
          d="M21.3333 3.33333H2.66667C1.95942 3.33333 1.28115 3.61428 0.781049 4.11438C0.280952 4.61447 0 5.29275 0 5.99999L0 18C0 18.7072 0.280952 19.3855 0.781049 19.8856C1.28115 20.3857 1.95942 20.6667 2.66667 20.6667H21.3333C22.0406 20.6667 22.7189 20.3857 23.219 19.8856C23.719 19.3855 24 18.7072 24 18V5.99999C24 5.29275 23.719 4.61447 23.219 4.11438C22.7189 3.61428 22.0406 3.33333 21.3333 3.33333Z"
          fill="#E7E7E7"
        />
        <Path
          d="M14 3.33333H10V10H0V14H10V20.6667H14V14H24V10H14V3.33333Z"
          fill="#CE1124"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_44_2628">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
