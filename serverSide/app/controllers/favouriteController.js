"use strict";

const pool = require("../DBconnection");
const Favourite = require("../model/Favourite");
const Art = require("../model/Art");
const Sound = require("../model/Sound");

const catchAsyncFunction = require("../middlewares/catchAsyncFun");

// add item in Favourite
exports.addItemFavourite = catchAsyncFunction(async (req, res) => {
  try {
    // Check if all required credentials are provided
    if (!(req.body.user_id && (req.body.art_id || req.body.music_id))) {
      return res
        .status(401)
        .json({ success: false, error: "please fill all the credentials" });
    }

    // Check if the product already exists in the Favourite
    var art;
    if(req.body.art_id)
    {
        art=req.body.art_id
    }
    else{
        art=req.body.music_id

    }
    const userFavourite = await Favourite.findOne({ $and: [{ art_id: art }, { user_id: req.body.user_id }] });

    if (userFavourite) {
      return res.json({
        success: false,
        message: "Product already exists in the Favourite",
      });
    }
    const FavouriteData = {
      user_id: req.body.user_id,
    };

    if (req.body.art_id) {
      FavouriteData.art_id = req.body.art_id;
    }

    if (req.body.music_id) {
      FavouriteData.music_id = req.body.music_id;
    }

    const favourite = new Favourite(FavouriteData);

    await favourite.save();

    return res.json({
      success: true,
      message: "Item added to the Favourite successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Some error occurred while adding the item to the Favourite",
    });
  }
});

// get user Favourite
exports.getFavourite = catchAsyncFunction(async (req, res) => {
    try {
        const Arts = await Favourite.find({ user_id: req.body.user_id });
        const formattedArts = [];
        const formattedSounds = [];
      
        for (const art of Arts) {
          var id = art._id.toString();
      
          if (art.art_id) {
            const art_details = await Art.findById(art.art_id) || {};
            const formattedArt = {
              id_for_delete: id,
              _id: art_details._id || null,
              title: art_details.title || null,
              description: art_details.description || null,
              image: art_details.image || null,
              owner_id: art_details.owner_id || null,
              status: art_details.status || null,
              format: art_details.format || null,
              style: art_details.style || null,
              __v: art_details.__v || 0,
            };
            formattedArts.push(formattedArt);
          } else {
            const sound_details = await Sound.findById(art.music_id) || {};
            const formattedSound = {
              id_for_delete: id,
              _id: sound_details._id || null,
              title: sound_details.title || null,
              description: sound_details.description || null,
              owner_id: sound_details.owner_id || null,
              file: sound_details.file || null,
              image: sound_details.image || null,
              status: sound_details.status || null,
              mood: sound_details.mood || null,
              genre: sound_details.genre || null,
              instrument: sound_details.instrument || null,
              vocals: sound_details.vocals || null,
              tags: sound_details.tags || [],
              __v: sound_details.__v || 0,
            };
            formattedSounds.push(formattedSound);
          }
        }
      
        res.json({
          success: true,
          data: {
            arts: formattedArts,
            sounds: formattedSounds,
          },
          message: "Items fetched successfully!",
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      
});

//delete item from Favourite
exports.delteItemFromFavourite = catchAsyncFunction(async (req, res) => {
  await Favourite.findByIdAndRemove(req.body.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `item not found.`,
        });
      } else {
        res.send({
          message: "item removed from Favourite successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});
