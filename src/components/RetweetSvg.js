import React from 'react';

const retweetSvg = ({ color , width , height }) => {
  return (
    <svg width={width} height={height} viewBox="720 96 25 24" version="1.1">
        <g id="ic_replay" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(720.000000, 96.000000)">
            <path d="M12,5 L12,1 L7,6 L12,11 L12,7 C15.31,7 18,9.69 18,13 C18,16.31 15.31,19 12,19 C8.69,19 6,16.31 6,13 L4,13 C4,17.42 7.58,21 12,21 C16.42,21 20,17.42 20,13 C20,8.58 16.42,5 12,5 L12,5 Z" id="Shape" fillOpacity="0.7" fill={color}></path>
        </g>
    </svg>
  );
}
export default retweetSvg;
