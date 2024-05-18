const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return comment.init(sequelize, DataTypes);
}

class comment extends Sequelize.Model {
    static init(sequelize, DataTypes) {
      return super.init({
        comment_id: {
          type: DataTypes.STRING(50),
          primaryKey: true,
          allowNull: false
        },
        content: {
          type: DataTypes.TEXT('long'),
          allowNull: false
        },
        author_id: {
          allowNull: true,
          defaultValue: null,
          type: DataTypes.STRING(50),
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        user_id: {
            allowNull: false,
            type: DataTypes.STRING(50),
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        create_at: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      },  {
        sequelize,
        tableName: "comments",
        timestamps: false,
      })
    }
  }

  