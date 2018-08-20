module.exports = function(app) {
 
   var roles  = require('../controllers/role.controller.js');
 
    
    // Retrieve all Customer
app.get('/api/roles', roles.findAll);

app.get('/api/role/:roleid?', roles.findRole);

app.post('/api/role', roles.insertRole);

app.put('/api/role/:roleid', roles.updateRole);
 
    // Delete a Customer with Id
app.delete('/api/role/:roleid', roles.deleteRole);


};