import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPost extends Document {
    title: string;
    permaLink: string;
    description: string;
    publishedDate?: Date; 
    visibility?: string; 
    status: string;
    category?: string[]; 
    tags?: string[]; 
    postSliderImageUrl?: string[]; 
    postSettingImageUrl?: string; 
    previewImageUrl?: string; 
    authorId?: mongoose.Schema.Types.ObjectId;
    authorName?: string;
    creatorId?: mongoose.Schema.Types.ObjectId;
    postType?: string; 
    views?: number; 
    bookmarkedBy?: mongoose.Schema.Types.ObjectId[];
    readingTime?: number;
}

// Define the schema
const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    permaLink: { type: String },
    description: { type: String, required: true },
    publishedDate: { type: Date },
    visibility: { type: String },
    status: { type: String, default: "Draft" },
    category: { type: [String], required: false },
    tags: { type: [String] }, 
    postSliderImageUrl: [{ type: String }],
    postSettingImageUrl: {type: String}, 
    previewImageUrl: { type: String },
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'admin'},
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    authorName: { type: String },
    postType: {type: String}, 
    views: {type: Number, default: 0},
    bookmarkedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    readingTime: {type: Number, default: 0},
}, {
    timestamps: true,
    versionKey: false 
});

PostSchema.index({ title: 'text', description: 'text', tags: 'text', category: 'text' });

// Create a model
const Post: Model<IPost> = mongoose.model<IPost>('Post', PostSchema);

export default Post;
