const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return user_verification_request.init(sequelize, DataTypes);
}

class user_verification_request extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_verification_request_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    data: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    expiration_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tuser_verification_request_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_verification_request',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_verification_request_id" },
        ]
      },
    ]
  });
  }
}
