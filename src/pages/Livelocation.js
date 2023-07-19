import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { useParams } from 'react-router-dom';

const Map = () => {
  const { latitude, longitude } = useParams();
  const parsedLatitude = parseFloat(latitude);
  const parsedLongitude = parseFloat(longitude);
  const position = [parsedLongitude, parsedLatitude];

  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };

  const Mapbox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiaGFyc2hlbmRyYSIsImEiOiJjbGs0ODhtZTYweTh0M2NtcHo1Z3Rzeng3In0.7fLHo3Sehy2Tu6VfJTTGVQ',
  });

  return (
    <Mapbox style="mapbox://styles/mapbox/streets-v11" center={position} zoom={[13]} containerStyle={mapContainerStyle}>
      <Marker coordinates={position} anchor="bottom">
        <div style={{ width: '20px', height: '20px', background: 'red' }}></div>
      </Marker>
    </Mapbox>
  );
};

export default Map;


