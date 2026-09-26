function authorize(...roles){
    return (req,res,next) =>{
        if(!req.session.user) return res.redirect('/');
        console.log('verificando acesso...')
        if(!roles.includes(req.session.user.acesso)) return res.send('Acesso negado!');
        console.log("Acesso concedido")
        next();
    }
}

module.exports = {authorize}