const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tutoring_contract.init(sequelize, DataTypes);
}

class tutoring_contract extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tutoring_contract_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    booked_session_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'booked_session',
        key: 'booked_session_id'
      }
    },
    tutor_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    expiration_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tutoring_contract',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tutoring_contract_id" },
        ]
      },
      {
        name: "booked_session_id",
        using: "BTREE",
        fields: [
          { name: "booked_session_id" },
        ]
      },
      {
        name: "tutor_id",
        using: "BTREE",
        fields: [
          { name: "tutor_id" },
        ]
      },
    ]
  });
  }
}
