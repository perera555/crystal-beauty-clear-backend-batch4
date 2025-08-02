import Product from "../model/product.js";

export function createProduct(req, res) {
    if (req.user.role == "admin")
        if (req.user == null) {
            res.status(401).json({
                message: "you need to login first"
            });
            return;
        }
    if (req.user.role != "admin") {
        res.status(403).json({
            message: "you are not allowed to create product"
        });
        return;
    }
    const product = new Product(req.body);
    product.save().then(() => {
        res.json({
            message: "Product created successfully",

        })

    }
    ).catch((err) => {
        res.status(500).json({
            message: "Product not saved",
            error: err.message
        });
    });
}



export function getProducts(req, res) {

    Product.find().then((products) => {
        res.json(products)


    }
    ).catch((err) => {
        res.statue(500).json({
            message: "product not found"
        })
    })
}

export function deleteProduct(req, res) {

    if (req.user == null) {
        res.status(403).json({
            message: "you need to login first"
        })
        return;
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "you are not allowed to delete product"
        });
        return;

    }
    Product.findOneAndDelete({
        productId: req.params.productId
    }).then(() => {
        res.json({
            message: "product delete succesfully"
        })
    }
    ).catch((err) => {

        res.status(500).json({
            message: "product not deleted"
        })
    })
}

export function updateProduct(req, res) {

    if (req.user == null) {
        res.status(403).json({
            message: "you need to login first"
        })
        return;
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "you are not allowed to update product"
        });
        return;

    }
    Product.findOneAndUpdate({
        productId: req.params.productId
    }, req.body).then(() => {
        res.json({
            message: "product update succesfully"
        })
    }
    ).catch((err) => {

        res.status(500).json({
            message: "product not update"
        })
    })
}

export async function getProductById(req, res) {
    const productId = req.params.id;
    const product = await Product.findOne({ productId: productId })
    if (product == null) {
        res.status(404).json({
            message: "Product not found"
        });
        return
    }
    res.json({
        product: product
    })

}