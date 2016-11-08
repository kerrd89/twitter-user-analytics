import React from 'react';

const likeSvg = ({ color , width , height }) => {
  return (
    <svg width={width} height={height} viewBox="144 144 24 24" >
        <g id="ic_favorite" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(144.000000, 144.000000)">
            <polygon id="Bounds" fillOpacity="0.1" fill={color} points="0 0 24 0 24 24 0 24"></polygon>
            <path d="M12,21.35 L10.55,20.03 C5.4,15.36 2,12.28 2,8.5 C2,5.42 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.09 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.42 22,8.5 C22,12.28 18.6,15.36 13.45,20.04 L12,21.35 L12,21.35 Z" id="Shape" fillOpacity="0.7" fill="rgb(128, 194, 175)"></path>
        </g>
    </svg>
  );
}
export default likeSvg;
