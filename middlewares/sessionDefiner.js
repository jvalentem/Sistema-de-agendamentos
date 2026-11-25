//Middleware para a definição de sessão em todas as requisiçoes
function defineSession(){
    return (req,res,next)=>{
        res.locals.session = req.session;
        res.locals.user = req.session.user;
        next();
    }
}


module.exports = {defineSession}