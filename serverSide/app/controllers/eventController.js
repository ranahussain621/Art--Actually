'use strict'

const catchAsyncFunction = require('../middlewares/catchAsyncFun');
const Event = require('../model/Event')

// add thankyou note
exports.addEvent = catchAsyncFunction(async (req, res) => {
    try {
      const { title, url, description,location } = req.body;
      var time = new Date().getTime();

      const note = await Event.create({
        title: title,
        date: time,
        description: description,
        url:url,
        location:location
      });
  
      res.json({
        success: true,
        message: "Event added successfully",
        'data': note
      });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  })


// // get user note
exports.getEventDetails = catchAsyncFunction(async (req, res) => {
    try {
      const { id } = req.body;
      const note = await Event.find({_id: id })
      res.status(200).json({
        success: true,
        'data': note,
        message: "event details fetched  successfully"

      })
  
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  })


  // // get user note
exports.getEvents = catchAsyncFunction(async (req, res) => {
    try {
      const note = await Event.find()
      res.status(200).json({
        success: true,
        'data': note,
        message: "event fetched successfully"

      })
  
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  })


    // // get user note
exports.deleteEvent = catchAsyncFunction(async (req, res) => {
    try {
      const note = await Event.findOneAndDelete({_id:req.body.id});

      res.status(200).json({
        success: true,
        message: "event deleted successfully"
      })
  
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  })



  exports.updateEvent = catchAsyncFunction(async(req,res)=>{
    try {
       
        var time = new Date().getTime();
        var filter = { _id: req.body.id };
        const updateDoc = {
            $set: {
                title:req.body.title,
                description:req.body.description,
                url:req.body.url,
                location:req.body.location,
                date:time
            },
        };
        const options = { upsert: true };
    
        const result = await Event.updateOne(filter, updateDoc, options);
      
        res.json({
            success: true,
            message: "Event  updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})




exports.updateStatusEvent = catchAsyncFunction(async(req,res)=>{
  try {
     
      var time = new Date().getTime();
      var filter = { _id: req.body.id };
      const updateDoc = {
          $set: {
              status:0
          },
      };
      const options = { upsert: true };
  
      const result = await Event.updateOne(filter, updateDoc, options);
    
      res.json({
          success: true,
          message: "Event status updated successfully",
      });
  } catch (error) {
      console.log(error);
      res.status(400).json(error);
  }
})