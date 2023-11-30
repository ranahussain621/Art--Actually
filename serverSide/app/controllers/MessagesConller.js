"use strict"

const Message = require('../model/Message')
const Chat = require('../model/Chat')
const UserModel = require('../model/users')

const catchAsyncFunction = require('../middlewares/catchAsyncFun');

// add item in cart
exports.sendMessage = catchAsyncFunction(async(req, res) => {
    if (!(req.body.reciver_id && req.body.user_id  && req.body.message)) {
        return res.status(401).json({ 'success': false, error: "please send a message" })
    } else {
        // get product details
        const user_cart = await Chat.find({  
            $or : [
                { $and : [ { sender_id : req.body.user_id }, { reciver_id : req.body.reciver_id } ] },
                { $and : [ { sender_id : req.body.reciver_id }, { reciver_id : req.body.user_id } ] }
            ]
            
          });
        if (user_cart.length != 0) {
            const cart = new Message({
                reciver_id: req.body.reciver_id,
                sender_id: req.body.user_id,
                message: req.body.message,
                chat_id:user_cart[0].id,
            });
            await cart.save().then(data => {
                res.json({
                    success: true,
                    message: "message send successfully!"
                })
            }).catch(err => {
                res.status(500).send({
                    'success': false,
                    message: err.message || "Some error occurred while creating user"
                });
            });
        } else {

            const cart = new Chat({
                reciver_id: req.body.reciver_id,
                sender_id: req.body.user_id,
            });
            await cart.save().then(data => {
            }).catch(err => {
                res.status(500).send({
                    'success': false,
                    message: err.message || "Some error occurred while creating user"
                });
            });
            const msg = new Message({
                reciver_id: req.body.reciver_id,
                sender_id: req.body.user_id,
                message: req.body.message,
                chat_id:cart.id,
            });
            await msg.save().then(data => {
                res.json({
                    success: true,
                    message: "message send successfully!"
                })
            }).catch(err => {
                res.status(500).send({
                    'success': false,
                    message: err.message || "Some error occurred while creating user"
                });
            });
        }
    }
})




exports.getChats = catchAsyncFunction(async (req, res) => {
    if (!req.body.user_id) {
        return res.status(401).json({ success: false, error: "please send a user id" });
    } else {
        const chats = await Chat.find({
            $or: [
                { sender_id: req.body.user_id },
                { reciver_id: req.body.user_id }
            ]
        });

        const formattedChats = [];

        for (const chat of chats) {
            var name ;
            if(chat.sender_id==req.body.user_id){
                name = await UserModel.findById(chat.reciver_id);
            }
            else{
                name = await UserModel.findById(chat.sender_id);
            }
            

            formattedChats.push({
                _id: chat._id,
                sender_id: chat.sender_id,
                reciver_id: chat.reciver_id,
                person_name: name ? name.firstName+" "+name.lastName : 'Unknown', 
            });
        }

        res.json({
            success: true,
            data: formattedChats,
            message: "chats fetched successfully!"
        });
    }
});




exports.getChatdetails = catchAsyncFunction(async (req, res) => {
    if (!req.body.chat_id) {
        return res.status(401).json({ success: false, error: "please send a chat id" });
    } else {
       
        const user_cart = await Message.find({chat_id :req.body.chat_id});

        res.json({
            success: true,
            data: user_cart,
            message: "chats fetched successfully!"
        });
    }
});