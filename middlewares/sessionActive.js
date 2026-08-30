function sessionActive(){
    return (req,res,next) =>{
        if(!req.session.user) return res.render('login');
        next();
    }
}


module.exports = {sessionActive}