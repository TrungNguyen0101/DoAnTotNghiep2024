const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tutor_experience.init(sequelize, DataTypes);
}

class tutor_experience extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tutor_experience_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    tutor_profile_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'tutor_profile',
        key: 'tutor_profile_id'
      }
    },
    organization: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    start_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    end_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tutor_experience',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tutor_experience_id" },
        ]
      },
      {
        name: "tutor_profile_id",
        using: "BTREE",
        fields: [
          { name: "tutor_profile_id" },
        ]
      },
    ]
  });
  }
}
