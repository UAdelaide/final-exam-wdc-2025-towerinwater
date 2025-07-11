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
            if(req.session.user.role === 'walker'){
                res.status(404);
                res.redirect('/walker-dashboard.html');
            }
            else if(req.session.user.role === 'owner'){
                res.status(404);
                res.redirect('/owner-dashboard.html');
            }
        }
    };
}

module.exports = { requireLogin, requireRole };
