const express = require('express')
const bannerRouter = express()
const { cloudinary } = require('../cloudinary/cloud')
const multer = require("multer");
const { storage } = require("../cloudinary/cloud");
const upload = multer({ storage });



const {
    setBanner,
    addBanner,
    saveBanner
} = require('../controller/bannerConroller')

// const {
// adminSessionCheckHomePage
// } = require('../middleware/auth')

bannerRouter.get('/setBanner', setBanner)
bannerRouter.get('/addBanner', addBanner)
bannerRouter.post('/addBanner/add', upload.array('image'), saveBanner)

module.exports = bannerRouter