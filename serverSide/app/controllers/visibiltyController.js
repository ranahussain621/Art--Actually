"use strict"
const catchAsyncFunction = require('../middlewares/catchAsyncFun');
const Visibility = require('../model/SoundVisibility')


exports.visibilitySound = catchAsyncFunction(async(req,res)=>{
    try {
        const visibilitySound = await Visibility.create({
            user_id:req.body.user_id,
            sound_id:req.body.sound_id,
            visibility:req.body.visibility,
            donation:req.body.donation
        });    
        res.json({
            success: true,
            message: "Visibility added successfully",
            data: visibilitySound
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

