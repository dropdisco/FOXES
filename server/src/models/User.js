const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skykey: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 15,
      },
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        "https://siasky.net/CADIvje1Fdy2FP2TeBsYAbHfUsNug98wE7SYArdyczDaDg"
    },
    cover: {
      type: DataTypes.STRING,
      defaultValue:
        "https://siasky.net/PAF6_Yq2WW_DafoVCl54eyuAK2B2q4RJuSOwFtoihUCE3w"
    },
    channelDescription: {
      type: DataTypes.STRING
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });
};
