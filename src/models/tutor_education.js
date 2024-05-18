const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tutor_education.init(sequelize, DataTypes);
}

class tutor_education extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tutor_education_id: {
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
    school_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'school',
        key: 'school_id'
      }
    },
    score_url: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    from_year: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    to_year: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    favorite_subject: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tutor_education',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tutor_education_id" },
        ]
      },
      {
        name: "tutor_profile_id",
        using: "BTREE",
        fields: [
          { name: "tutor_profile_id" },
        ]
      },
      {
        name: "school_id",
        using: "BTREE",
        fields: [
          { name: "school_id" },
        ]
      },
    ]
  });
  }
}
