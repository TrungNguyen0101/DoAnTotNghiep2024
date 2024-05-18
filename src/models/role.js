const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return role.init(sequelize, DataTypes);
}

class role extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    role_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  }
}
