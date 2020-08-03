const home = require('./homeRoute')
const user = require('./userRoute')
const play = require('./playRoute')
const error = require('./errorRoute')

module.exports = {
    home,
    user,
    play,
    error
}