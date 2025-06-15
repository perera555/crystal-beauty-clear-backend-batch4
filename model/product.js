import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
     productId:{
        type: String,
        required: true,
        unique: true
     },
        name: {
            type: String,
            required: true
        },
        altName:{
            type: [String],
            defult:[]
        },
        price:{
            type: Number,
            required: true
        },
        labledPrice:{
            type: Number,
            required: true

        },
        description:{
            type: String,
            required: true
        },
        images:{

            type: [String],
            required: true,
            default:[]
        },
        stock:{
            type: Number,
            required: true,
            
        }


})
const Product = mongoose.model("Product", productSchema);
export default Product;