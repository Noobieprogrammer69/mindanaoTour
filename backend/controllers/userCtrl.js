const Users = require("../models/userModel")
const bcrypt = require("bcrypt")
const { generateToken } = require("../tokens/genTokens")

const userCtrl = {
    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const user = await Users.findOne({ $or: [{ email }] })
    
            if(user) return res.status(400).json({error: "This Account already Exists"})

            const passHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                name,
                email,
                password: passHash
            })

            await newUser.save()

            if(newUser) {
                generateToken(newUser._id, res)
                res.status(201).json({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                })
            } else {
                res.status(400).json({error: "Invalid user data"})
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            const isMatch = await bcrypt.compare(password, user?.password || "")

            if(!user || !isMatch) return res.status(400).json({error: "Invalid Email or Password"})

            generateToken(user._id, res)

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)
        }
    }
}

module.exports = userCtrl