
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import dotenv from'dotenv';
dotenv.config()


export function saveUser(req, res) {

    if(req.body.role =="admin"){
        if(req.user==null){
            res.status(403).json({
                message:"please login as admin before creating admin account"
            })
            return;
        }
        if(req.user.role !="admin"){
            res.status(403).json({
                message:"you are not authorized to create an admin account"
            })
            return;
        }
    }
    
const hashpassword = bcrypt.hashSync(req.body.password, 10);
    
const user =new User({
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
        email : email,

    }).then((user) => {
        if(user ==null){
            res.status(401).json({
                message: "invalid email",
            })
        }else{
            const ispasswordcorrect = bcrypt.compareSync(password, user.password);
            if(ispasswordcorrect){
                
                const userData = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    role: user.role,
                    isDissabled: user.isDissabled,
                    isEmailVerified: user.isEmailVerified,
                }
                const token =jwt.sign(userData,process.env.JWT_KEY);

                res.status(200).json({
                    message: "Login successful",
                    
                    token: token,
                    user: userData,
                    
                   
                })

            } else{
                res.status(500).json({
                    message: "Invalid password",
                    
                })
            }
        }
    })

}
   