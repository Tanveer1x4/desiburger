const asyncError = require("../middleware/errorMiddleware");
const User = require('../model/userSchema')
const Order =  require('../model/orderSchema')
module.exports.myProfile = function(req,res,next){
    res.status(200).json({
        success:true,
        user:req.user,
    });
}
module.exports.destroySession = function(req,res,next){
    req.session.destroy((err)=>{
        if(err)
        {
            return next(err);
        }
        res.clearCookie('connect.sid');
        res.status(200).json({
            message:'Logged out',
        });
    });
}

module.exports.getAdminUser = asyncError(async(req,res,next)=>{
const users = await User.find({});
res.status(200).json({
    success:true,
    users,
});
})
module.exports.getAdminStats = asyncError(async(req,res,next)=>{
   const userCount = await User.countDocuments();
   const orders = await Order.find({});
   const preparingOrder = orders.filter((i)=>i.orderStatus==='Preparing');
   const shippedOrder = orders.filter((i)=>i.orderStatus==='Shipped');
   const deliveredOrder = orders.filter((i)=>i.orderStatus==='Delivered');
    let totalIncome =0;
    orders.forEach((i)=>{
        totalIncome += i.totalPrice;
    });
    res.status(200).json({
        success:true,
        usersCount,
        ordersCount:{
            total:orders.length,
            preparing:preparingOrder.length,
            shipped:shippedOrder.length,
            delivered:deliveredOrder.length
        }
    })
    })