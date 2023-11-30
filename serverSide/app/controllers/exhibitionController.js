'use strict'
const catchAsyncFunction = require('../middlewares/catchAsyncFun');
const Exhibition = require('../model/Exhibition')
const s3 = require('../utils/s3Service')

// create exhibition
exports.create = catchAsyncFunction(async (req, res) => {
    try {
        const { user_id, name, startDate, endDate, description, url, location } = req.body;

        // Check if image files were uploaded
        let imagesPaths = [];

        if (Array.isArray(req.files.image) && req.files.image.length > 0) {
            for (let image of req.files.image) {
                try {
                    const s3Url = await s3.uploadToS3(image, 'images'); // Upload the updated image to S3
                    imagesPaths.push(s3Url);
                } catch (error) {
                    console.error('Error uploading image to S3:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error uploading image to S3',
                    });
                }
            }
        }

        // Calculate the status based on dates
        const currentDate = new Date();
        const strDate = new Date(startDate);
        const edDate = new Date(endDate)
        let status;
        if (edDate < currentDate) {
            status = "completed";
        } else if (strDate <= currentDate && edDate >= currentDate) {
            status = "progress";
        } else {
            status = "pending";
        }

        // Create the exhibition and respond
        const exhibition = await Exhibition.create({
            user_id, name, startDate, endDate, description, url, location, image: imagesPaths, status
        });

        res.status(201).json({
            success: true,
            message: "Exhibition added successfully",
            data: exhibition
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Failed to add exhibition", error: error.message });
    }
});



// list of exhibition with status
exports.list = catchAsyncFunction(async (req, res) => {
    try {
        const currentDate = new Date();
        const exhibitions = await Exhibition.find();

        const getStatus = (startDate, endDate) => {
            if (endDate < currentDate) {
                console.log('1');
                return "completed";
            } else if (startDate <= currentDate && endDate >= currentDate) {
                console.log('2');
                return "progress";
            } else {
                console.log('3');
                return "pending";
            }
        };

        const exhibitionsWithStatus = exhibitions.map((exhibition) => {
            const status = getStatus(new Date(exhibition.startDate), new Date(exhibition.endDate));
            return {
                ...exhibition.toObject(),
                status: status,
            };
        });

        res.json({
            success: true,
            message: "Exhibition list fetched successfully",
            data: exhibitionsWithStatus,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// detail of exhibition with status
exports.detail = catchAsyncFunction(async (req, res) => {

    try {
        const { exhibitionId, status } = req.body;


        let exhibition;

        if (exhibitionId) {
            exhibition = await Exhibition.find({ _id: exhibitionId });
        } else if (status) {
            exhibition = await Exhibition.find({ status: status });
        } else (
            exhibition = await Exhibition.find({ _id: exhibition, status: status })

        )

        if (!exhibition) {
            res.status(404).json({
                success: false,
                message: "Exhibition not found",
            });
            return;
        }

        res.json({
            success: true,
            message: "Exhibition fetched successfully",
            data: exhibition,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

});


// Delete subscription
exports.remove = catchAsyncFunction(async (req, res) => {
    try {
        const { id } = req.params;
        const exhibition = await Exhibition.findOne({ _id: id })
        if (!exhibition) {
            res.json({
                success: false,
                message: "Exhibition not found",
            });
            return;
        }
        await Exhibition.findOneAndDelete({ _id: exhibition._id })
        res.json({
            success: false,
            message: "Exhibition deleted successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

// update subscription
exports.update = catchAsyncFunction(async (req, res) => {
    try {
        const { exhibitionId, user_id, name, startDate, endDate, description, url, location } = req.body;

        const existingExhibition = await Exhibition.findById(exhibitionId);

        if (!existingExhibition) {
            return res.status(404).json({
                success: false,
                message: "Exhibition not found",
            });
        }

        let imagesPaths = [];

        if (Array.isArray(req.files.image) && req.files.image.length > 0) {
            for (let image of req.files.image) {
                try {
                    const s3Url = await s3.uploadToS3(image, 'images'); // Upload the updated image to S3
                    imagesPaths.push(s3Url);
                } catch (error) {
                    console.error('Error uploading image to S3:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error uploading image to S3',
                    });
                }
            }
        }

        existingExhibition.user_id = user_id ? user_id : existingExhibition.user_id;
        existingExhibition.name = name ? name : existingExhibition.name;
        existingExhibition.startDate = startDate ? startDate : existingExhibition.startDate;
        existingExhibition.endDate = endDate ? endDate : existingExhibition.endDate;
        existingExhibition.description = description ? description : existingExhibition.description;
        existingExhibition.url = url ? url : existingExhibition.url;
        existingExhibition.location = location ? location : existingExhibition.location;

        if (imagesPaths.length > 0) {
            existingExhibition.image = imagesPaths;
        }

        // Calculate the new status based on the updated startDate and endDate
        const currentDate = new Date();
        const strDate = new Date(startDate)
        const lastDate = new Date(endDate)

        if (lastDate < currentDate) {
            existingExhibition.status = "completed";
        } else if (strDate <= currentDate && lastDate >= currentDate) {
            existingExhibition.status = "progress";
        } else {
            existingExhibition.status = "pending";
        }

        const updatedExhibition = await existingExhibition.save();

        res.json({
            success: true,
            message: "Exhibition updated successfully",
            data: updatedExhibition,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});




