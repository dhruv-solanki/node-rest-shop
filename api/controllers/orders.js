const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
    Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    product: doc.product,
                    quantity: doc.quantity,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/orders/" + doc._id,
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};

exports.orders_create_order = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId)
    .then(product => {
        if(!product) {
            return res.status(404).json({
                message: "Product Not Found!"
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity || 1,
            product: productId,
        }); 
        return order.save();
    })
    .then(result => {
        res.status(201).json({
            message: "Order Created Successfully!",
            createdOrder: {
                product: result.product,
                quantity: result.quantity,
                _id: result._id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.orders_get_order = (req, res, next) => {
    const id = req. params.orderId;

    Order.findById(id)
    .select("product quantity _id")
    .populate("product", "name price")
    .exec()
    .then(order => {
        if(order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({
                message: "No valid Order found in DB"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};

exports.orders_delete_order = (req, res, next) => {
    const id = req. params.orderId;

    Order.deleteOne({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Order Deleted!",
            request: {
                type: "POST",
                url: "http://localhost:3000/orders/",
                body: { product: "productId", quantity: "Number" }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};