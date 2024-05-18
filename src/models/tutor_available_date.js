const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tutor_available_date.init(sequelize, DataTypes);
}

class tutor_available_date extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tutor_available_date_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    start_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    end_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    set_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tutor_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tutor_available_date',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tutor_available_date_id" },
        ]
      },
    ]
  });
  }
}
