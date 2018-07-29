

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
        models.User.create({
          appl_user:req.body
        }).then(newUser => {
            console.log(`New user ${newUser.firstname}, with id ${newUser.id} has been created.`);
          });
        };