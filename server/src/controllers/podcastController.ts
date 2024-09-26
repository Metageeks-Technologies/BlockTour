
import mongoose from 'mongoose';
import Podcast from '../models/podcast/podcast';
import { Request, Response } from 'express';

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
}
// Create a new podcast
export const createPodcast = async (req: Request, res: Response) => {
  try {
    const podcastData: IPodcast = req.body;
    const newPodcast = new Podcast(podcastData);
    const savedPodcast = await newPodcast.save();
      res.status( 201 ).json( {message:"New pod cast created successfully",savedPodcast} );
  } catch (error) {
    res.status(400).json({ message: 'Error creating podcast', error });
  }
};

// Get all podcasts
export const getAllPodcasts = async (req: Request, res: Response) => {
  try {
    const podcasts = await Podcast.find();
      res.status( 200 ).json(
      { message: 'Podcasts retrieved successfully', success: true, podcasts:podcasts }
    );
  } catch (error) {
    res.status(400).json({ message: 'Error fetching podcasts', error });
  }
};

// Get a single podcast by ID
export const getPodcastById = async (req: Request, res: Response) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    res.status(200).json(podcast);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching podcast', error });
  }
};

export const getPodcastByPermaLink = async (req: Request, res: Response) => {
  const { permaLink } = req.params;
  try {
    // First, try to find an exact match
    let podcast = await Podcast.findOne({ permaLink });

    // If no exact match is found, search for similar permalinks
    if (!podcast) {
      const regex = new RegExp(permaLink, 'i'); // 'i' flag for case-insensitive search
      const similarPodcasts = await Podcast.find({ permaLink: regex }).limit(5);

      if (similarPodcasts.length > 0) {
        return res.status(200).json({
          message: 'Similar podcasts found',
          success: true,
          podcast: similarPodcasts,
        });
      }
    }

    if ( podcast ) {
      res.status( 200 ).json( {message: 'Podcast retrieved successfully', success: true, podcast: podcast} );
    } else {
      res.status(404).json({ success: false, error: 'No posts found with similar permalinks' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Unable to retrieve post', details: error.message });
  }
};

// Update a podcast
export const updatePodcast = async ( req: Request, res: Response ) => {
  try {
    const updatedPodcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPodcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    res.status(200).json(updatedPodcast);
  } catch (error) {
    res.status(400).json({ message: 'Error updating podcast', error });
  }
};

// Delete a podcast
export const deletePodcast = async (req: Request, res: Response) => {
  try {
    const deletedPodcast = await Podcast.findByIdAndDelete(req.params.id);
    if (!deletedPodcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    res.status(200).json({ message: 'Podcast deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting podcast', error });
  }
};