import { Schema, model } from 'mongoose';
import { Category } from '../interface/category';

const categorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true
    }, 
},{
    timestamps: true
});

const CategoryModel = model<Category>('Category', categorySchema);

export default CategoryModel;
