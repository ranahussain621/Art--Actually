"use strict";

const pool = require("../DBconnection");
const Art = require("../model/Art");
const UserModel = require("../model/users");
const Format = require("../model/Format");
const Style = require("../model/Style");

const s3 = require("../utils/s3Service");

const catchAsyncFunction = require("../middlewares/catchAsyncFun");

// add art
exports.addArt = catchAsyncFunction(async (req, res) => {
  // if (!(req.body.title && req.body.description && req.body.image && req.body.user_id)) {
  //     return res.status(401).json({ 'success': false, error: "please fill all the fields" })
  // } else {
  const user_details = await UserModel.findById(req.body.user_id);
  const user_art = await Art.find({ owner_id: req.body.user_id });
  if (user_details.vip == "false" && user_art.length >= 3) {
    res.json({
      success: false,
      message: "Your package limit is full kinldy buy pro version!",
    });
  } else {
    let imagePaths = [];

    if (Array.isArray(req.files.image) && req.files.image.length > 0) {
      for (let image of req.files.image) {
        try {
          const s3Url = await s3.uploadToS3(image, "images");
          imagePaths.push(s3Url);
        } catch (error) {
          console.error("Error uploading image to S3:", error);
          return res.status(500).json({
            success: false,
            message: "Error uploading image to S3",
          });
        }
      }
    }
    // create new role
    var time = new Date().getTime();

    const cartData = {
      title: req.body.title,
      description: req.body.description,
      owner_id: req.body.user_id,
      image: imagePaths,
      format: req.body.format,
      style: req.body.style,
      dimension1: req.body.dimension1,
      dimension2: req.body.dimension2,
      dimension3: req.body.dimension3,
      dimension4: req.body.dimension4,
      material: req.body.material,
      tags: req.body.tags,
      visibility: req.body.visibility,
      donation: req.body.donation,
      created_at:time

    };

    const user = new Art(cartData);

    await user.save();

    return res.json({
      success: true,
      message: "art added successfully!",
    });
  }
});

