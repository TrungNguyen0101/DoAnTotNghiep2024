const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return rate.init(sequelize, DataTypes);
};

class rate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        rate: {
          type: DataTypes.TEXT("long"),
          allowNull: false,
        },
        author_id: {
          allowNull: true,
          defaultValue: null,
          type: DataTypes.STRING(50),
        },
        view_id: {
          allowNull: true,
          defaultValue: null,
          type: DataTypes.STRING(50),
        },
      },
      {
        sequelize,
        tableName: "rate",
        timestamps: false,
      }
    );
  }
}
