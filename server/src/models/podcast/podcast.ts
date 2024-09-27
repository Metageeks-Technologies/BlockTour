
import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPodcast extends Document {
    title: string;
    permaLink: string;
    embededCode: string;
    publishedDate?: Date; 
    visibility?: string; 
    status: string;
    category?: string[]; 
    tags?: string[]; 
    authorId?: mongoose.Schema.Types.ObjectId;
    authorName?: string;
    creatorId?: mongoose.Schema.Types.ObjectId;
    postType?: string; 
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the schema
const PodcastSchema: Schema = new Schema({
    title: { type: String, required: true },
    permaLink: { type: String },
    embededCode: { type: String, required: true },
    publishedDate: { type: Date },
    visibility: { type: String },
    status: { type: String, default: "Draft" },
    category: { type: [String], required: false },
    tags: { type: [String] }, 
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'admin'},
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    authorName: { type: String },
    postType: {type: String}, 
}, {
    timestamps: true,
    versionKey: false 
});

// Create a model
const Podcast: Model<IPodcast> = mongoose.model<IPodcast>('Podcast', PodcastSchema);

export default Podcast;
