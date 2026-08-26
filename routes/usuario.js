const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers/UserController')
const {sessionActive} = require('../middlewares/sessionActive')

router.get('/me', 
    sessionActive()
    ,UserController.getAgendamentos)

router.post('/login',UserController.login)


module.exports = router