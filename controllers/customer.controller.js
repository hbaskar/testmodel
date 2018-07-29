

var db = require('../models');
var Customer = db.appl_user;

// Post a Customer

// FETCH all Customers
exports.findAll = (req, res) => {
	Customer.findAll().then(customers => {
      // Send all customers to Client
      console.log('cutomers ->>'+customers);;
     
      res.render('index', { customer:customers[0].firstname, customers:customers });
	});
};


