const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return booked_session.init(sequelize, DataTypes);
}

class booked_session extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    booked_session_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
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
    price: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    checkout_session_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    course_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'course',
        key: 'course_id'
      }
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    data: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'booked_session',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "booked_session_id" },
        ]
      },
      {
        name: "student_id",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
      {
        name: "tutor_id",
        using: "BTREE",
        fields: [
          { name: "tutor_id" },
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
