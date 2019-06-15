const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
 const token = req.header('x-auth-token');
 if (!token) {
    console.log('here');
   return res.sendStatus(401);
 }

 try {
   const decoded = jwt.verify(token, 'shhhh');
   req.user = decoded.user;
   next();
 } catch (err) {
   res.sendStatus(401);
   
 }
};