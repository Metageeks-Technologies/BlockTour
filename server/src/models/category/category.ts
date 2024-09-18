import mongoose, {Schema} from "mongoose";

interface ICategory extends Document{
    name: string;
    slug: string;
    description: string;
}

const CategorySchema: Schema = new Schema( {
    name: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String, required: true},
},
    {
        versionKey: false,
        timestamps: true
    } );

const Category = mongoose.model<ICategory>( 'Category', CategorySchema );

export default Category;