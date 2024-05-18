const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return course_program.init(sequelize, DataTypes);
}

class course_program extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    course_program_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    course_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'course',
        key: 'course_id'
      }
    },
    tittle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    is_publish: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course_program',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "course_program_id" },
        ]
      },
      {
        name: "course_id",
        using: "BTREE",
        fields: [
          { name: "course_id" },
        ]
      },
    ]
  });
  }
}
