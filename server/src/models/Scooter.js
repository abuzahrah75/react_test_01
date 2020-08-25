export default (sequelize, DataTypes) => {
  const options = {
    comment: 'Scooter',
  };

  const attributes = {
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  };

  return sequelize.define('Scooter', attributes, options);
};
