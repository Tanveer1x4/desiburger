const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');
const isAdmin = require('../middleware/authenticated');
const isAuthenticated = require('../middleware/authenticated');

router.post('/createorderonline',isAuthenticated,orderController.onlineOrder)
router.post('/paymentverification',isAuthenticated,orderController.paymentVerification)
router.post('/createorder',isAuthenticated,orderController.placeOrder);
router.get('/myorders',isAuthenticated,orderController.getMyOrders)
router.get('/order/:id',orderController.getOrderDetails)
router.get('/admin/orders',isAdmin,isAuthenticated,orderController.getAdminOrder);
router.get('/admin/order/:id',isAdmin,isAuthenticated,orderController.processOrder);
module.exports=router;