const routers = require('../routes/routes')

module.exports = (app) => {
    app.use('/', routers.home)
    app.use('/home', routers.home)

    app.use('/user', routers.user)

    app.use('/play', routers.play)

    app.use('*', routers.error);
}