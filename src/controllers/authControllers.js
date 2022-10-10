const UserSchema = require('../models/userSchema')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { restart } = require('nodemon')

const SECRET = process.env.SECRET

const login = (req, res) => {

    try {
        UserSchema.findOne({ email: req.body.email }, (error, user) => {
            if (!user) {
                return res.status(401).send({
                    message: "Usuário não encontrado",
                    email: `${req.body.email}`
                })
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password)

            if (!validPassword) {
                return res.status(401).send({
                    message: "Login não autorizado"
                })
            }

            const token = jwt.sign({ name: user.name }, SECRET)
            console.log({ token })

            res.status(200).send({
                message: "Login autorizado",
                token
            })
        })
    } catch (e) {
        console.error(e);
        res.status(401).send({
            message: "Login não autorizado"
        })
    }

}

module.exports = {
    login
}