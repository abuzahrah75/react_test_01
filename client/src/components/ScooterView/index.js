import React from 'react';
import _ from 'lodash';
import { getScooters } from '../../api/scootersApi';

import ScooterMap from '../ScooterMap';

import styles from './styles.module.css';

export default class ScooterView extends React.PureComponent {
  fetchRecords = _.debounce(async () => {
    const { lat, lng, radius, limit } = this.state;
    const data = await getScooters(lat, lng, radius, limit);

    this.setState({ data });
  }, 300);

  constructor(props) {
    super(props);
    this.state = {
      lat: 1.37,
      lng: 103.83,
      radius: 3000,
      limit: 50,
      data: [],
    };
  }

  componentDidMount() {
    this.fetchRecords();
  }

  handleOnChangeLat = e => {
    this.setState({ lat: e.target.value });
    this.fetchRecords();
  };

  handleOnChangeLng = e => {
    this.setState({ lng: e.target.value });
    this.fetchRecords();
  };

  handleOnChangeRadius = e => {
    this.setState({ radius: e.target.value });
    this.fetchRecords();
  };

  handleOnChangeLimit = e => {
    this.setState({ limit: e.target.value });
    this.fetchRecords();
  };

  render() {
    const { lat, lng, radius, limit, data } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.inputRow}>
          <input type="number" onChange={this.handleOnChangeLat} value={lat} step={0.01} />
          <input type="number" onChange={this.handleOnChangeLng} value={lng} step={0.01} />
          <input type="number" onChange={this.handleOnChangeRadius} value={radius} step={1000} />
          <input type="number" onChange={this.handleOnChangeLimit} value={limit} step={10} />
        </div>
        <div className={styles.mapWrapper}>
          <ScooterMap data={data} center={{ lat, lng }} />
        </div>
      </div>
    );
  }
}
