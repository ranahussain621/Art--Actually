'use strict'

const catchAsyncFunction = require('../middlewares/catchAsyncFun');
const UserAccountDetail = require('../model/UserAccountDetail')

// add thankyou note
exports.accountDetail = catchAsyncFunction(async (req, res) => {
    try {
      const { bankName, branchNumber, routingNumber, bankAccountNumber, user_id } = req.body;
  
      const note = await UserAccountDetail.create({
        bankName,branchNumber,routingNumber,bankAccountNumber,user_id
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