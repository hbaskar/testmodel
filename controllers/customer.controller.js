

var db = require('../models');
var Customer = db.appl_user;
var id;
// Post a Customer

// FETCH all Customers
exports.findAll = (req, res) => {
    //console.log(req);
	Customer.findAll({
        attributes: ['userid', 'firstname','email','lastname'],
        include: [
            { model: db.appl_role,
                attributes: ['roleid','rolename'],
                through: {
                    attributes: ['roleid', 'userId'],
                } }
        ]
    }

    ).then(customers => {
      // Send all customers to Client    
      console.log(JSON.stringify(customers)) ; 
      res.render('index', { customer:customers[0].firstname, customers:customers });
	});
};

/*

exports.findById = (req, res) => {
    Customer.findById(req.param.id).then(user => {
    res.render('index', { customer:user.firstname, customers:user });
});
};
*/
exports.findUser = (req, res) => {
    console.log('param->',req.params.userid);
    Customer.findById(req.params.userid).then(user => {
        res.render('index', { customer:user.firstname, customers:user });
    });
    };
    

exports.insertUser = (req, res)=> {
    console.log('param->',req.body);
        Customer.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password
        }).then(newUser => {
            console.log(`New user ${newUser.firstname}, with id ${newUser.userid} has been created.`);
            res.render('index', { customer:newUser.firstname, customers:newUser });
          });
        };

    exports.createUser = (req, res) => {
        console.log('param->',req.body);
    
    Customer.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    })
.then(user => {
    console.log(JSON.stringify(user)) ;
          res.render('index', { customer:user.firstname, customers:user });
        });
    };

   /* exports.updateUser = (req, res) => {
        console.log('param->',req.body);
    
    Customer.update({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
        
    }, {returning: true, plain:true, where: {id: req.params.id} })
    .then(([ rowsUpdate, newUser ])=> {
        console.log(JSON.stringify(newUser)) ;
        console.log(`User ${newUser.firstname}, with id ${newUser.id} has been updated.`);
        res.render('index', { customer:newUser.firstname, customers:newUser });
      });
    };
*/

exports.updateUser = function (req, res) {
    Customer.update(
        {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password
            
        },
      {returning: true, plain:true, where: {userid: req.params.userid} }
    )
    .then( (updateCnt, newUser ) => {
        console.log('after update',newUser);

      res.json(updateCnt);
    });
   
   };
   
   exports.deleteUser = function(req, res) {
    Customer.destroy({
      where: {
        userid: req.params.userid
      }
    }).then(function (deletedRecord) {
        if(deletedRecord === 1){
            console.log(`User with id - ${req.params.userid} has been deleted`);
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