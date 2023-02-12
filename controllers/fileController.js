const File = require('./../models/File')
const csvtojson = require('csvtojson')
const { request, response } = require('express')
const path = require('path')
const fs = require('fs')

const createFile = async(req = request, res = response) => {
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
        const file = await File.findOne({ _id: id })        
                
        if(!file) return res.status(404).json({
            ok: false,
            msg: 'There isnt any file with that ID'
        })
        fs.unlinkSync(path.join(__dirname, '..', `public/files/${ file.name }`))
        await file.delete()
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