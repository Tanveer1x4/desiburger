const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controller/user');
const isAdmin = require('../middleware/authenticated');
const isAuthenticated = require('../middleware/authenticated');
console.log('Router connected');
router.get('/googlelogin',
  passport.authenticate('google', { scope: ['profile'] }));

  router.get('/login',
  passport.authenticate('google',{successRedirect:process.env.FRONTEND_URL,}),
  
  );

router.get('/me',isAuthenticated,userController.myProfile)
router.get('/logout',userController.destroySession);
router.get('/admin/user',isAuthenticated,isAdmin,userController.getAdminUser)
router.get('/admin/stats',isAuthenticated,isAdmin,userController.getAdminStats)

module.exports = router;