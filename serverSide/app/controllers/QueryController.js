"use strict"

const pool = require("../DBconnection");
const Query = require('../model/Query')

const catchAsyncFunction = require('../middlewares/catchAsyncFun');

// add roles
exports.addQuery = catchAsyncFunction(async(req, res) => {
    if (!(req.body.name && req.body.email && req.body.query )) {
        return res.status(401).json({ 'success': false, error: "please fill all the inputs" })
    } else {

        const user = new Query({
            name: req.body.name,
            email: req.body.email,
            query: req.body.query,
        });
        await user.save().then(data => {
            res.json({
                success: true,
                message: "Query added successfully!"
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
exports.getQueries = catchAsyncFunction(async(req, res) => {
    try {
        const user = await Query.find();
        res.json({
            success: true,
            data: user,
            message: "Queries fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})
exports.DeleteQuery = catchAsyncFunction(async(req, res) => {
    try {
         await Query.findOneAndDelete({_id:req.body.id});
        res.json({
            success: true,
            message: "Query deleted successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})


exports.queryDetails = catchAsyncFunction(async(req, res) => {
    try {
        const data= await Query.findById(req.body.id);
        res.json({
            success: true,
            data: data,
            message: "Query details fetched successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})