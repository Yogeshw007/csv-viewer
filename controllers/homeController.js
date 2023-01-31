const File = require('../models/Files');
const Papa = require('papaparse');

module.exports.home = async function (req, res) {
    let files = await File.find({});

    console.log(files)

    res.render('home', {
        files
    });
}

module.exports.create = function (req, res) {
    File.uploadedFiles(req, res, async function (err) {
        try {
            let file = await File.findOne({ Name: req.file.originalName });

            if (file) {
                return res.redirect('back');
            }

            let parsedData = Papa.parse(req.file.buffer.toString(), {
                delimiter: ',',
                escapeChar: '//',
                header: false,

                error: function (error) {
                    console.log('Error in parsing the data : ', error);
                }
            })

            if (req.file && req.file.mimetype === 'text/csv') {
                File.create({
                    Name: req.file.originalname,
                    File: parsedData.data
                });

                console.log('File created successfully');
            }
            res.redirect('back');

        } catch (err) {
            console.log('Error in uploading file', err);
            res.redirect('back');
        }
    })
}

module.exports.view = async function (req, res) {
    try {
        let file = await File.findById(req.params.id);

        return res.render('view', {
            name: file.Name,
            keys: file.File[0],
            results: file.File
        });
    } catch (e) {
        console.log('Error in viewing the data : ', e);
        res.redirect('back');
    }
}

module.exports.delete = async function (req, res) {
    try {
        let file = await File.findByIdAndDelete(req.params.id);

        console.log('File deleted successfully');
    } catch (e) {
        console.log('Error in deleting the data : ', e);
    }
    res.redirect('back');
}