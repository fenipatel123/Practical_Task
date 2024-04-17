import mongoose, { Schema, Model } from 'mongoose';
import { Product } from '../interface/products';

const productSchema = new Schema<Product>({
    name: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
    },
}, {
    timestamps: true
});

const ProductModel: Model<Product> = mongoose.model<Product>('Product', productSchema);

export default ProductModel;