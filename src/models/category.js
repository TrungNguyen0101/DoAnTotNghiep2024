const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return category.init(sequelize, DataTypes);
}

class category extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    category_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tutor_p_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}



