const mongoose = require('mongoose');
const Post = require('./models/post'); // Ensure the correct path
const readingTime = require('reading-time');

const dotenv = require('dotenv')
dotenv.config();

const mongoUrl = process.env.MONGO_URL
const dbName = process.env.DB_NAME

// Connect to MongoDB
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    updateReadingTimeForAllPosts(); // Update reading time after connection
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

async function updateReadingTimeForAllPosts() {
    try {
        const posts = await Post.find();
        // console.log("posts:-",posts)
        if (!posts || posts.length === 0) {
            console.log('No posts found');
            return;
        }
 
        for ( const post of posts ) {
            // save time in minutes
            const stats = readingTime(post.description);
            post.readingTime = Math.ceil( stats.time / 60000 );
            await post.save();
        }
        console.log('Reading time updated for all posts');
    } catch (error) {
        console.error('Error updating reading time for posts:', error);
    }
}
