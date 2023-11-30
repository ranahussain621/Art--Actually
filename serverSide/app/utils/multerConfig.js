const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define a shared storage configuration for both audio and image uploads
const storage = multer.diskStorage({
   
    filename: function (req, file, cb) {
        const fileType = file.fieldname === 'file' ? 'mp3' : 'png';
        cb(null, Date.now() + '.' + fileType);
    },
});

const fileFilter = function (req, file, cb) {
    if (file.fieldname === 'file') {
        const allowedAudioExtensions = ['.aiff', '.mpeg', '.mp3'];
        const ext = path.extname(file.originalname).toLowerCase();

        if (!allowedAudioExtensions.includes(ext)) {
            return cb(new Error('Only audio files are allowed!'));
        }
    } else if (file.fieldname === 'image') {
        const allowedImageExtensions = ['.jpeg', '.jpg', '.png'];
        const ext = path.extname(file.originalname).toLowerCase();

        if (!allowedImageExtensions.includes(ext)) {
            return cb(new Error('Only jpeg, jpg, and png images are allowed!'));
        }
    }

    cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
