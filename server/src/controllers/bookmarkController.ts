import {Request, Response} from "express";
import Post from "../models/post/post";
import User from "../models/user/user";
import Podcast from "../models/podcast/podcast";


// add bookmark
// remove bookmark
// add bookmarks 



export const addBookmark = async (req: Request, res: Response) => {
    const { userId, postId, podcastId } = req.body;
    console.log(req.body);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (postId && user.bookmarks?.post) {
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            // Add postId to user's bookmarks if not already present
            if (!user.bookmarks.post.includes(postId)) {
                user.bookmarks.post.push(postId);
                await user.save();
            }

            // Add userId to post's bookmarkedBy if not already present
            if (!post.bookmarkedBy?.includes(userId)) {
                post.bookmarkedBy?.push(userId);
                await post.save();
            }

            return res.status(200).json({ message: "Post bookmark added successfully" });
        }

        if (podcastId && user.bookmarks?.podcast) {
            const podcast = await Podcast.findById(podcastId);
            if (!podcast) {
                return res.status(404).json({ message: "Podcast not found" });
            }

            // Add podcastId to user's bookmarks if not already present
            if (!user.bookmarks.podcast.includes(podcastId)) {
                user.bookmarks.podcast.push(podcastId);
                await user.save();
            }

            // Add userId to podcast's bookmarkedBy if not already present
            if (!podcast.bookmarkedBy?.includes(userId)) {
                podcast.bookmarkedBy?.push(userId);
                await podcast.save();
            }

            return res.status(200).json({ message: "Podcast bookmark added successfully" });
        }

        return res.status(400).json({ message: "Either postId or podcastId must be provided" });
    } catch (error) {
        console.error("Error adding bookmark:", error);
        res.status(500).json({ message: "Internal server error" });
    }
} 

// remove bookmark
export const removeBookmark = async (req: Request, res: Response) => {
    const { userId, postId, podcastId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (postId) {
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            // Remove postId from user's bookmarks
            if (user?.bookmarks && user?.bookmarks?.post) {
                user.bookmarks.post = user.bookmarks.post.filter(id => id.toString() !== postId);
                await user.save();
            }

            // Remove userId from post's bookmarkedBy
            if (post.bookmarkedBy) {
                post.bookmarkedBy = post.bookmarkedBy.filter(id => id.toString() !== userId);
                await post.save();
            }

            return res.status(200).json({ message: "Post bookmark removed successfully" });
        }

        if (podcastId) {
            const podcast = await Podcast.findById(podcastId);
            if (!podcast) {
                return res.status(404).json({ message: "Podcast not found" });
            }

            // Remove podcastId from user's bookmarks
            if (user.bookmarks && user.bookmarks.podcast) {
                user.bookmarks.podcast = user.bookmarks.podcast.filter(id => id !== podcastId);
                await user.save();
            }

            // Remove userId from podcast's bookmarkedBy
            if (podcast.bookmarkedBy) {
                podcast.bookmarkedBy = podcast.bookmarkedBy.filter(id => id.toString() !== userId);
                await podcast.save();
            }

            return res.status(200).json({ message: "Podcast bookmark removed successfully" });
        }

        return res.status(400).json({ message: "Either postId or podcastId must be provided" });
    } catch (error) {
        console.error("Error removing bookmark:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// get bookmarks by ids stored in user.bookmarks.post and user.bookmarks.podcast
