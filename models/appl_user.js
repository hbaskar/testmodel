/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var appl_user = sequelize.define('appl_user', {
      userid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      lastname: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('active','inactive'),
        allowNull: true,
        defaultValue: 'active'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, 
    {
      tableName: 'appl_users'
    });

    appl_user.associate = function (models) {
      
      appl_user.belongsToMany(models.appl_role, { through: models.appl_user_role,foreignKey: 'userid' });
    }; 
    return appl_user;
  };
  