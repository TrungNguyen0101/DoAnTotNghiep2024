const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return token.init(sequelize, DataTypes);
};
// todo remove
class token extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        token_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.STRING(50),
          allowNull: true,
          references: {
            model: "users",
            key: "user_id",
          },
        },
        refresh_token: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        expired_at: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "token",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "token_id" }],
          },
          {
            name: "user_id",
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
        ],
      }
    );
  }
}
