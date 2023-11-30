'use strict'

const catchAsyncFunction = require('../middlewares/catchAsyncFun');
const ThankYou = require('../model/ThankYou')

// add thankyou note
exports.addNote = catchAsyncFunction(async (req, res) => {
    try {
      const { title, owner_id, description } = req.body;
  
      const note = await ThankYou.create({
        title: title,
        owner_id: owner_id,
        description: description
      });
  
      res.json({
        success: true,
        message: "added successfully",
        'data': note
      });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  })


// get user note
exports.getUserNote = catchAsyncFunction(async (req, res) => {
    try {
      const { id } = req.params;
      const note = await ThankYou.find({ owner_id: id })
      res.status(200).json({
        success: true,
        'data': note
      })
  
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  })