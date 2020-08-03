const { body } = require('express-validator')
const { User } = require('../models/User')
const playModel = require('../models/Play')

// TODO: should this file be called like that and should it be in a different folder like 'Middlewares'?

module.exports = {
    register: [
        body('username')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters!')
            .not()
            .matches(/[^A-Za-z0-9]+/)
            .withMessage('Username should contain only letters and digits!')
            .custom(async (username) => {
                const user = await User.findOne({ username })

                if (user) {
                    throw new Error('The given username is already in use!')
                }

                return true
            }),
        body('password')
            .isLength({ min: 3 })
            .withMessage('Password is required and need to be at least 3 characters.'),
        body('repeatPassword', 'Repeat Password does not match Password')
            .custom((repeatPassword, { req }) => repeatPassword === req.body.password)
    ],
    Login: [
        body('username')
            .custom(async (username, { req }) => {
                const { password } = req.body
                const user = await User.findOne({ username })
                let doMatch = null

                if (user) {
                    doMatch = await user.passwordsMatch(password)
                }

                if (!user || !doMatch) {
                    throw new Error('Invalid username or password')
                }

                return true
            })
    ],
    play: [
        body('title')
            .notEmpty()
            .withMessage('Title should not be empty!')
            .custom(async (title) => {
                const existingPlay = await playModel.findByTitle(title)

                if (existingPlay) {
                    throw new Error('Play title must be unique!')
                }

                return true
            }),
        body('description')
            .notEmpty()
            .withMessage('Description should not be empty!'),
        body('imageUrl')
            .notEmpty()
            .withMessage('ImageUrl should not be empty!'),
    ]
}
