import React from 'react';

const deleteSvg = ({ color , width , height, onClick }) => {
  return (
    <svg width={width} height={height} viewBox="624 144 24 24" onClick={onClick} className="delete-svg">
        <g id="ic_highlight_remove" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(624.000000, 144.000000)">
            <path d="M14.59,8 L12,10.59 L9.41,8 L8,9.41 L10.59,12 L8,14.59 L9.41,16 L12,13.41 L14.59,16 L16,14.59 L13.41,12 L16,9.41 L14.59,8 L14.59,8 Z M12,2 C6.47,2 2,6.47 2,12 C2,17.53 6.47,22 12,22 C17.53,22 22,17.53 22,12 C22,6.47 17.53,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z" id="Shape" fillOpacity="0.7" fill={color}></path>
        </g>
    </svg>
  );
}
export default deleteSvg;
