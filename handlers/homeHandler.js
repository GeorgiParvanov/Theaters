const playModel = require("../models/Play")

module.exports = {
    get: {
        async home(req, res, next) {
            const isLoggedIn = req.user !== undefined
            let plays = null

            if (isLoggedIn) {
                plays = await playModel.getPublicPlaysByCreatedAtDesc()
            } else {
                plays = await playModel.getPublicPlaysByUsersEnrolledDesc()
            }

            // TODO: make a func
            plays.reduce((acc, curr) => {
                curr.isLoggedIn = isLoggedIn
                curr.likes = curr.usersLiked.length
                acc.push(curr)
                
                return acc
            }, [])
            
            res.render('home/home.hbs', {
                isLoggedIn,
                plays
            })
        }
    },
    post: {}
}