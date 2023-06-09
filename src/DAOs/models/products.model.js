import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const ProductsSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: false
    }
}, { versionKey: false });

ProductsSchema.plugin(mongoosePaginate);
export const productsModel = mongoose.model(collection, ProductsSchema);
