import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
email :{
    type :String,
    required : true,
    unique : true
},
firstName:{
    type :String,
    required : true
},
lastName:{
    type :String,
    required : true
},
phone:{
    type :String,
    required : true,
    default:"not given"
},
role:{
    type :String,
    required : true,
    default: "user",
},
password:{
    type :String,
    required : true,
},
isDissabled:{
    type :Boolean,
    default: false
},
isEmailVerified:{
    type :Boolean,
    default: false
},


})
  const User = mongoose.model("users", userSchema);
    export default User; 