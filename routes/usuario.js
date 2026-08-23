const express = require('express');
const router = express.Router();
const {UserService} = require('../services/UserService');


router.get('/me',(req,res)=>{
    if(!req.session.user) return res.redirect('/');
    const userAgendamentos = UserService.getUserAgendamentos(req.session.user.id);
    res.render('me',{userAgendamentos})
})

router.post('/login',(req,res)=>{
    const nome = req.body.nome;
    const senha = req.body.senha
    
    const user = UserService.validateUser(nome,senha);

    if(!user) return res.status(401).json({error_message:'Usuario ou senha incorretos'})
    req.session.user = user;
    
    return res.json({'redirectTo': '/'})
})


module.exports = router