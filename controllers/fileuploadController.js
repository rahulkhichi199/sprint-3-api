'use strict';

const MultipleFile = require('../models/multiplefile');
const mongoose = require('mongoose');

const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            title: req.body.title,
            NFTname: req.body.NFTname,
            AssetID: req.body.AssetID,
            Amount: req.body.Amount,
            Description: req.body.Description,
            Tags: req.body.Tags,
            CreatorName: req.body.CreatorName,
            files: filesArray 
        });

// changes


const fs = require('fs');

const saveData = (multipleFiles) =>{


    const finished = (error)=>{
        if(error){
            console.error(error)
            return;
        }
    }
    const jsonData = JSON.stringify(multipleFiles,null,2)
    fs.appendFile('multipleFiles.json',jsonData,finished)
}


saveData(multipleFiles);









// changes
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}



////

const getallMultipleFiles = async (req, res, next) => {
    try{

        let {sort,filter} = req.query;
        if (filter){
            filter = JSON.parse(filter)
            if(filter.title){
                filter.title = new RegExp(filter.title, 'i')
            }
            else if(filter.NFTname){
                 filter.NFTname = new RegExp(filter.NFTname, 'i')
            }
            
        }
 if (sort){
            sort = JSON.parse(sort)

 }

        const files = await MultipleFile.find({...filter}).sort({...sort});
        res.status(200).send(files);
    }catch(error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}


///find one ->

const getnfts  = async (req, res, next) => {

try{
     

const nft = await MultipleFile.findOne({_id:mongoose.Types.ObjectId(req.params.id)});
res.status(200).send(nft);
}catch(error){
    console.log(error)
    res.status(400).send(error.message);
}



}











//

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    
    multipleFileUpload,
    
    getallMultipleFiles,

    getnfts,
    
}