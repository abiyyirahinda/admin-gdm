import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    // productPrice: { type: Number, required: true },
    productCategory: { type: String, required: true },
    // productSize: { type: String, required: true },
    productVariants: {type: Array, required: true},
    productDescription: { type: String, required: true },
    images: { type: Array, required: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;