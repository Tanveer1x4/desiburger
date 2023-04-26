
const ErrorHandler = require('../utils/ErrorHandler')
const isAuthenticated = (req,res,next)=>{
    const token = req.cookies['connect.sid'];
    console.log(token);

    if(!token)
    {
        return next(new ErrorHandler('Not loggedIn',401))
    }
    next();
};
module.exports = isAuthenticated;

const isAdmin = (req,res,next)=>{
   

    if(req.user.role!=='admin')
    {
        return next(new ErrorHandler('only admin allowed',405))
    }
    next();
};
module.exports = isAdmin;