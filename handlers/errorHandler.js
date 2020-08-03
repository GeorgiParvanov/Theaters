module.exports = {
    get: {
        notFound(req, res, next) {
            res.render('error/404.hbs', {
                isLoggedIn: req.user !== undefined,
            })
        }
    },
    post: {}
}