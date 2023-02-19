const express = require("express")
const { userModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()

//..........Registation.............
userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, async function (err, hash) {
            if (err) {
                res.send({ "msg": "something went wrong", "error": err.message })
            } else {
                const user = new userModel({ name, email, pass: hash })
                await user.save()
                res.send({ "msg": "New user has been registered" })
            }

        });

    } catch (error) {
        res.send({ "msg": "something went wrong", "error": error.message })
    }

})

//...........Login................
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, function (err, result) {
                if (result) {
                    var token = jwt.sign({ userID:user[0]._id }, 'masai',{expiresIn: '1h'});
                    res.send({ "msg": "Login successful", "token": token })
                } else {
                    res.send("wrong credentials")
                }
            });

        } else {
            res.send("wrong credentials")
        }
    } catch (error) {
        res.send({ "msg": "something went wrong", "error": error.message })
    }

})

module.exports = { userRouter }