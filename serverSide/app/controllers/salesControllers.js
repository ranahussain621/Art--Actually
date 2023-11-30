"use strict"

const pool = require("../DBconnection");
const Role = require('../model/role')
const Cart = require('../model/Cart')
const Art = require('../model/Art')
const Sales = require('../model/Sales')

const catchAsyncFunction = require('../middlewares/catchAsyncFun');

// add roles
exports.addSale = catchAsyncFunction(async(req, res) => {
    if (!(req.body.user_id)) {
        return res.status(401).json({ 'success': false, error: "please fill all the fields" })
    } else {
        const user = await Cart.find({ user_id: req.body.user_id });

        const cart = new Sales({
            art_id: req.body.art_id,
            price: req.body.amount + " CAD",
            user_id: req.body.user_id,
            charge_id: req.body.charge_id,
            client_name: req.body.client_name,
            country_name: req.body.country_name,
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            district: req.body.district,
            area: req.body.area,
        });
        await cart.save().then(data => {
            user.forEach(element => {
                Cart.findByIdAndRemove(element._id).then(data => {
                    if (!data) {
                        res.status(404).send({

                            message: `item not found.`
                        });
                    }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
            });

            res.json({
                success: true,
                message: "Order placed successfully!"
            });

        }).catch(err => {
            res.status(500).send({
                'success': false,
                message: err.message || "Some error occurred while creating user"
            });
        });


    }
})

// get  user orders
exports.getUserOrders = catchAsyncFunction(async(req, res) => {
    try {
        const user = await Sales.find({ user_id: req.body.user_id });
        res.json({
            success: true,
            data: user,
            message: "orders fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})

// get  all orders
exports.getOrders = catchAsyncFunction(async(req, res) => {
    try {
        const user = await Sales.find();
        res.json({
            success: true,
            data: user,
            message: "orders fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})