module.exports = function(app) {
 
   var customers = require('../controllers/customer.controller.js');
 
    
    // Retrieve all Customer
app.get('/api/customers', customers.findAll);

app.get('/api/customer/:id?', customers.findUser);

app.post('/api/customer', customers.insertUser);

}