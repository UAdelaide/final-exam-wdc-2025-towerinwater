function requireLogin(req, res, next){
    if(req.session && req.session.user){
        return next();
    }
    else{
        return res.redirect('/index.html');
    }
}

function requireRole(role){
    return (req, res, next) => {
        
    };
}

module.exports = requireLogin;
