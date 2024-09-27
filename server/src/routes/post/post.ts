import { Router } from 'express';
import {  getAllPosts, getPostById, updatePost, deletePost, createPost, getPostsByIds, contributorCreatePost, getPostByPermaLink} from '../../controllers/postController'; 
import authAdmin from "../../middleware/auth.admin"
import authContributor from '../../middleware/authContributor';
const postRouter = Router();
    
// this routes for admin
postRouter.post('/posts', createPost);
postRouter.get('/all-posts', getAllPosts);
postRouter.get('/post/:id',getPostById);
postRouter.put('/post/:id',updatePost);
postRouter.delete( '/post/:id', deletePost );
postRouter.post( "/postForCreator", getPostsByIds )
postRouter.get('/posts/:permaLink', getPostByPermaLink);

// this routes for contributor
  
postRouter.post( '/contributor/posts', contributorCreatePost );
postRouter.get('/contributor/post/:id', getPostById);
postRouter.put('/contributor/post/:id',updatePost);
postRouter.delete( '/contributor/post/:id', deletePost );
postRouter.post( "/contributor/postForCreator", getPostsByIds )



// postRouter.get('/posts/category/:category',authAdmin,getPostsByCategory);

export default postRouter;
