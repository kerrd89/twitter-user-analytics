import React from 'react';
import DeleteSvg from './DeleteSvg';

const ActiveFilter = ({ filterParameter, onClick }) => {
  return (
    <div className="tweets-active-filter">
      <p>Tweets with #{filterParameter}</p>
      <DeleteSvg width="40px" height="40px" color="rgb(128, 194, 175)"
        onClick={e=>onClick()}
      />
    </div>
  );
}
export default ActiveFilter;
