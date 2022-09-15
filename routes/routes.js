const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');
const authController = require('../controller/authController');

route.post('/api/career', controller.DataCareer);
route.post('/api/create-user', authController.create);
route.post('/api/login', authController.login);

module.exports = route;