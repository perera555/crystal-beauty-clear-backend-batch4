import Order from "../model/order.js";
import Product from "../model/product.js";

export async function createOrder(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "unauthorized"
        })
        return;
    }
    const body = req.body;
    const orderData = {
        orderId: "",
        email: req.user.email,
        name: body.name,
        address: body.address,
        phoneNumber: body.phoneNumber,
        billItems: [],
        total: 0
    }

    const lastBills = Order.find().sort({

        date: -1
    }).limit(1).then(async (lastBills) => {

        if (lastBills.length == 0) {
            orderData.orderId = "ORD0001";
        } else {

            const lastBill = lastBills[0];

            const lastOrderId = lastBill.orderId; // its comes String("ORD0061")
            const lastOrderNumber = lastOrderId.replace("ORD", "");//"0061"
            const lastOrderNumberInt = parent(lastOrderNumber);//61
            const newOrderNumberInt = lastOrderNumberInt + 1; //62
            const newOrderNumberStr = newOrderNumberInt.toString().padStart(4, '0')//0062
            orderData.orderId = "ORD" + newOrderNumberStr;
        }

        for(let i =0; i<body.billItems.length; i++){
            const billItems =body.billItems[i];

            const product = await Product.findOne({productId : body.billItems[i].productId}); 

            if(product == null){
                res.status(404).json({
                    message : "Product with product id" + body.billItems[i].productId + " not found"
                })
                return;
            }
            //if not null

            orderData.billItems[i]={
                productId: product.productId,
                productName: product.name,
                image : product.images[0],
                price: product.price,
                quantity: body.billItems[i].quantity,   

            }
            orderData.total=orderData.total + product.price * body.billItems[i].quantity
        
        }

        const order = new Order(orderData);


        order.save().then(() => {
            res.json({
                message: "order Saved Succefully",
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "order not saved"
            })
        })

    })


}
export function getOrders(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
        return;
    }
    if(req.user.role == "admin"){
        Order.find().then(
            (orders)=>{
                res.json(orders)
            }
        ).catch((err)=>{
            res.status(500).json({
                message :"orders not found"
            })
        })

    }else{
        Order.find({
            email : req.user.email
        }).then((orders)=>{
            res.json(orders)
        }
    ).catch((err)=>{
        res.status(500).json({
            message:"order not found"
        })
    })
    }
        
    }