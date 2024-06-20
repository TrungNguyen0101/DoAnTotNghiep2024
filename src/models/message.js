const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return message.init(sequelize, DataTypes);
};

class message extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        message_id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        receiver_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        sender_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        timestamp: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        isRead: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "message",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "message_id" }],
          },
          {
            name: "sender_id",
            using: "BTREE",
            fields: [{ name: "sender_id" }],
          },
          {
            name: "receiver_id",
            using: "BTREE",
            fields: [{ name: "receiver_id" }],
          },
        ],
      }
    );
  }
}
