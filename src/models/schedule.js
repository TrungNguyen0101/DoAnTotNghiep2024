const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return schedule.init(sequelize, DataTypes);
};

class schedule extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        schedule_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        tutor_available_date_id: {
          type: DataTypes.STRING(50),
          allowNull: true,
          references: {
            model: "tutor_available_date",
            key: "tutor_available_date_id",
          },
        },
        student_id: {
          type: DataTypes.STRING(50),
          allowNull: true,
          references: {
            model: "users",
            key: "user_id",
          },
        },
        booked_session_id: {
          type: DataTypes.STRING(50),
          allowNull: true,
          references: {
            model: "booked_session",
            key: "booked_session_id",
          },
        },
        status: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "schedule",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "schedule_id" }],
          },
          {
            name: "tutor_available_date_id",
            using: "BTREE",
            fields: [{ name: "tutor_available_date_id" }],
          },
          {
            name: "student_id",
            using: "BTREE",
            fields: [{ name: "student_id" }],
          },
        ],
      }
    );
  }
}
