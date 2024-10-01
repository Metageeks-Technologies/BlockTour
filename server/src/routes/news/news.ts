
import express from 'express';
import {
    createNews,
    getAllNews,
    getNewsById,
    updateNewsById,
    deleteNewsById
} from '../../controllers/newsController';

const newsRouter = express.Router();

// Create a new news item
newsRouter.post('/', createNews);

// Get all news items
newsRouter.get('/', getAllNews);

// Get a specific news item by ID
newsRouter.get('/:id', getNewsById);

// Update a news item by ID
newsRouter.put('/:id', updateNewsById);

// Delete a news item by ID 
newsRouter.delete( '/:id', deleteNewsById );

export default newsRouter;
