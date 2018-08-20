/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
var appl_user_role = sequelize.define('appl_user_role', {
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    roleid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, 
  

  {
    tableName: 'appl_user_roles',
    timestamps: false

  });
  
  /*appl_user_role.associate = function (models) {
    models.appl_role.belongsToMany(models.appl_user, { through: models.appl_user_role });
    models.appl_user.belongsToMany(models.appl_role, { through: models.appl_user_role });
  }; */
 return appl_user_role;
};
