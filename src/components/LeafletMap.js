import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MapGL from 'react-map-gl';

const MapTemplate = () => {

  return (
    <MapGL width={400} height={400} latitude={37.7577} longitude={-122.4376}
      zoom={8} onChangeViewport={(viewport) => {
        const {latitude, longitude, zoom} = viewport;
        // Optionally call `setState` and use the state to update the map.
      }}
    />
  );
}


// StackedBarGraph.defaultProps = {
//   width: 600,
//   height: 40,
// };
//
// StackedBarGraph.propTypes = {
//   width: React.PropTypes.number.isRequired,
//   height: React.PropTypes.number.isRequired
// };

export default MapTemplate;
