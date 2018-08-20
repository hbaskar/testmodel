/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var appl_role = sequelize.define('appl_role', {
    roleid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rolename: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    roledesc: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'appl_roles'
  });
  appl_role.associate = function (models) {
    appl_role.belongsToMany(models.appl_user, { through: models.appl_user_role, foreignKey: 'roleid'});
    
  }; 
  return appl_role;
};
