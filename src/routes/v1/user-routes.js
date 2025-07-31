const express = require('express');

const { UserController } = require('../../controllers');

const router = express.Router();

router.post ('/singup', UserController.singup )

router.post ('/singin', UserController.singin )

module.exports = router;