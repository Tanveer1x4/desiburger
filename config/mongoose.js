const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
 mongoose.connect(process.env.MONGO_URI)
 const db = mongoose.connection;
 db.on('err',console.error.bind(console,'errorin connecting to db'));
 db.once('open',()=>{
     console.log('Successfully connected to Db');
 })
module.exports = db;
