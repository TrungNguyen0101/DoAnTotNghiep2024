const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
};

class users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        user_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        last_name: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        first_name: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        gender: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        avatar_url: {
          type: DataTypes.STRING(512),
          allowNull: true,
        },
        phone_number: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        // google_id: {
        //   type: DataTypes.STRING(50),
        //   allowNull: true,
        // },
        role_id: {
          type: DataTypes.STRING(50),
          allowNull: true,
          references: {
            model: "role",
            key: "role_id",
          },
        },
        type: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        // file_cv: {
        //   type: DataTypes.STRING(255),
        //   allowNull: true,
        // },
        // address: {
        //   type: DataTypes.TEXT,
        //   allowNull: true,
        // },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
          {
            name: "role_id",
            using: "BTREE",
            fields: [{ name: "role_id" }],
          },
        ],
      }
    );
  }
}
