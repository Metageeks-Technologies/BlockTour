
import express from 'express';
import { addBookmark, removeBookmark } from '../../controllers/bookmarkController';

const bookmarkRouter = express.Router();

// Route to add a bookmark
bookmarkRouter.post('/add', addBookmark);

// Route to remove a bookmark
bookmarkRouter.post('/remove', removeBookmark);

export default bookmarkRouter;
