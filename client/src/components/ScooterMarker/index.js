import React from 'react';

import styles from './styles.module.css';

export default function ScooterMarker() {
  return (
    <span aria-label="scooter" role="img" className={styles.marker}>
      📍
    </span>
  );
}
