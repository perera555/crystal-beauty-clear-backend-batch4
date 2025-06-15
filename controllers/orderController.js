import Order from "../model/order.js";

export function createOrder(req, res) {
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
    }).limit(1).then((lastBills) => {

        if(lastBills.length == 0){
            orderData.orderId = "ORD0001";
}else {

    const lastBill = lastBills[0];

    const lastOrderId = lastBill.orderId; // its comes String("ORD0061")
    const lastOrderNumber = lastOrderId.replace("ORD", "");//"0061"
    const lastOrderNumberInt = parent(lastOrderNumber);//61
    const newOrderNumberInt = lastOrderNumberInt + 1; //62
    const newOrderNumberStr = newOrderNumberInt.toString().padStart(4, '0')//0062
    orderData.orderId = "ORD" + newOrderNumberStr;
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