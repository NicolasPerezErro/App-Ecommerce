export function webAuthUser(req, res, next) {
        if (req.session?.user === undefined || req.session?.user === '') {
            console.log('Error de autorización usuario')
            res.redirect(401, '/login')
            return 401;
        }
        return next();
}

export function webAuthAdmin(req, res, next) {
    if (req.session?.user === 'admin') {
        return next();
    }
    console.log('Error de autorización admin')
    res.json({error: "No es usuario administrador"})
    return 401;
}