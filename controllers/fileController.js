const File = require('./../models/File')
const csv = require('csv-parser')
const fs = require('fs')
const csvtojson = require('csvtojson')
const { request, response } = require('express')

const createFile = async(req = request, res = response) => {
    // csvtojson()
    //     .fromFile(req.file.path)
    //     .then(csvData => {
    //         const file = new File({
    //             data: csvData
    //         })
    //         file.save({ w: 1 })
    //         return res.status(201).json({
    //             ok: true,
    //             msg: 'File uploaded'
    //         })            
    //     })
    //     .catch((error) => {
    //         return res.status(500).json({
    //             ok: false,
    //             msg: 'Please contact to support',
    //             error: error
    //         })
    //     })    
    try {
        console.log(req.file.path)
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', async(data) => {
                const file = new File({ data })
                await file.save({ w: 1 })
                console.log(file)
            })
            .on('end', () => {
                return res.status(201).json({
                    ok: true,
                    msg: 'file uploaded'
                })
            })
    }catch(error){
        res.status(500).json({
            msg: 'Please contact to support',
            error: error
        })
    }
}

module.exports = {
    createFile
}