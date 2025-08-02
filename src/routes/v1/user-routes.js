const express = require('express');

const { UserController } = require('../../controllers');
const { AuthRequestMiddleware } = require('../../middlewares')

const router = express.Router();

router.post ('/singup', AuthRequestMiddleware.validateAuthRequest ,UserController.singup )

router.post ('/singin', AuthRequestMiddleware.validateAuthRequest ,UserController.singin )

router.post('/role',AuthRequestMiddleware.checkAuth, AuthRequestMiddleware.isAdmin ,UserController.addRoleToUser)

module.exports = router;