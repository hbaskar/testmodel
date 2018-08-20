

var db = require('../models');
var Role = db.appl_role;
var id;
// Post a Customer

// FETCH all Customers
exports.findAll = (req, res) => {
	Role.findAll({

        order:[
            ['roleid','DESC']
        ]
    
    }).then(roles => {
      // Send all customers to Client     
      res.render('role', { role:roles[0].rolename, roles:roles });
	});
};


exports.findRole = (req, res) => {
    console.log('param->',req.params.roleid);
    Role.findById(req.params.roleid).then(role => {
        res.render('role', { role:role.rolename, roles:role });
    });
    };
    

exports.insertRole = (req, res)=> {
    console.log('param->',req.body);
        Role.create({
            rolename:req.body.rolename,
            status:req.body.status,
            roledesc:req.body.rolename
        }).then(newRole => {
            console.log(`New Role ${newRole.rolename}, with id ${newRole.roleid} has been created.`);
            res.render('role', { role:newRole.rolename, roles:newRole });
          });
        };

    

  

exports.updateRole = function (req, res) {
    Role.update(
        {
            rolename:req.body.rolename,
            status:req.body.status,
            roledesc:req.body.rolename
            
        },
      {returning: true, plain:true, where: {roleid: req.params.roleid} }
    )
    .then( (updateCnt, newRole ) => {
        console.log('after update',newRole);

      res.json(newRole);
    });
   
   };
   
   exports.deleteRole = function(req, res) {
    Role.destroy({
      where: {
        roleid: req.params.roleid
      }
    }).then(function (deletedRecord) {
        if(deletedRecord === 1){
            console.log(`Role with id - ${req.params.roleid} has been deleted`);
            res.status(200).json({message:"Deleted successfully"});          
        }
        else
        {
            res.status(404).json({message:"record not found"})
        }
    })
    .catch(function (error){
        res.status(500).json(error);
    });
};