const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(user) {
            return res.status(409).json({
                message: "Email address already used!",
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User Created!"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
};

exports.user_login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id,
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h",
                        }
                    )
                    return res.status(200).json({
                        message: "Authentication Successful!",
                        token: token,
                    });
                } else {
                    return res.status(401).json({
                        message: "Authentication Failed!"
                    });
                }
            });
        } else {
            return res.status(401).json({
                message: "Authentication Failed!"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

exports.users_delete_user = (req, res, next) => {
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User Deleted!"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};