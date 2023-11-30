"use strict"

const Art = require('../model/Art')
const Sound = require('../model/Sound')
const UserModel = require('../model/users')
const Payment = require('../model/Payment')
const Payout =require('../model/Payout')
const UserAccountDetail = require('../model/UserAccountDetail')
const catchAsyncFunction = require('../middlewares/catchAsyncFun');

// add item in cart
exports.addPayment = catchAsyncFunction(async(req, res) => {
    if (!(req.body.sender_id && req.body.art_id  && req.body.amount)) {
        return res.status(401).json({ 'success': false, error: "please fill form carefully" })
    } else {
        var art;
        const art_check = await Art.findById(req.body.art_id);
            if(art_check==null){
                const sound_check = await Sound.findById(req.body.art_id);  
                art= sound_check
            }
            else{
                art= art_check
            }
            let today = new Date().toLocaleDateString()
            var artist_amount =req.body.amount/100*90;
            var art_actualy_amount =req.body.amount-artist_amount;
            const payment = new Payment({
                sender_id: req.body.sender_id,
                reciever_id: art.owner_id,
                art_id: req.body.art_id,
                amount:req.body.amount,
                artist_amount:artist_amount,
                art_actualy_amount:art_actualy_amount,
                date:today
            });
            await payment.save().then(data => {
                res.json({
                    success: true,
                    data :payment,
                    message: "payment send successfully!"
                })
            }).catch(err => {
                res.status(500).send({
                    'success': false,
                    message: err.message || "Some error occurred while creating user"
                });
            });
          
    }
})



exports.getAllPayment = catchAsyncFunction(async(req, res) => {
    var payments;
    if(!(req.body.artist_id)){
       payments = await Payment.find();
    } 
    else if(req.body.artist_id && req.body.role ){
        payments = await Payment.find({reciever_id :req.body.artist_id});
    }
    else{
        payments = await Payment.find({reciever_id :req.body.artist_id});

    }
    const formattedPayments = [];

    for (const payment of payments) {
        
        var  sender_name = await UserModel.findById(payment.sender_id);
        var reciver_name = await UserModel.findById(payment.reciever_id);
        var art_name;
        var art_name_from_art = await Art.findById(payment.art_id);
        if(art_name_from_art==null){
            var art_name_from_sound = await Sound.findById(payment.art_id);
            art_name=art_name_from_sound
        }
        else{
            art_name=art_name_from_art
        }
        formattedPayments.push({
            _id: payment._id,
            sender_id: payment.sender_id,
            reciver_id: payment.reciever_id,
            sender_name: sender_name.firstName+" "+sender_name.lastName,
            sender_image: sender_name.image,
            reciver_name: reciver_name.firstName+" "+reciver_name.lastName,
            reciver_image: reciver_name.image,
            art_id: payment.art_id,
            art_file: art_name.image,
            art_name:art_name.title,
            amount: payment.amount,
            art_actualy_amount: payment.art_actualy_amount,
            artist_amount: payment.artist_amount,
            status: payment.status,
            date: payment.date,
        });
    }

    const artists_data = [];
    const artists=await Payment.find();

    for (const artist of artists) {
        const art=await UserModel.findById(artist.reciever_id);

       
        artists_data.push({
            _id:art._id,
            name: art.firstName+" "+art.lastName,
        });
    }
    let total_value = 0;
    let total_pending = 0;
    let total_paid = 0;
    let art_actualy_balnace = 0;
    var payments_cal;
    if(req.body.artist_id && req.body.role=="artist" ){
        payments_cal = await Payment.find({reciever_id :req.body.artist_id});
         // iterate over each item in the array
    for (let i = 0; i < payments_cal.length; i++ ) {
        if(payments_cal[i].status=="Payout Requested"){
            total_pending +=  Number(payments_cal[i].artist_amount);
        }
        else if(payments_cal[i].status=="Payout sended"){
           
                total_paid +=  Number(payments_cal[i].artist_amount);
          

        }
        total_value +=  Number(payments_cal[i].artist_amount);
        
    }
    }
    else{
        payments_cal = await Payment.find();
 // iterate over each item in the array
 for (let i = 0; i < payments_cal.length; i++ ) {
    if(payments_cal[i].status=="Payout Requested"){
        total_pending +=  Number(payments_cal[i].amount);
    }
    else if(payments_cal[i].status=="Payout sended"){
       
            total_paid +=  Number(payments_cal[i].amount);
      

    }
    total_value +=  Number(payments_cal[i].amount);
    art_actualy_balnace +=  Number(payments_cal[i].art_actualy_amount);
    
}
    }
    var balance=0;
   if(req.body.artist_id && req.body.role=="artist"){
   
    balance=total_value-total_paid-total_pending

   }
   else{
    balance=art_actualy_balnace
   }
    
    res.json({
        success: true,
        data:{
        payments: formattedPayments,
        Artists: artists_data,
        values:{
            total:total_value, 
            pending:total_pending, 
            balance:balance
        },
        },
        message: "payments fetched successfully!"
    });         
    
})



