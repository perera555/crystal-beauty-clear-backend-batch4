
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';
import veriifyJWT from './middleware/auth.js';
import orderRouter from './routes/orderRouter.js';



const app = express();

mongoose.connect("mongodb+srv://admin:123@cluster0.l8u02bf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
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