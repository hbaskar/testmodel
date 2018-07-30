

var db = require('../models');
var Customer = db.appl_user;
var id;
// Post a Customer

// FETCH all Customers
exports.findAll = (req, res) => {
	Customer.findAll().then(customers => {
      // Send all customers to Client     
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
    console.log('param->',req.params.id);
    Customer.findById(req.params.id).then(user => {
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
            console.log(`New user ${newUser.firstname}, with id ${newUser.id} has been created.`);
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
      {returning: true, plain:true, where: {id: req.params.id} }
    )
    .then( (updateCnt, newUser ) => {
        console.log('after update',newUser);

      res.json(updateCnt);
    });
   
   };
   
   exports.deleteUser = function(req, res) {
    Customer.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (deletedRecord) {
        if(deletedRecord === 1){
            console.log(`User with id - ${req.params.id} has been deleted`);
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