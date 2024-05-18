const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return payment_transaction.init(sequelize, DataTypes);
}

class payment_transaction extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    payment_transaction_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    tutor_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    student_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    amount: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payment_transaction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "payment_transaction_id" },
        ]
      },
      {
        name: "tutor_id",
        using: "BTREE",
        fields: [
          { name: "tutor_id" },
        ]
      },
      {
        name: "student_id",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
    ]
  });
  }
}
