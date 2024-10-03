import express from 'express';
import { addLike, removeLike } from '../../controllers/likeController';

const likeRouter = express.Router();

// Route to add a like
likeRouter.post('/add', addLike);

// Route to remove a like
likeRouter.post('/remove', removeLike);

export default likeRouter;
