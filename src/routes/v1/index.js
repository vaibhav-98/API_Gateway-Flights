const express = require('express');

const { InfoController } = require('../../controllers');
const userRouter = require('./user-routes')

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/singup', userRouter)

module.exports = router;