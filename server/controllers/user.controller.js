const User = require("../models/user.model");
const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    registerUser: async (req, res) => {
        try {
        const potentialUser = await User.findOne({ email: req.body.email });
        if (potentialUser) {
            res.status(400).json({ message: "User already exists" });
        } else {
            const newUser = await User.create(req.body);
            const userToken = jwt.sign({_id: newUser._id, email: newUser.email}, secret, {expiresIn: "2h"});
            console.log("userToken: ",userToken)
            res.status(201).cookie("userToken",userToken, {httpOnly: true, maxAge: 2*60*60*1000}).json(newUser);
        }
        } catch (err) {
        res.status(500).json({ error: err });
        }
    },

    loginUser: async (req, res) => {
        try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                const userToken = jwt.sign({_id: user._id, email: user.email}, secret, {expiresIn: "4h"});
                console.log("userToken: ",userToken)
                res.status(200).cookie("userToken",userToken, {httpOnly: true, maxAge: 4*60*60*1000}).json(user);
            } else {
                res.status(400).json({ message: "Invalid Email/Password" });
            }
        } else {
            res.status(400).json({ message: "Invalid Email/Password" });
        }
        } catch (err) {
        res.status(500).json({ error: err });
        }
    },

    logoutUser: async (req, res) => {
        try {
            res.clearCookie("userToken");
            res.status(200).json({message: "Logout successful"});
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

};
