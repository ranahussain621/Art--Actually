"use strict"

const pool = require("../DBconnection");
const Cart = require('../model/Cart')
const UserModel = require('../model/users')
const Art = require('../model/Art')

const catchAsyncFunction = require('../middlewares/catchAsyncFun');

// add item in cart
exports.addItemCart = catchAsyncFunction(async (req, res) => {
    try {
        // Check if all required credentials are provided
        if (!(req.body.user_id && (req.body.art_id || req.body.music_id))) {
            return res.status(401).json({ success: false, error: "please fill all the credentials" });
        }

        // Check if the product already exists in the cart
        const userCart = await Cart.findOne({
            user_id: req.body.user_id,
            $or: [
                { art_id: req.body.art_id },
                { music_id: req.body.music_id }
            ]
        });

        if (userCart) {
            return res.json({
                success: false,
                message: "Product already exists in the cart"
            });
        }
        const cartData = {
            user_id: req.body.user_id,
        };

        if (req.body.art_id) {
            cartData.art_id = req.body.art_id;
        }

        if (req.body.music_id) {
            cartData.music_id = req.body.music_id;
        }

        const cart = new Cart(cartData);

        await cart.save();

        return res.json({
            success: true,
            message: "Item added to the cart successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Some error occurred while adding the item to the cart"
        });
    }
});



// get user cart
exports.getCart = catchAsyncFunction(async(req, res) => {
    try {
        const user = await Cart.find({ user_id: req.body.user_id });
        res.json({
            success: true,
            data: user,
            message: "items fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})

//delete item from cart
exports.delteItemFromCart = catchAsyncFunction(async(req, res) => {
    await Cart.findByIdAndRemove(req.body.id).then(data => {
        if (!data) {
            res.status(404).send({

                message: `item not found.`
            });
        } else {
            res.send({
                message: "item removed from cart successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

})