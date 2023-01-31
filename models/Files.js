const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads/files');

const fileSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    File: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});

const storage = multer.memoryStorage();

fileSchema.statics.uploadedFiles = multer({ storage: storage }).single('file');
fileSchema.statics.avatarPath = FILE_PATH;

const File = mongoose.model('File', fileSchema);
module.exports = File;