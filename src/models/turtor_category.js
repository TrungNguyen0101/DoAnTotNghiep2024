const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return turtor_category.init(sequelize, DataTypes);
};
class turtor_category extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        tutor_p_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          references: {
            model: "tutor_profile",
            key: "tutor_profile_id",
          },
        },
        category_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          references: {
            model: "category",
            key: "category_id",
          },
        },
      },
      {
        sequelize,
        tableName: "turtor_category",
        timestamps: false,
      }
    );
  }
}
