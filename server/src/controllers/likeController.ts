
import { Request, Response } from "express";
import Post from "../models/post/post";
import User from "../models/user/user";
import Podcast from "../models/podcast/podcast";

export const addLike = async (req: Request, res: Response) => {
    const { userId, postId, podcastId } = req.body;
    console.log(req.body);

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

            // Add userId to post's likes if not already present
            if (!post.likes?.includes(userId)) {
                post.likes?.push(userId);
                await post.save();
            }

            return res.status(200).json({ message: "Post like added successfully" });
        }

        if (podcastId) {
            const podcast = await Podcast.findById(podcastId);
            if (!podcast) {
                return res.status(404).json({ message: "Podcast not found" });
            }

            // Add userId to podcast's likes if not already present
            if (!podcast.likes?.includes(userId)) {
                podcast.likes?.push(userId);
                await podcast.save();
            }

            return res.status(200).json({ message: "Podcast like added successfully" });
        }

        return res.status(400).json({ message: "Either postId or podcastId must be provided" });
    } catch (error) {
        console.error("Error adding like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeLike = async (req: Request, res: Response) => {
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

            // Remove userId from post's likes
            if (post.likes) {
                post.likes = post.likes.filter(id => id.toString() !== userId);
                await post.save();
            }

            return res.status(200).json({ message: "Post like removed successfully" });
        }

        if (podcastId) {
            const podcast = await Podcast.findById(podcastId);
            if (!podcast) {
                return res.status(404).json({ message: "Podcast not found" });
            }

            // Remove userId from podcast's likes
            if (podcast.likes) {
                podcast.likes = podcast.likes.filter(id => id.toString() !== userId);
                await podcast.save();
            }

            return res.status(200).json({ message: "Podcast like removed successfully" });
        }

        return res.status(400).json({ message: "Either postId or podcastId must be provided" });
    } catch (error) {
        console.error("Error removing like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

