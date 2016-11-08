import React from 'react';

const likeSvg = ({ color , width , height }) => {
  return (
    <svg width={width} height={height} viewBox="144 144 24 24" >
        <g id="ic_favorite" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(144.000000, 144.000000)">
            <polygon id="Bounds" fillOpacity="0.1" fill={color} points="0 0 24 0 24 24 0 24"></polygon>
            <path d="M12,21.35 L10.55,20.03 C5.4,15.36 2,12.28 2,8.5 C2,5.42 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.09 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.42 22,8.5 C22,12.28 18.6,15.36 13.45,20.04 L12,21.35 L12,21.35 Z" id="Shape" fillOpacity="0.7" fill="rgb(128, 194, 175)"></path>
        </g>
    </svg>

// <svg width="24px" height="24px" viewBox="192 144 24 24" >
//     <g id="ic_favorite_outline" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(192.000000, 144.000000)">
//         <path d="M16.5,3 C14.76,3 13.09,3.81 12,5.09 C10.91,3.81 9.24,3 7.5,3 C4.42,3 2,5.42 2,8.5 C2,12.28 5.4,15.36 10.55,20.04 L12,21.35 L13.45,20.03 C18.6,15.36 22,12.28 22,8.5 C22,5.42 19.58,3 16.5,3 L16.5,3 Z M12.1,18.55 L12,18.65 L11.9,18.55 C7.14,14.24 4,11.39 4,8.5 C4,6.5 5.5,5 7.5,5 C9.04,5 10.54,5.99 11.07,7.36 L12.94,7.36 C13.46,5.99 14.96,5 16.5,5 C18.5,5 20,6.5 20,8.5 C20,11.39 16.86,14.24 12.1,18.55 L12.1,18.55 Z" id="Shape" fill-opacity="0.7" fill="#FFFFFF"></path>
//     </g>
// </svg>
  );
}
export default likeSvg;






// <polygon id="Bounds" fill-opacity="0.1" fill="#FF0000" points="0 0 24 0 24 24 0 24"></polygon>
