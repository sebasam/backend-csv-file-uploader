const File = require('./../models/File')
const csv = require('csv-parser')
const fs = require('fs')
const csvtojson = require('csvtojson')
const { request, response } = require('express')

const createFile = async(req = request, res = response) => {
    console.log(req.file)
    csvtojson()        
        .fromFile(req.file.path)
        .then(csvData => {
            const file = new File({
                name: req.file.originalname,
                data: csvData
            })
            file.save({ w: 1 })
            return res.status(201).json({
                ok: true,
                msg: 'File uploaded'
            })            
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                msg: 'Please contact to support',
                error: error
            })
        })    
    // try {
    //     console.log(req.file.path)
    //     fs.createReadStream(req.file.path)
    //         .pipe(csv())
    //         .on('data', async(data) => {
    //             const file = new File({ 
    //                 name: req.file.filename,
    //                 data: data
    //             })
    //             await file.save({ w: 1 })
    //             console.log(file)
    //         })
    //         .on('end', () => {
    //             return res.status(201).json({
    //                 ok: true,
    //                 msg: 'file uploaded'
    //             })
    //         })
    // }catch(error){
    //     res.status(500).json({
    //         msg: 'Please contact to support',
    //         error: error
    //     })
    // }
}

const getFiles = async(req, res) => {
    try {
        const files = await File.find()
        return res.status(200).json({
            ok: true,
            files: files
        })
    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'Please contact to support'
        })
    }
}

const getFileById = async(req, res) => {
    try {
        const { id } = req.params
        const file = await File.find({ _id: id })
        if(!file) return res.status(404).json({
            ok: false,
            msg: 'There isnt any file with that ID'
        })
        return res.status(200).json({
            ok: true,
            file: file
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact to support'
        })
    }
}

const deleteFileById = async(req, res) => {
    try {
        const { id } = req.params
        const file = await File.findOneAndDelete({ _id: id })
        if(!file) return res.status(404).json({
            ok: false,
            msg: 'There isnt any file with that ID'
        })
        return res.status(200).json({
            ok: true,
            msg: 'File has been deleted!'
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact to support'
        })
    }
}

module.exports = {
    createFile,
    getFiles,
    getFileById,
    deleteFileById
}