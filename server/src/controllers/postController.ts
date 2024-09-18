import {Request, Response} from 'express';
import Post from '../models/post/post';
import User from '../models/user/user';
import mongoose, {ObjectId} from 'mongoose';
import Admin from '../models/admin/admin';

// Create a new post for admin

export const createPost = async ( req: Request, res: Response ) => {
  const {title, permaLink, description, publishedDate, visibility, status, category, tags, postSliderImageUrl, postSettingImageUrl, previewImageUrl, authorName, postType,authorId } = req.body;

  // console.log( req.body );
  try {
    if ( !title || !permaLink || !description ) {
      return res.status( 400 ).json( {error: 'Title, permaLink, and description are required'} );
    }

    const newPost = new Post( {
      title,
      permaLink,
      description,
      publishedDate,
      visibility,
      status,
      category,
      tags,
      postSliderImageUrl,
      postSettingImageUrl,
      previewImageUrl,
      authorName,
      authorId,
      postType,
    } );

    const savedPost = await newPost.save();
  // console.log("Author id:-",authorId)
    const creator = await Admin.findById(authorId);
    // console.log( creator ); 
    
    if ( creator ) {
      creator?.posts?.push( newPost?._id as ObjectId );
      await creator.save();
      res.status( 201 ).json( {message: 'Post created successfully', savedPost} );
    } else {
      res.status( 404 ).json( {error: 'User not found'} );
    }
  } catch ( error: any ) {
    console.error( error );
    res.status( 500 ).json( {error: 'Unable to create post', details: error.message} );
  }
}; 

// Get all posts 
export const getAllPosts = async ( req: Request, res: Response ) => {
  try {
    const posts = await Post.find(); 

    res.status( 200 ).json( {message: 'Posts retrieved successfully', posts} );
  } catch ( error: any ) {
    console.error( error );
    res.status( 500 ).json( {error: 'Unable to retrieve posts', details: error.message} );
  }
};

// Get a single post by ID
export const getPostById = async ( req: Request, res: Response ) => {
  const {id} = req.params; 
  try {
    const post = await Post.findById( id );
    if ( post ) {
      res.status( 200 ).json( {message: 'Post retrieved successfully', success: true, post} );
    } else {
      res.status( 404 ).json( {success: false, error: 'Post not found'} );
    }
  } catch ( error: any ) {
    console.error( error );
    res.status( 500 ).json( {error: 'Unable to retrieve post', details: error.message} );
  }
};

// Update a post by ID
export const updatePost = async ( req: Request, res: Response ) => {
  const {id} = req.params;
  const {title, permaLink, description, publishedDate, visibility, status, category, tags, postSliderImageUrl, postSettingImageUrl, previewImageUrl, authorName, authorId, postType} = req.body; 
  // console.log("id:-",id,"req.body:-",req.body)
  try {
    const post = await Post.findByIdAndUpdate( id, req.body, {new: true} ); 
    if ( post ) {
      res.status( 200 ).json( {message: 'Post updated successfully', success: true, post} );
    } else {
      res.status( 404 ).json( {success: false, error: 'Post not found'} );
    }
  } catch ( error: any ) {
    console.error( error );
    res.status( 500 ).json( {error: 'Unable to update post', details: error.message} );
  }
};

// Delete a post by ID
export const deletePost = async ( req: Request, res: Response ) => {
  const {id} = req.params;
  try {
    const post = await Post.findByIdAndDelete( id );
    if ( post ) {
      res.status( 200 ).json( {message: 'Post deleted successfully', success: true, post} );
    } else {
      res.status( 404 ).json( {success: false, error: 'Post not found'} );
    }
  } catch ( error: any ) {
    console.error( error );
    res.status( 500 ).json( {error: 'Unable to delete post', details: error.message} );
  }
};

// Get posts by category
export const getPostsByCategory = async ( req: Request, res: Response ) => {
  const {category} = req.params;
  try {
    const posts = await Post.find( {category} );
    res.status( 200 ).json( {message: 'Post Deleted successfully', success: true, posts} );
  } catch ( error: any ) {
    console.error( error );
    res.status( 500 ).json( {error: 'Unable to retrieve posts by category', details: error.message} );
  }
};

// get posts by array of their ids

export const getPostsByIds = async (req: Request, res: Response) => {
  const { ids, page = 1, limit = 10 } = req.body;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find({ _id: { $in: ids } })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments({ _id: { $in: ids } });

    res.status(200).json({
      message: 'Posts retrieved successfully',
      success: true,
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: 'Unable to retrieve posts',
      details: error.message,
    });
  }
};

//  post by contributor
export const contributorCreatePost = async ( req: Request, res: Response ) => {
  const {
    title, permaLink, description, publishedDate, visibility, status, category,
    tags, postSliderImageUrl, postSettingImageUrl, previewImageUrl, authorName, postType, creatorId 
  } = req.body;

  // console.log( req.body );
  
  try {
    if (!title || !permaLink || !description) {
      return res.status(400).json({ error: 'Title, permaLink, and description are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ error: 'Invalid creator ID' });
    }
    const creator = await User.findById(new mongoose.Types.ObjectId(creatorId));

    if (!creator) {
      return res.status(404).json({ error: 'User not found' });
    }
    // console.log(creator);


    // if creator.contributor is not true, than he can't crate the post
    if (!creator.contributor) {
      return res.status(403).json({ error: 'User is not a contributor' });
    }


    const newPost = new Post({
      title,
      permaLink,
      description,
      publishedDate,
      visibility,
      status,
      category,
      tags,
      postSliderImageUrl,
      postSettingImageUrl,
      previewImageUrl,
      authorName,
      creatorId,
      postType,
    });

    const savedPost = await newPost.save();
      // console.log("creatorId id:-", creatorId);


    if (creator) {
      creator?.posts?.push(newPost._id as mongoose.Schema.Types.ObjectId);
      await creator.save();
      res.status(201).json({ message: 'Post created successfully', savedPost });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create post', details: error.message });
  }
};





