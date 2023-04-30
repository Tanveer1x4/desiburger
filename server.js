const express = require('express');


// const userRoute = require('./routes/user')
// const orderRoute = require('./routes/order')
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const passport  = require('passport');
// const passportGoogleAuth =require('./config/passport-strategy'); 
const dotenv = require('dotenv');
const db = require('./config/mongoose');
// const errorMiddleware = require('./middleware/errorMiddleware');

// const { urlencoded } = require('express');
const app = express();



dotenv.config();



// app.use(express.json());
// app.use(urlencoded({extended:true,}))
// app.use(express.urlencoded());
// app.use(cookieParser());
// app.use(session({
//     secret:process.env.SECRET,
//     saveUninitialized:false,
//     resave:false,
//     cookie:{
//      secure:false
//     }
// }));
// app.use(passport.authenticate('session'));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/api/v1',userRoute);
// app.use('/api/v1',orderRoute);
app.get('/',(req,res)=>{
    res.send('working');
})

// app.use(errorMiddleware)
app.listen(process.env.PORT,(err)=>{
    if(err){console.log(`Error in running the server ${err}`)}
    console.log(`server is running on ${process.env.PORT}`);
})
