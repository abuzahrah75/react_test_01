import React from 'react';
import GoogleMapReact from 'google-map-react';

import { GOOGLE_MAP_API_KEY } from '../../settings';

import ScooterMarker from '../ScooterMarker';
import styles from './styles.module.css';

function renderMarker({ lat, lng, id }) {
  return <ScooterMarker key={id} lat={lat} lng={lng} />;
}

export default class ScooterMap extends React.PureComponent {
  render() {
    const { center, data } = this.props;

    return (
      <div className={styles.container}>
        <GoogleMapReact bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }} defaultCenter={center} defaultZoom={12}>
          {data.map(renderMarker)}
        </GoogleMapReact>
      </div>
    );
  }
}
