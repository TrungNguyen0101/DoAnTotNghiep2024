const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return course_program_phase.init(sequelize, DataTypes);
}

class course_program_phase extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    course_program_phase_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    course_program_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'course_program',
        key: 'course_program_id'
      }
    },
    orders: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    overview_url: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course_program_phase',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "course_program_phase_id" },
        ]
      },
      {
        name: "course_program_id",
        using: "BTREE",
        fields: [
          { name: "course_program_id" },
        ]
      },
    ]
  });
  }
}
