const mongoose = require( 'mongoose' )
const { Schema } = mongoose;

// Define the schema
const PostSchema = new Schema( {
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
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    
}, {
    timestamps: true,
    versionKey: false 
} );

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

