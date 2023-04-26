const dotenv = require('dotenv');
dotenv.config()
const Razorpay = require('razorpay');
const instance =new Razorpay({
    key_id:process.env.RAZOR_PAY_API_KEY,
    key_secret:process.env.RAZOR_PAY_API_SECRET,
});
module.exports = instance;