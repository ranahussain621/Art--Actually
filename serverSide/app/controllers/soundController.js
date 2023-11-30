"use strict";

const pool = require("../DBconnection");
const Sound = require("../model/Sound");
const UserModel = require("../model/users");
const SoundFormat = require("../model/SoundFormat");
const SoundStyle = require("../model/SoundStyle");
const Visibility = require("../model/SoundVisibility");
const fs = require("fs");
const JSZip = require("jszip");
const catchAsyncFunction = require("../middlewares/catchAsyncFun");
const s3 = require("../utils/s3Service");

// add Sound
exports.addSound = catchAsyncFunction(async (req, res) => {
  if (
    !(
      req.body.title &&
      req.body.description &&
      req.body.owner_id &&
      req.body.mood &&
      req.body.genre &&
      req.body.instrument &&
      req.body.vocals &&
      req.body.tags
    )
  ) {
    return res
      .status(401)
      .json({ success: false, error: "please fill all the fields" });
  } else {
    const user_details = await UserModel.findById(req.body.owner_id);
    const user_art = await Sound.find({ owner_id: req.body.owner_id });
    // res.json(user_art.length)
    if (user_details.vip == "false" && user_art.length >= 3) {
      res.json({
        success: false,
        message: "Your package limit is full kinldy buy pro version!",
      });
    } else {
      let audioPaths = [];

      if (Array.isArray(req.files.file) && req.files.file.length > 0) {
        for (let audio of req.files.file) {
          try {
            const s3Url = await s3.uploadToS3(audio, "audios"); // 'audio' is the S3 bucket name for audio files
            audioPaths.push(s3Url);
          } catch (error) {
            console.error("Error uploading audio to S3:", error);
            return res.status(500).json({
              success: false,
              message: "Error uploading audio to S3",
            });
          }
        }
      }

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
      try {
        var time = new Date().getTime();

        const createdMedia = await Sound.create({
          title: req.body.title,
          description: req.body.description,
          owner_id: req.body.owner_id,
          file: audioPaths,
          mood: req.body.mood,
          genre: req.body.genre,
          instrument: req.body.instrument,
          vocals: req.body.vocals,
          tags: req.body.tags,
          image: imagePaths,
          visibility: req.body.visibility,
          donation: req.body.donation,
          created_at: time,
        });

        res.json({
          success: true,
          message: "sound  added successfully",
          data: createdMedia,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
    }
  }
});

// update Sound
exports.updateSound = catchAsyncFunction(async (req, res) => {
  let audioPaths = [];
  let imagePaths = [];
  var data;
  // Upload new audio file(s) to S3
  if (Array.isArray(req.files.file) && req.files.file.length > 0) {
    for (let audio of req.files.file) {
      try {
        const s3Url = await s3.uploadToS3(audio, "audio"); // 'audio' is the S3 bucket name for audio files
        audioPaths.push(s3Url);
      } catch (error) {
        console.error("Error uploading audio to S3:", error);
        return res
          .status(500)
          .json({ success: false, error: "Error uploading audio to S3" });
      }
    }
  }

  // Upload new image file(s) to S3
  if (Array.isArray(req.files.image) && req.files.image.length > 0) {
    for (let image of req.files.image) {
      try {
        const s3Url = await s3.uploadToS3(image, "images"); // 'images' is the S3 bucket name for image files
        imagePaths.push(s3Url);
      } catch (error) {
        console.error("Error uploading image to S3:", error);
        return res
          .status(500)
          .json({ success: false, error: "Error uploading image to S3" });
      }
    }
  }
  if (
    Array.isArray(req.files.image) &&
    req.files.image.length > 0 &&
    req.files.file &&
    Array.isArray(req.files.file) &&
    req.files.file.length > 0
  ) {
    data = {
      title: req.body.title,
      description: req.body.description,
      owner_id: req.body.owner_id,
      file: audioPaths,
      image: imagePaths,
      mood: req.body.mood,
      genre: req.body.genre,
      instrument: req.body.instrument,
      vocals: req.body.vocals,
      tags: req.body.tags,
      visibility: req.body.visibility,
      donation: req.body.donation,
    };
  } else if (Array.isArray(req.files.image) && req.files.image.length > 0) {
    data = {
      title: req.body.title,
      description: req.body.description,
      owner_id: req.body.owner_id,
      image: imagePaths,
      mood: req.body.mood,
      genre: req.body.genre,
      instrument: req.body.instrument,
      vocals: req.body.vocals,
      tags: req.body.tags,
      visibility: req.body.visibility,
      donation: req.body.donation,
    };
  } else if (
    req.files.file &&
    Array.isArray(req.files.file) &&
    req.files.file.length > 0
  ) {
    data = {
      title: req.body.title,
      description: req.body.description,
      owner_id: req.body.owner_id,
      file: audioPaths,
      mood: req.body.mood,
      genre: req.body.genre,
      instrument: req.body.instrument,
      vocals: req.body.vocals,
      tags: req.body.tags,
      visibility: req.body.visibility,
      donation: req.body.donation,
    };
  } else {
    data = {
      title: req.body.title,
      description: req.body.description,
      owner_id: req.body.owner_id,
      mood: req.body.mood,
      genre: req.body.genre,
      instrument: req.body.instrument,
      vocals: req.body.vocals,
      tags: req.body.tags,
      visibility: req.body.visibility,
      donation: req.body.donation,
    };
  }
  try {
    const updatedSound = await Sound.findByIdAndUpdate(req.body.id, data, {
      new: true,
    });

    res.json({
      success: true,
      message: "Sound updated successfully",
      data: updatedSound,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to update sound" });
  }
});

// get  all Sounds
exports.getSound = catchAsyncFunction(async (req, res) => {
  const SoundStyles = await SoundStyle.find();
  const SoundFormates = await SoundFormat.find();
  if (req.body.title) {
    try {
      const user = await Sound.find({
        title: { $regex: ".*" + req.body.title + "*" },
      });
      res.json({
        success: true,
        data: user,
        SoundStyles: SoundStyles,
        SoundFormates: SoundFormates,
        message: "Sounds  fetched successfully!",
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    try {
      const user = await Sound.find();
      res.json({
        success: true,
        data: user,
        SoundStyles: SoundStyles,
        SoundFormates: SoundFormates,
        message: "Sounds  fetched successfully!",
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
});

//find user Sounds
exports.getUserSound = catchAsyncFunction(async (req, res) => {
  try {
    const user = await Sound.find({ owner_id: req.body.user_id }).lean();

    res.json({
      success: true,
      data: user,
      message: "Sounds  fetched successfully!",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// add SoundFormat
exports.addSoundFormat = catchAsyncFunction(async (req, res) => {
  if (!req.body.title) {
    return res
      .status(401)
      .json({ success: false, error: "please fill all the credentials" });
  } else {
    // create new role
    const user = new SoundFormat({
      title: req.body.title,
    });
    await user
      .save()
      .then((data) => {
        res.json({
          success: true,
          message: "SoundFormat added successfully!",
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

// add SoundFormat
exports.addSoundStyle = catchAsyncFunction(async (req, res) => {
  if (!req.body.title) {
    return res
      .status(401)
      .json({ success: false, error: "please fill all the credentials" });
  } else {
    // create new role
    const user = new SoundStyle({
      title: req.body.title,
    });
    await user
      .save()
      .then((data) => {
        res.json({
          success: true,
          message: "SoundStyle added successfully!",
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

// get SoundFormats
exports.getSoundFormat = catchAsyncFunction(async (req, res) => {
  try {
    const user = await SoundFormat.find();
    res.json({
      success: true,
      data: user,
      message: "Sound Format  fetched successfully!",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// get SoundStyle
exports.getSoundStyle = catchAsyncFunction(async (req, res) => {
  try {
    const user = await SoundStyle.find();
    res.json({
      success: true,
      data: user,
      message: "Sound Style  fetched successfully!",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// delet sounds
exports.deletesounds = catchAsyncFunction(async (req, res) => {
  try {
    const deletedSounds = [];

    for (const soundId of req.body.ids) {
      const user = await Sound.findByIdAndRemove(soundId);

      if (user) {
        const path = `.${user.file[0]}`;

        try {
          fs.unlinkSync(path);
          // File removed
        } catch (err) {
          console.error(err);
        }

        deletedSounds.push(soundId);
      }
    }

    res.json({
      success: true,
      message: "Sounds deleted successfully!",
      deletedSounds: deletedSounds,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

exports.downloadSound = catchAsyncFunction(async (req, res) => {
  try {
    const sound = await Sound.findById(req.params.id);
    if (sound) {
      const filePath = "." + sound.file[0]; // Assuming the file path is stored in the 'file' property
      res.download(filePath);
    } else {
      res.status(404).json({ success: false, error: "Sound not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: "Failed to download sound" });
  }
});

exports.downloadSounds = catchAsyncFunction(async (req, res) => {
  const soundIds = req.body.soundIds; // Array of sound IDs

  try {
    const sounds = await Sound.find({ _id: { $in: soundIds } });

    if (sounds.length === 0) {
      res.status(404).json({ success: false, error: "Sounds not found" });
      return;
    }

    const filePaths = sounds.map((sound) => "." + sound.file[0]);

    // Create a zip file containing all the sound files
    const zip = new JSZip();
    filePaths.forEach((filePath, index) => {
      const fileName = `sound_${index + 1}.mp3`; // Customize the file name as needed
      const fileData = fs.readFileSync(filePath);
      zip.file(fileName, fileData);
    });

    const zipFile = await zip.generateAsync({ type: "nodebuffer" });

    res.set("Content-Disposition", 'attachment; filename="sounds.zip"');
    res.set("Content-Type", "application/zip");
    res.send(zipFile);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, error: "Failed to download sounds" });
  }
});

// Confirm Delete sounds by id
exports.fetchSounds = catchAsyncFunction(async (req, res) => {
  try {
    const { soundIds } = req.body;
    const sounds = await Sound.find({ _id: { $in: soundIds } });
    res.status(200).json({
      success: true,
      sounds,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

exports.soundDetails = catchAsyncFunction(async (req, res) => {
  try {
    const sound = await Sound.findById(req.body.id);
    const owned_by = await UserModel.findById(sound.owner_id);
    res.status(200).json({
      success: true,
      data: {
        _id: sound._id,
        title: sound.title,
        description: sound.description,
        file: sound.file,
        owner_id: sound.owner_id,
        owner_name: owned_by.firstName + " " + owned_by.lastName,
        status: sound.status,
        mood: sound.mood,
        genre: sound.genre,
        instrument: sound.instrument,
        vocals: sound.vocals,
        tags: sound.tags,
        image: sound.image,
        visibility: sound.visibility,
        donation: sound.donation,
        created_at: sound.created_at,
        __v: sound.__v,
      },
      message: "sound details ",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
