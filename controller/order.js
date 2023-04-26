
const asyncError = require('../middleware/errorMiddleware')
const Order = require('../model/orderSchema');
const instance = require('../config/Razor')
const Payment = require('../model/paymentSchema')
const crypto = require('crypto');
const ErrorHandler = require('../utils/ErrorHandler');
const dotenv = require('dotenv');
dotenv.config()
module.exports.placeOrder = asyncError(
    async (req,res,next)=>{
        const {shippingInfo,orderItems,paymentMethod,itemsPrice,taxPrice,shippingCharges,totalPrice}=req.body;

    const user = req.user._id;
    const orderOptions={shippingInfo,orderItems,paymentMethod,itemsPrice,taxPrice,shippingCharges,totalPrice,user};
    await Order.create(orderOptions);
    res.status(201).json({
        success:true,
        message:'Order Placed Successfully via cash on delivery'
    })
}
)
module.exports.onlineOrder = asyncError(
    async (req,res,next)=>{
        const {shippingInfo,orderItems,paymentMethod,itemsPrice,taxPrice,shippingCharges,totalPrice}=req.body;

    const user = req.user._id;
    const orderOptions={shippingInfo,orderItems,paymentMethod,itemsPrice,taxPrice,shippingCharges,totalPrice,user};
   const options = {
       amount:Number(totalPrice)*100,
       currency:'INR',
   

   };
   const order = await instance.orders.create(options);
    res.status(201).json({
        success:true,
       order,
       orderOptions,
    });
}
);
module.exports.paymentVerification = asyncError(async(req,res,next)=>{
   const {razorpay_payment_id,razorpay_order_id,razorpay_signature,orderOptions} =req.body;
   const body = razorpay_order_id + "|" + razorpay_payment_id;
   const expectedSignature = crypto.createHmac('sha256',process.env.RAZOR_PAY_API_SECRET).update(body).digest('hex');
   const isAuthentic = expectedSignature === razorpay_signature;
   if(isAuthentic)
   {
      const payment = await Payment.create({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
      })
      await Order.create({
          ...orderOptions,
          paidAt:new Date(Date.now()),
          paymentInfo:payment._id,
      })
      res.status(201).json({
          success:true,
          message:`order placed successfully .Payment_ID: ${payment._id}`,
      })
   }
   else{
       return next(new ErrorHandler('Payment failed',400));
   }

})

module.exports.getMyOrders = asyncError(async(req,res,next)=>{
const orders = await Order.find({
    user:req.user._id,
}).populate('user','name');
res.status(200).json({
    success:true,
    orders,
})
}
)

module.exports.getOrderDetails = asyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name');
    if(!order)
    {
        return next(new ErrorHandler('Invalid Order Id',404))
    }
    res.status(200).json({
        success:true,
        order,
    })
})
module.exports.getAdminOrder = asyncError(async(req,res,next)=>{
    const order = await Order.find({}).populate('user','name');
    if(!order)
    {
        return next(new ErrorHandler('Invalid Order Id',404))
    }
    res.status(200).json({
        success:true,
        order,
    })
})
module.exports.processOrder = asyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name');
    if(!order)
    {
        return next(new ErrorHandler('Invalid Order Id',404))
    }
    if(order.orderStatus==='Preparing')
    {
        order.orderStatus='Shipped';
    }
    else if(order.orderStatus==='Shipped')
    {
        order.orderStatus = 'Delivered';
        order.deliveredAt = new Date(Date.now());
    }
    else if(order.orderStatus==='Delivered')
    {
        return next(new ErrorHandler('Food already Deliverd',400))
    }
    await order.save();
    res.status(200).json({
        success:true,
        message:'status updated successfully'
    })
})

