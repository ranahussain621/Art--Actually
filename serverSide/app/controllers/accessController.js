"use strict"

const pool = require("../DBconnection");
const Role = require('../model/role')
const userRole = require('../model/userRole')
const UserModel = require('../model/users')

const catchAsyncFunction = require('../middlewares/catchAsyncFun');

// add roles
exports.addRole = catchAsyncFunction(async(req, res) => {
    if (!(req.body.title)) {
        return res.status(401).json({ 'success': false, error: "please fill all the credentials" })
    } else {
        // create new role
        const user = new Role({
            title: req.body.title,
        });
        await user.save().then(data => {
            res.json({
                success: true,
                message: "role added successfully!"
            })
        }).catch(err => {
            res.status(500).send({
                'success': false,
                message: err.message || "Some error occurred while creating user"
            });
        });


    }
})



// get roles
exports.getRoles = catchAsyncFunction(async(req, res) => {
    try {
        const user = await Role.find();
        res.json({
            success: true,
            data: user,
            message: "roles  fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})





// assign user role
exports.assignUserRole = catchAsyncFunction(async(req, res) => {
    console.log(req.body.role_id);
    const forget_token = new userRole({
        user_id: req.body.user_id,
        role_id: req.body.role_id
    });

    await forget_token.save().then(data => {
        res.status(200).send({
            'success': true,
            message: "role assign to user successfully!"
        });
    }).catch(err => {
        res.status(500).send({
            'success': false,
            message: err.message || "Some error occurred while creating user"
        });
    });

})

// 
exports.getUserRole = catchAsyncFunction(async(req, res) => {
    try {
        const user = await userRole.find({ user_id: req.body.user_id });
        const role = await Role.findById(user[0].role_id);
        res.json({
            'success': true,
            message: 'user details fetched successfully!',
            role: role
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})




// block user
exports.blockUser = catchAsyncFunction(async(req, res) => {
    const result = await UserModel.findByIdAndUpdate(req.body.id, { 'status': 0 });



    res.json({
        success: true,
        message: "User blocked",
    });

})

// unblock user
exports.unblockUser = catchAsyncFunction(async(req, res) => {
    const result = await UserModel.findByIdAndUpdate(req.body.id, { 'status': 1 });



    res.json({
        success: true,
        message: "User unblocked",
    });

})