const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return student_education.init(sequelize, DataTypes);
};

class student_education extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        student_education_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        student_profile_id: {
          type: DataTypes.STRING(50),
          allowNull: true,
          references: {
            model: "student_profile",
            key: "student_profile_id",
          },
        },
        school: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        from_year: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        to_year: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "student_education",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "student_education_id" }],
          },
          {
            name: "student_profile_id",
            using: "BTREE",
            fields: [{ name: "student_profile_id" }],
          },
          // {
          //   name: "school_id",
          //   using: "BTREE",
          //   fields: [
          //     { name: "school_id" },
          //   ]
          // },
        ],
      }
    );
  }
}
