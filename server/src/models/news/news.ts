import mongoose, {Model, Schema} from "mongoose";

// interface for news
interface INews {
    title: string;
    description: string;
    icon: string; 
 }


//  create news model
const newsSchema = new Schema<INews>( {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,   
    versionKey: false,
} );

const News: Model<INews> = mongoose.model<INews>( "News", newsSchema );

export default News;

