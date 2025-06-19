
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';
import veriifyJWT from './middleware/auth.js';
import orderRouter from './routes/orderRouter.js';
import dotenv from 'dotenv';
dotenv.config()



const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB successfully");
}

).catch(() => {
    console.log("Failed to connect to MongoDB");
})

app.use(bodyParser.json());
app.use(veriifyJWT)



app.use("/api/user", userRouter);
app.use("/api/login", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);




app.listen(5000, () => {
    console.log("Server is running on port 5000");
})