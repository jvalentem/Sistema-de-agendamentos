function authorize(...roles){
    return (req,res,next) =>{
        if(!req.session.user) return res.redirect('/');

        if(!roles.includes(req.session.user.acesso)) return res.send('Acesso negado!');

        next();
    }
}

module.exports = {authorize}