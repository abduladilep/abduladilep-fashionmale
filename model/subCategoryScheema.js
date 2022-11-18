
const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    subcategory: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    Categoryes: {
        type: String,
        trim: true

    },
});
subcategorySchema.plugin(validator);

const subCategory = mongoose.model("subCategory", subcategorySchema);



module.exports =  subCategory;