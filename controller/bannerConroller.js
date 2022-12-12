const bannerData = require('../model/bannerSchema')


const heroData = require('../model/heroScheema')

const setBanner = async (req, res) => {

    try {
        const banners = await bannerData.find({})
        console.log("banners==", banners);

        res.render('adminpages/banner', { banners })
    } catch (err) {
        res.render('error', { err })
    }
}

const addBanner = async (req, res) => {
    try {
        res.render('adminpages/bannerAdd')
    } catch (err) {
        res.render('error', { err })
    }
}

const saveBanner = async (req, res) => {
   
    try {
        const banner = new bannerData({
            highlight: req.body.highlight,
            description: req.body.description,
            date: Date.now()

        })
       
        banner.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
        await banner.save()
        req.flash("success", 'Banner added successfully')
        res.redirect('back')
    } catch (err) {
        res.render('error', { err })
    }
}


const sethero = async (req, res) => {

    try {
        const heros = await heroData.find({})
        console.log("heros==", heros);

        res.render('adminpages/hero', { heros})
    } catch (err) {
        res.render('error', { err })
    }
}

const addhero = async (req, res) => {
    try {
        res.render('adminpages/heroAdd')
    } catch (err) {
        res.render('error', { err })
    }
}

const savehero = async (req, res) => {
   
    try {
        const hero = new heroData({
            highlight: req.body.highlight,
            description: req.body.description,
            date: Date.now()

        })
        console.log("kkjkj");
       
        hero.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
        await hero.save()

        req.flash("success", 'Banner added successfully')
        res.redirect('/banner/addhero')
    } catch (err) {
        res.render('error', { err })
    }
}


module.exports = {
    setBanner,
    addBanner,
    saveBanner,
    sethero,
    addhero,
    savehero,
}