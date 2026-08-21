const express = require('express');
const router = express.Router();
const {UserService} = require('../services/UserService');

router.post('/login',(req,res)=>{
    const nome = req.body.nome;
    const senha = req.body.senha
    
    const user = UserService.validateUser(nome,senha);

    if(!user) return res.status(401).json({error_message:'Usuario ou senha incorretos'})
    req.session.user = user;
    
    return res.json({'redirectTo': '/'})
})


module.exports = router