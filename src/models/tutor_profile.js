const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return tutor_profile.init(sequelize, DataTypes);
};

class tutor_profile extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        tutor_profile_id: {
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
        description: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        stripe_account_id: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        is_stripe_verified: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        balance: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        has_charge_first_time: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tutor_profile",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "tutor_profile_id" }],
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
