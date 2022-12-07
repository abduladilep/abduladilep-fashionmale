if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const expres = require('express')
const { default: mongoose } = require('mongoose')
const app = expres()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const filestore = require("session-file-store")(session);
const flash = require('connect-flash')
const methodOverride=require('method-override')
// const multer= require("multer")
// const uplod = multer({dest:'uploads'})




app.use(bodyParser.urlencoded({ extended: true }))


app.use(flash())
app.use(expres.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const userRouter = require('./router/userRouter')
const adminRouter = require('./router/adminRouter');
const productRouter = require('./router/productRouter')
const categoryRouter=require('./router/categoryRouter')
const brandRouter=require("./router/brandRouter")
const cartRouter =require("./router/cartRouter")
const wishlistRouter= require("./router/wishListRouter")
const checkoutRouter=require('./router/ckeckOutRouter')
const bannerRouter=require("./router/bannerRouter")

const { collection } = require("./model/userScheema");


const MongoDBStore = require("connect-mongodb-session")(session)




const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/DATAS?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4',
    collection: "sessionValus",
});
store.on("error", function (error) {
    console.log(error)
})



app.use(
    session({
        secret: "this is a secret",
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },

        store: store,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});



app.set('views', './views/userpage')
app.set('views', './views/adminpages')


app.use(expres.static(path.join(__dirname, 'public')))
app.set('views', (path.join(__dirname, 'views')))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')



app.use('/', userRouter)
app.use('/admin', adminRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/brand', brandRouter)
app.use('/Cart',cartRouter)
app.use("/wishlist",wishlistRouter)
app.use("/checkout",checkoutRouter)
app.use("/banner",bannerRouter)





// app.get("*", (req, res, next) => {
//     res.send("404, Not Found").status(404);
// });


mongoose.connect('mongodb://127.0.0.1:27017/DATAS?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4').then(() => {
    app.listen(3000, () => { console.log('server running') })
})
    .catch((err) => {
        console.log('there is error');
        console.error(err);
    })