'use strict';

const express = require('express');
const {upload} = require('../helpers/filehelper');


const { multipleFileUpload,
     getallMultipleFiles,getnfts} = require('../controllers/fileuploadController');
const { query } = require('express');
const router = express.Router();





router.post('/multipleFiles', upload.array('files'), multipleFileUpload);

router.get('/getMultipleFiles', getallMultipleFiles);


//
router.get('/DetailNFT/:id',getnfts);
//














module.exports = {
    routes: router
}