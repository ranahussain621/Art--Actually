'use strict'

const catchAsyncFunction = require('../middlewares/catchAsyncFun');
const Collection = require('../model/Collection')
const collectionPopulation = require('../population/collectionPopulation')
const { ObjectId } = require('mongodb');


// add collection
exports.addCollection = catchAsyncFunction(async (req, res) => {
  try {
    const { title, user_id, sound_id } = req.body;

    const collection = await Collection.create({
      title: title,
      user_id: user_id,
      sound_id: sound_id
    });

    res.json({
      success: true,
      message: "collection  added successfully",
      'data': collection
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})

// fetch list of collection
exports.getCollection = catchAsyncFunction(async (req, res) => {
  try {
    const collection = await Collection.find().populate(collectionPopulation.find)
    res.status(200).json({
      success: true,
      'data': collection
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }

})

// get single collection through id
exports.getSingleCollection = catchAsyncFunction(async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findOne({ _id: id }).populate(collectionPopulation.find)
    res.status(200).json({
      success: true,
      'data': collection
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})

// add favourite sound into collection

exports.addtoFavorite = catchAsyncFunction(async (req, res) => {
  try {
    const { collection_ids, user_id, sound_ids } = req.body;

    if (!Array.isArray(collection_ids)) {
      return res.status(400).json({ success: false, message: 'collection_ids should be an array' });
    }

    if (!Array.isArray(sound_ids)) {
      return res.status(400).json({ success: false, message: 'sound_ids should be an array' });
    }

    const soundIds = sound_ids.map((id) => new ObjectId(id));

    const collections = await Collection.find({ _id: { $in: collection_ids }, user_id }).exec();
    console.log(collections, "collections");

    if (collections.length !== collection_ids.length) {
      return res.status(404).json({ success: false, message: 'One or more collections not found' });
    }

    const allCollectionsHaveSoundIds = collections.every((collection) => {
      const existingSoundIds = collection.sound_id.map((id) => id.toString());
      return soundIds.every((id) => existingSoundIds.includes(id.toString()));
    });

    if (allCollectionsHaveSoundIds) {
      return res.json({ success: false, message: 'sounds already present in collection' });
    }

    const updateOperations = collections.map((collection) => {
      const existingSoundIds = collection.sound_id.map((id) => id.toString());
      const uniqueSoundIds = soundIds.filter((id) => !existingSoundIds.includes(id.toString()));

      if (uniqueSoundIds.length === 0) {
        return Promise.resolve(); // Skip update for this collection if no new sound IDs
      }
      if (collection.sound_id.length === 0) {
        return Collection.updateOne(
          { _id: collection._id, user_id },
          { $set: { sound_id: uniqueSoundIds } }
        ).exec();
      } else {
        return Collection.updateOne(
          { _id: collection._id, user_id },
          { $push: { sound_id: { $each: uniqueSoundIds } } }
        ).exec();
      }
    });

    await Promise.all(updateOperations);

    res.json({ success: true, message: 'Sound IDs added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// add to un favorite

exports.adToUnFavorite = catchAsyncFunction(async (req, res) => {
  const { collection_id, sound_ids } = req.body;
  const collection = await Collection.findOne({ _id: collection_id });
  console.log(collection);

  if (!Array.isArray(sound_ids)) {
    return res.status(400).json({ success: false, message: 'sound_ids should be an array' });
  }

  const soundIdArr = collection.sound_id;
  console.log('Before:', soundIdArr);

  // Remove the sound IDs from the soundIdArr and database
  const updatedSoundIdArr = soundIdArr.filter((sound) => {
    console.log(sound._id.toString(), '1122');
    return !sound_ids.includes(sound._id.toString());
  });

  if (updatedSoundIdArr === []) {
    console.log('123');
  }

  collection.sound_id = updatedSoundIdArr;
  await collection.save();

  console.log('After:', updatedSoundIdArr);

  // Check if updatedSoundIdArr is empty
  if (updatedSoundIdArr.length === 0) {
    console.log('All sound IDs were removed');
    await Collection.findOneAndDelete({ _id: collection_id })
    res.json({
      success: true,
      message: 'collection deleted successfully'
    })
  }

  res.json({ success: true, message: 'Sound IDs removed successfully' });
});


// delete Collection through id
exports.deleteCollection = catchAsyncFunction(async(req,res)=>{
   const{id} = req.params;
   if(!id){
    res.status(404).json({
      success:false,
      message:'collection not found'
    })
   }
   await Collection.findOneAndDelete({_id:id})
   res.status(200).json({
    success:true,
    message:'collection deleted successfully'
  })
})





