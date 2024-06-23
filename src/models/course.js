const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return course.init(sequelize, DataTypes);
};

class course extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        course_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        image_url: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        description: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        price: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        hour: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        tutor_profile_id: {
          type: DataTypes.STRING(50),
          allowNull: true,
          references: {
            model: "tutor_profile",
            key: "tutor_profile_id",
          },
        },
        ratting: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        type_course: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        is_delete: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        category_id: {
          type: DataTypes.STRING(50),
          allowNull: true,
          references: {
            model: "category",
            key: "category_id",
          },
        },
      },
      {
        sequelize,
        tableName: "course",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "course_id" }],
          },
          {
            name: "tutor_profile_id",
            using: "BTREE",
            fields: [{ name: "tutor_profile_id" }],
          },
          {
            name: "category_id",
            using: "BTREE",
            fields: [{ name: "category_id" }],
          },
        ],
      }
    );
  }
}