// get arts
exports.getArt = catchAsyncFunction(async (req, res) => {
  const styles = await Style.find();
  const formates = await Format.find();
  if (req.body.title) {
    if (req.body.title && req.body.style && req.body.format) {
      try {
        const user = await Art.find({
          $and: [
            {
              title: { $regex: ".*" + req.body.title + "*" },
            },
            {
              format: req.body.format,
            },
            {
              visibility: 'everyone',
            },
            {
              style: req.body.style,
            },
          ],
        });
        res.json({
          success: true,
          data: user,
          styles: styles,
          formates: formates,
          message: "Arts  fetched successfully!",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else if (req.body.format && req.body.style) {
      try {
        const user = await Art.find({
          $and: [
            {
              title: { $regex: ".*" + req.body.title + "*" },
            },
            {
              format: req.body.format,
            },
            {
              visibility: 'everyone',
            },
            {
              style: req.body.style,
            },
          ],
        });
        res.json({
          success: true,
          data: user,
          styles: styles,
          formates: formates,
          message: "Arts  fetched successfully!",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else if (req.body.format) {
      try {
        const user = await Art.find({
          $and: [
            {
              title: { $regex: ".*" + req.query.title + "*" },
            },
            {
              visibility: 'everyone',
            },
            {
              format: req.body.format,
            },
          ],
        });
        res.json({
          success: true,
          data: user,
          styles: styles,
          formates: formates,
          message: "Arts  fetched successfully!",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else if (req.body.style) {
      try {
        const user = await Art.find({
          $and: [
            {
              title: { $regex: ".*" + req.query.title + "*" },
            },
            {
              visibility: 'everyone',
            },
            {
              style: req.body.style,
            },
          ],
        });
        res.json({
          success: true,
          data: user,
          styles: styles,
          formates: formates,
          message: "Arts  fetched successfully!",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else {
      try {
        const user = await Art.find({
          $and: [
            {
              title: { $regex: ".*" + req.query.title + "*" },
            },
            {
              visibility: 'everyone',
            },
          ],
         
        });
        console.log("else");
        res.json({
          success: true,
          data: user,
          styles: styles,
          formates: formates,
          message: "Arts  fetched successfully!",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    }
  } else {
    if (req.body.format && req.body.style) {
      try {
        const user = await Art.find({
          $and: [
            {
              format: req.body.format,
            },
            
            {
              visibility: 'everyone',
            },
            {
              style: req.body.style,
            },
          ],
        });
        res.json({
          success: true,
          data: user,
          styles: styles,
          formates: formates,
          message: "Arts  fetched successfully!",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else if (req.body.format) {
      try {
        const user = await Art.find({ 
          $and: [
            {
              format: req.body.format,
            },
            
            {
              visibility: 'everyone',
            },
          ],
          
           });
        res.json({
          success: true,
          data: user,
          styles: styles,
          formates: formates,
          message: "Arts  fetched successfully!",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else if (req.body.style) {
      try {
        const user = await Art.find({ 
          $and: [
            {
              style: req.body.style,
            },
            
            {
              visibility: 'everyone',
            },
          ],
          
           });
        res.json({
          success: true,
          data: user,
          styles: styles,
          formates: formates,
          message: "Arts  fetched successfully!",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else {
      try {
        const user = await Art.find({visibility: 'everyone'});
        res.json({
          success: true,
          data: user,
          styles: styles,
          formates: formates,
          message: "Arts  fetched successfully!",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    }
  }
});

// get arts
exports.getArtDetails = catchAsyncFunction(async (req, res) => {
  try {
    const user = await Art.findById(req.body.id);

    const userDetails = await UserModel.findById(user.owner_id);
    const artFormat = await Format.findById(user.format);
    const artStyle = await Style.findById(user.style);

    var data = {
      _id: user.id,
      title: user.title,
      description: user.description,
      image: user.image,
      owner_id: user.owner_id,
      status: user.status,
      format: user.format,
      format_title: artFormat.title,
      style: user.style,
      style_title: artStyle.title,
      artist: userDetails.firstName + " " + userDetails.lastName,
      dimension1: user.dimension1,
      dimension2: user.dimension2,
      dimension3: user.dimension3,
      dimension4: user.dimension4,
      dimension4: user.dimension4,
      material: user.material,
      tags: user.tags,
      visibility: user.visibility,
      donation: user.donation,
      created_at:user.created_at
    };

    res.json({
      success: true,
      data: data,
      message: "Art  fetched successfully!",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//find user arts
exports.getUserArt = catchAsyncFunction(async (req, res) => {
  try {
    const user = await Art.find({ owner_id: req.body.user_id });
    console.log(user);
    res.json({
      success: true,
      data: user,
      message: "Arts  fetched successfully!",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// add format
exports.addFormat = catchAsyncFunction(async (req, res) => {
  if (!req.body.title) {
    return res
      .status(401)
      .json({ success: false, error: "please fill all the credentials" });
  } else {
    // create new role
    const user = new Format({
      title: req.body.title,
    });
    await user
      .save()
      .then((data) => {
        res.json({
          success: true,
          message: "Format added successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err.message || "Some error occurred while creating user",
        });
      });
  }
});

// add format
exports.addStyle = catchAsyncFunction(async (req, res) => {
  if (!req.body.title) {
    return res
      .status(401)
      .json({ success: false, error: "please fill all the credentials" });
  } else {
    // create new role
    const user = new Style({
      title: req.body.title,
    });
    await user
      .save()
      .then((data) => {
        res.json({
          success: true,
          message: "Style added successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err.message || "Some error occurred while creating user",
        });
      });
  }
});

// get formats
exports.getFormat = catchAsyncFunction(async (req, res) => {
  try {
    const user = await Format.find();
    res.json({
      success: true,
      data: user,
      message: "Format  fetched successfully!",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// get Style
exports.getStyle = catchAsyncFunction(async (req, res) => {
  try {
    const user = await Style.find();
    res.json({
      success: true,
      data: user,
      message: "Style  fetched successfully!",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});



// update Sound
exports.updateArt = catchAsyncFunction(async (req, res) => {
  let imagePaths = [];

  var time = new Date().getTime();
  var data;
  // Upload new image file(s) to S3
  if (Array.isArray(req.files.image) && req.files.image.length > 0) {
    for (let image of req.files.image) {
      try {
        const s3Url = await s3.uploadToS3(image, 'images'); // 'images' is the S3 bucket name for image files
        data={
          title: req.body.title,
          description: req.body.description,
          owner_id: req.body.user_id,
          image: imagePaths,
          format: req.body.format,
          style: req.body.style,
          dimension1: req.body.dimension1,
          dimension2: req.body.dimension2,
          dimension3: req.body.dimension3,
          dimension4: req.body.dimension4,
          material: req.body.material,
          tags: req.body.tags,
          visibility: req.body.visibility,
          donation: req.body.donation,
          created_at:time
        }
        imagePaths.push(s3Url);
      } catch (error) {
        console.error('Error uploading image to S3:', error);
        return res
          .status(500)
          .json({ success: false, error: 'Error uploading image to S3' });
      }
    }
  }
  else {
    data={
      title: req.body.title,
      description: req.body.description,
      owner_id: req.body.user_id,
      format: req.body.format,
      style: req.body.style,
      dimension1: req.body.dimension1,
      dimension2: req.body.dimension2,
      dimension3: req.body.dimension3,
      dimension4: req.body.dimension4,
      material: req.body.material,
      tags: req.body.tags,
      visibility: req.body.visibility,
      donation: req.body.donation,
      created_at:time
    }
  }

  try {
    const updatedArt = await Art.findByIdAndUpdate(
      req.body.id,
      data,
      { new: true }
    );

    res.json({
      success: true,
      message: 'art updated successfully',
      data: updatedArt,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: 'Failed to update sound' });
  }
});


// delet sounds
exports.deletearts = catchAsyncFunction(async (req, res) => {
  try {
    const deletedArts = [];

    for (const soundId of req.body.ids) {
      const user = await Art.findByIdAndRemove(soundId);

      if (user) {
        const path = `.${user.file[0]}`;

        try {
          fs.unlinkSync(path);
          // File removed
        } catch (err) {
          console.error(err);
        }

        deletedArts.push(soundId);
      }
    }

    res.json({
      success: true,
      message: "Arts deleted successfully!",
      deletedArts: deletedArts,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
