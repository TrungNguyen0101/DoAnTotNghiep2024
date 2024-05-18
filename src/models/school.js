const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return school.init(sequelize, DataTypes);
}

class school extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    school_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    level: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    established_date: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'school',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "school_id" },
        ]
      },
    ]
  });
  }
}
