const userModel = require('../models/User')
const { validationResult } = require('express-validator')
const playModel = require('../models/Play')

module.exports = {
    get: {
        async createPlay(req, res, next) {
            res.render('play/create.hbs', {
                isLoggedIn: true,
            })
        },
        async details(req, res, next) {
            const { id } = req.params;

            const play = await playModel.findPlayById(id)
            const isCreator = req.user._id.toString() === play.creator.toString();
            let isLiked = false;

            // TODO: new function?
            play.usersLiked.forEach(userId => {
                if (userId.toString() === req.user._id.toString()) {
                    isLiked = true
                }
            });

            res.render('play/details.hbs', {
                isLoggedIn: true,
                ...play,
                isCreator,
                isLiked
            })
        },
        async likePlay(req, res, next) {
            const { id } = req.params;

            await playModel.findPlayByIdAndUpdateUsersLiked(id, req.user._id)
            await userModel.findUserByIdAndUpdateLikedPlays(req.user._id, id)

            res.redirect(`/play/details/${id}`)
        },
        async deletePlay(req, res, next) {
            const { id } = req.params

            await playModel.deletePlayById(id)

            res.redirect(`/home`)
        },
        async editPlay(req, res, next) {
            const { id } = req.params;
            const play = await playModel.findPlayById(id)

            res.render('play/edit.hbs', {
                isLoggedIn: true,
                ...play
            })

        },
        async sortByLikes(req, res, next) {
            const plays = await playModel.getPlaysSortedByUsersLikedDesc()

            // TODO: make a func
            plays.reduce((acc, curr) => {
                curr.isLoggedIn = req.user !== undefined;
                curr.likes = curr.usersLiked.length;
                acc.push(curr)
                
                return acc
            }, [])
            
            res.render('home/home.hbs', {
                isLoggedIn: req.user !== undefined,
                plays
            })
        },
        async sortByDate(req, res, next) {
            const plays = await playModel.getPlaysSortedByCreatedAtDesc();

            // TODO: make a func
            plays.reduce((acc, curr) => {
                curr.isLoggedIn = req.user !== undefined;
                curr.likes = curr.usersLiked.length;
                acc.push(curr)
                
                return acc
            }, [])
            
            res.render('home/home.hbs', {
                isLoggedIn: req.user !== undefined,
                plays
            })
        }
    },
    post: {
        async editPlay(req, res, next) {
            const id = req.params.id;
            const { title, description, imageUrl, isChecked } = req.body;
            const isPublic = isChecked === 'on'

            await playModel.findPlayByIdAndUpdate(id, {title, description, imageUrl, isPublic});

            res.redirect(`/play/details/${id}`)
        },
        async createPlay(req, res, next) {
            const { title, description, imageUrl, isChecked } = req.body;
            const isPublic = isChecked === 'on'
            const { _id } = req.user
            const createdAt = new Date();

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.render('play/create.hbs', {
                    isLoggedIn: req.user !== undefined,
                    message: errors.array()[0].msg,
                    oldInput: { title, description, imageUrl }
                })
            }

            await playModel.createPlay({ title, description, imageUrl, createdAt, isPublic, creator: _id })

            res.redirect('/home/')
        }
    }
}