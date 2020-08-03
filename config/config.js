const env = process.env.NODE_ENV || 'development'

const config = {
    development: {
        port: process.env.PORT || 9999,
        dbUrl: 'mongodb+srv://TestSoftUni:testsoftuni123@testsoftuni-wj5mq.mongodb.net/TheaterPlays?retryWrites=true&w=majority',
        cookie: 'x-auth-token',
        secret: 'shhhhaNO'
    },
    production: {}
}

module.exports = config[env]