const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return student_profile.init(sequelize, DataTypes);
};

class student_profile extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        student_profile_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        student_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          references: {
            model: "users",
            key: "user_id",
          },
        },
      },
      {
        sequelize,
        tableName: "student_profile",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "student_profile_id" }],
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
