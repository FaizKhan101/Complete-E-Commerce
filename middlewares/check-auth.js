function checkAuth(req, res, next) {
    const uid = req.session.uid;

    if (!uid) {
        next()
        return
    }

    res.locals.uid = uid;
    res.locals.isAuth = true
    next()
}

module.exports = checkAuth