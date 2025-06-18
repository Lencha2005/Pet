import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({width = 14, height = 14, color = 'black'}) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 12 12">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M.293.293a1 1 0 011.414 0L6 4.586 10.293.293a1 1 0 111.414 1.414L7.414 6l4.293 4.293a1 1 0 01-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 01-1.414-1.414L4.586 6 .293 1.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
