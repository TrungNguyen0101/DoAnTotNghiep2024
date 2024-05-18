const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tutor_certification.init(sequelize, DataTypes);
}

class tutor_certification extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tutor_certification_id: {
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
    score: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    award_url: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tutor_certification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tutor_certification_id" },
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
