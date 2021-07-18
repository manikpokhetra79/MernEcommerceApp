const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');
// route for homepage
router.get('/',homeController.home);

module.exports = router;