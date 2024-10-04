import {Request, Response} from "express";
import News from "../models/news/news";

// create news controller
export const createNews = async ( req: Request, res: Response ) => {
    const {title, description, icon} = req.body;
    try {
        const news = await News.create( {title, description, icon} );
        res.status( 201 ).json( {message: "News created successfully", news: news} );
    } catch ( error ) {
        res.status( 500 ).json( {message: "News created failed", error: error} );
    }
};

// get all news controller
export const getAllNews = async ( req: Request, res: Response ) => {
    try {
        const news = await News.find();
        res.status( 200 ).json( {message: "News fetched successfully", news: news} );
    } catch ( error ) {
        res.status( 500 ).json( {message: "News fetched failed", error: error} );
    }
};

// get news by id controller
export const getNewsById = async ( req: Request, res: Response ) => {
    try {
        const news = await News.findById( req.params.id );
        res.status( 200 ).json( {message: "News fetched successfully", news: news} );
    } catch ( error ) {
        res.status( 500 ).json( {message: "News fetched failed", error: error} );
    }
}

// update news by id controller
export const updateNewsById = async ( req: Request, res: Response ) => {
    try {
        const news = await News.findByIdAndUpdate( req.params.id, req.body );
        res.status( 200 ).json( {message: "News updated successfully", news: news} );
    } catch ( error ) {
        res.status( 500 ).json( {message: "News updated failed", error: error} );
    }   
}

// delete news by id controller
export const deleteNewsById = async ( req: Request, res: Response ) => {
    try {
        await News.findByIdAndDelete( req.params.id );
        res.status( 200 ).json( {message: "News deleted successfully"} );
    } catch ( error ) {
        res.status( 500 ).json( {message: "News deleted failed", error: error} );
    }
}


