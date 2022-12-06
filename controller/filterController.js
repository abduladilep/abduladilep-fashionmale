

const User = require('../model/userScheema')
const CheckoutData = require('../model/checkoutSchema')
const Coupon = require('../model/coupenSchema')
const addressData = require('../model/adressSchema')
const CartItem = require('../model/cartScheema')
const mongoose = require('mongoose')
const Product = require('../model/productSchema')





const catagorySort = async (req, res) => {

   const catagoryId = mongoose.Types.ObjectId(req.body.catagoryId);

   const product = await Product.find({ category_id: catagoryId })
   console.log("ffff", product);

   res.send({ product });

}


//    const filter = async(req,res)=>{
//     const {brand,ram,memory,discount,price,sort} = req.body;
//     // const brand = mongoose.Types.ObjectId(req.body.brand);
//     let product = ""
//     if(brand&&ram&&memory&&discount&&price){
//       if(sort == 1){
//         product = await Product.find({brand_id:brand,ram:ram,memory:memory,discount:{$gte:discount},finalPrice:{$lte:price}});
//       }else if(sort == 2){
//         product = await Product.find({brand_id:brand,ram:ram,memory:memory,discount:{$gte:discount},finalPrice:{$lte:price}}).sort({price: 1});
//       }else if(sort == 3){
//         product = await Product.find({brand_id:brand,ram:ram,memory:memory,discount:{$gte:discount},finalPrice:{$lte:price}}).sort({price: -1});
//       }


//     }else if(brand&&ram&&memory&&discount){
//       if(sort == 1){
//         product = await Product.find({brand_id:brand,ram:ram,memory:memory,discount:{$gte:discount}});
//       }
//       else if(sort == 2){
//         product = await Product.find({brand_id:brand,ram:ram,memory:memory,discount:{$gte:discount}}).sort({price: 1});
//       }else if(sort == 3){
//         product = await Product.find({brand_id:brand,ram:ram,memory:memory,discount:{$gte:discount}}).sort({price: -1});
//       }


//     }else if(brand&&ram&&memory){
//       if(sort == 1){
//         product = await Product.find({brand_id:brand,ram:ram,memory:memory});
//       }
//       else if(sort == 2){
//         product = await Product.find({brand_id:brand,ram:ram,memory:memory}).sort({price: 1});
//       }else if(sort == 3){
//         product = await Product.find({brand_id:brand,ram:ram,memory:memory}).sort({price: -1});
//       }


//     }else if(brand&&ram){
//       if(sort == 1){
//         product = await Product.find({brand_id:brand,ram:ram});
//       }
//       else if(sort == 2){
//         product = await Product.find({brand_id:brand,ram:ram}).sort({price: 1});
//       }else if(sort == 3){
//         product = await Product.find({brand_id:brand,ram:ram}).sort({price: -1});
//       }


//     }else if(brand){
//       if(sort == 1){
//         product = await Product.find({brand_id:brand});
//       }
//       else if(sort == 2){
//         product = await Product.find({brand_id:brand}).sort({price: 1});
//       }else if(sort == 3){
//         product = await Product.find({brand_id:brand}).sort({price: -1});
//       }


//     }else if(ram){
//       if(sort == 1){
//         product = await Product.find({ram:ram});
//       }
//       else if(sort == 2){
//         product = await Product.find({ram:ram}).sort({price: 1});
//       }else if(sort == 3){
//         product = await Product.find({ram:ram}).sort({price: -1});
//       }


//     }else if(memory){
//       if(sort == 1){
//         product = await Product.find({memory:memory});
//       }
//       else if(sort == 2){
//         product = await Product.find({memory:memory}).sort({price: 1});
//       }else if(sort == 3){
//         product = await Product.find({memory:memory}).sort({price: -1});
//       }


//     }else if(discount){
//       if(sort == 1){
//         product = await Product.find({discount:{$gte:discount}});
//       }
//       else if(sort == 2){
//         product = await Product.find({discount:{$gte:discount}}).sort({price: 1});
//       }else if(sort == 3){
//         product = await Product.find({discount:{$gte:discount}}).sort({price: -1});
//       }


//     }else if(price){
//       if(sort == 1){
//         product = await Product.find({finalPrice:{$lte:price}});
//       }
//       else if(sort == 2){
//         product = await Product.find({finalPrice:{$lte:price}}).sort({price: 1});
//       }else if(sort == 3){
//         product = await Product.find({finalPrice:{$lte:price}}).sort({price: -1});
//       }


//     }else{
//       product = await Product.find({})
//     }
//      res.send({product}) 
//    }





module.exports = {

   catagorySort,

}