exports.getPaymentDetails = catchAsyncFunction(async(req, res) => {
   
    const payment = await Payment.findById(req.body.id);
   
   
    const formattedPayments = [];

        
        var  sender_name = await UserModel.findById(payment.sender_id);
        var reciver_name = await UserModel.findById(payment.reciever_id);
        var art_name = await Art.findById(payment.art_id);

        formattedPayments.push({
            _id: payment._id,
            sender_id: payment.sender_id,
            reciver_id: payment.reciever_id,
            sender_name: sender_name.firstName+" "+sender_name.lastName,
            sender_image: sender_name.image,
            reciver_name: reciver_name.firstName+" "+reciver_name.lastName,
            reciver_image: reciver_name.image,
            art_id: payment.art_id,
            art_file: art_name.image,
            art_name:art_name.title,
            amount: payment.amount,
            status: payment.status,
            date: payment.date,
        });
    

    res.json({
        success: true,
        data: formattedPayments,
        message: "payment details fetched successfully!"
    });         
    
})




exports.requestPayout = catchAsyncFunction(async(req, res) => {
   
    const payments =await Payment.find({reciever_id :req.body.user_id});

    let sum = 0;

    // iterate over each item in the array
    for (let i = 0; i < payments.length; i++ ) {
        if(payments[i].status=="Pending"){
      sum +=  Number(payments[i].artist_amount);
    }
    }
    
             if(sum>=req.body.payment){
                var filter = { 
                    $and: [
                        { reciever_id: req.body.user_id } ,
                        { status: { $regex: "Pending" } },
                      ],
                     };
                const updateDoc = {
                    $set: {
                        status: "Payout Requested"
                    },
                };
                const options = { upsert: true };

                const result = await Payment.updateMany(filter, updateDoc, options);
               try {
                let today = new Date().toLocaleDateString()
                const createdMedia = await Payout.create({
                    reciever_id: req.body.user_id,
                    amount:sum,
                    status: "Pending",
                    date: today,
                });
    
                res.json({
                    success: true,
                    data: createdMedia,
                    message: "payment request added successfully!"
                });  
            } catch (error) {
                console.log(error);
                res.status(400).json(error);
            }  
            }
            else{
                res.json({
                    success: false,
                    message: "Requested payment is more than your account payment!"
                }); 
            }
           
    
})





exports.sendPayout = catchAsyncFunction(async(req, res) => {
    if (!(req.body.user_id && req.files.file)) {
        return res.status(401).json({ 'success': false, error: "please fill all the fields" })
    } else {
    const payments =await Payment.find({reciever_id :req.body.user_id});

    let sum = 0;

    // iterate over each item in the array
    for (let i = 0; i < payments.length; i++ ) {
        if(payments[i].status=="Payout Requested"){
      sum +=  Number(payments[i].amount);
    }
    }
    
                var filter = { reciever_id: req.body.user_id };
                const updateDoc = {
                    $set: {
                        status: "Payout sended"
                    },
                };
                const options = { upsert: true };

                const result = await Payment.updateMany(filter, updateDoc, options);
                let today = new Date().toLocaleDateString()

                let videosPaths = [];

                if (Array.isArray(req.files.file) && req.files.file.length > 0) {
                    for (let video of req.files.file) {
                        videosPaths.push("/" + video.path);
                    }
                }
                const id = req.body.request_id;

                req.body.receipt = req.files.file[0].filename;
                req.body.status = "Paid";
                req.body.date = today;
                await Payout.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
                    if (!data) {
                        res.status(404).send({
                            message: `payment request  not found.`
                        });
                    } else {
                        res.json({
                            success: true,
                            data: sum,
                            message: "payment sended successfully!"
                        }); 
                    }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
                     
               

             
           
        }
})



exports.allPayout = catchAsyncFunction(async(req, res) => {
   
    const payments =await Payout.find();
    console.log(payments,'123');
    const formattedPayments = [];

    for (const payment of payments) {
        
        var reciver_name = await UserModel.findById(payment.reciever_id);
        const accountDetail = await UserAccountDetail.findOne({ user_id: payment.reciever_id });
        // console.log(AccountDetail,'data');

        formattedPayments.push({
            _id: payment._id,
            sender_id: payment.sender_id,
            reciver_id: payment.reciever_id,
            reciver_name: reciver_name.firstName+" "+reciver_name.lastName,
            reciver_image: reciver_name.image,
            amount: payment.amount,
            remaining_balance: payment.amount,
            account_number: payment.amount,
            status: payment.status,
            receipt: payment.receipt,
            date: payment.date,
            bankName:accountDetail ? accountDetail.bankName : null,
            branchNumber:accountDetail ? accountDetail.branchNumber : null,
            routingNumber:accountDetail ? accountDetail.routingNumber : null,
            bankAccountNumber:accountDetail ? accountDetail.bankAccountNumber : null,
        });
    }
                res.json({
                    success: false,
                    data:formattedPayments,
                    message: "Requested payment is more than your account payment!"
                }); 
            
           
    
})