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
        if(req.session && req.session.user.role === role){
            return next();
        }
        else{
            res.status(404);
            if(req.session.user.role === 'walker') res.redirect
        }
    };
}

module.exports = { requireLogin, requireRole };
