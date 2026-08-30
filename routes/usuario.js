const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers/UserController')
const {sessionActive} = require('../middlewares/sessionActive')
const {defineSession} = require('../middlewares/sessionDefiner')

// router.get('/me',UserController.getAgendamentos)

router.get('/acesso-especial',(req,res)=>{
    res.render('login');
})

router.post('/login',UserController.login)


module.exports = router