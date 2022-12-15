const express = require('express')
const bannerRouter = express()
const { cloudinary } = require('../cloudinary/cloud')
const multer = require("multer");
const { storage } = require("../cloudinary/cloud");
const upload = multer({ storage });



const {
    setBanner,
    addBanner,
    saveBanner,
    sethero,
    savehero,
    addhero,
} = require('../controller/bannerConroller')

bannerRouter.get('/setBanner', setBanner)
bannerRouter.get('/addBanner', addBanner)
bannerRouter.post('/addBanner/add', upload.array('image'), saveBanner)
bannerRouter.get('/sethero', sethero)
bannerRouter.get('/addhero', addhero)
bannerRouter.post('/addhero/add', upload.array('image'), savehero)


module.exports = bannerRouter