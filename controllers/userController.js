
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config()


export function saveUser(req, res) {

    if (req.body.role == "admin") {
        if (req.user == null) {
            res.status(403).json({
                message: "please login as admin before creating admin account"
            })
            return;
        }
        if (req.user.role != "admin") {
            res.status(403).json({
                message: "you are not authorized to create an admin account"
            })
            return;
        }
    }

    const hashpassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        password: hashpassword,

    })
    user.save().then(() => {
        res.status(201).json({
            message: "User created successfully",
        })
    }).catch(() => {
        res.status(500).json({
            message: "user not saved",

        });
    })
}
export function loginUser(req, res) {
    // need user email and password
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email: email,

    }).then((user) => {
        if (user == null) {
            res.status(401).json({
                message: "invalid email",
            })
        } else {
            const ispasswordcorrect = bcrypt.compareSync(password, user.password);
            if (ispasswordcorrect) {

                const userData = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    role: user.role,
                    isDissabled: user.isDissabled,
                    isEmailVerified: user.isEmailVerified,
                }
                const token = jwt.sign(userData, process.env.JWT_KEY);

                res.status(200).json({
                    message: "Login successful",

                    token: token,
                    user: userData,


                })

            } else {
                res.status(500).json({
                    message: "Invalid password",

                })
            }
        }
    })

}

export async function googleLogin(req, res) {
    const accessToken = req.body.accessToken;
    try {
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: "Bearer " + accessToken }
        });

        const user = await User.findOne({ email: response.data.email });

        if (!user) {
            const newUser = new User({
                email: response.data.email,
                firstName: response.data.given_name,
                lastName: response.data.family_name,
                role: "user",
                isEmailVerified: true,
                password: "" 
            });
            await newUser.save();

            const userData = {
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
                phone: "not given",
                isEmailVerified: true,
                isDisabled: false
            };

            const token = jwt.sign(userData, process.env.JWT_KEY, {
                expiresIn: "48h"
            });

            return res.status(200).json({
                message: "Login successful",
                token,
                user: userData
            });
        } else {
            const userData = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                isDisabled: user.isDisabled,
                isEmailVerified: user.isEmailVerified
            };

            const token = jwt.sign(userData, process.env.JWT_KEY, {
                expiresIn: "48h"
            });
            

            return res.status(200).json({
                message: "Login successful",
                token,
                user: userData
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Google login failed" });
    }
}

export function getCurrentUser(req,res){
    if(req.user == null){
        res.status(403).json({
            message:"please login to get user details",

        })
        return;
    }
    res.json({
        user:req.user
    })

}


