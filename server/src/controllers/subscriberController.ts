import Subscriber from "../models/subscriber/subscriber";
// import Subscriber from "@src/models/subscriber/subscriber";
import {Request, Response} from "express";

// get all subscriber
export const getAllSubscribers = async (req: Request, res: Response) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json({ message: 'Subscriber get successfully', success: true, subscribers });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Unable to retrieve subscriber', details: error.message });
    }
};

// create a subscriber
export const createSubscriber = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const existingSubscriber = await Subscriber.findOne ( {email} );
        if ( existingSubscriber ) {
            return res.status(400).json({ message: 'Subscriber already exists' });
        }
        const newSubscriber = new Subscriber( {email} );
        await newSubscriber.save();
        res.status( 200 ).json( {message: 'Subscriber created successfully', success: true} );
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Unable to create subscriber', details: error.message });
    }
};

// delete a subscriber
export const deleteSubscriber = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const subscriber = await Subscriber.findByIdAndDelete(id);
        if ( subscriber ) {
            res.status(200).json({ message: 'Subscriber deleted successfully', success: true });
        } else {
            res.status(404).json({ success: false, error: 'Subscriber not found' });
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Unable to delete subscriber', details: error.message });
    }
};

// update a subscriber for staus as well

export const updateSubscriber = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const {status} = req.body;
    // console.log( id, status );
    try {
        const subscriber = await Subscriber.findByIdAndUpdate( id, {status}, {new: true} ).exec();
        if ( subscriber ) {
            res.status( 200 ).json( {message: 'Subscriber updated successfully', success: true} );
        }
        else {
            res.status( 404 ).json( {success: false, error: 'Subscriber not found'} );
        }
    }
    catch ( error: any ) {
        console.error( error );
        res.status( 500 ).json( {error: 'Unable to update subscriber', details: error.message} );
    }
};

// get a subscriber by id
export const getSubscriberById = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const subscriber = await Subscriber
            .findById( id )
            .exec();
        if ( subscriber ) {
            res.status( 200 ).json( {message: 'Subscriber get successfully', success: true, subscriber} );
        }
        else {
            res.status( 404 ).json( {success: false, error: 'Subscriber not found'} );
        }
    }
    catch ( error: any ) {
        console.error( error );
        res.status( 500 ).json( {error: 'Unable to retrieve subscriber', details: error.message} );
    }
};


// get a subscriber by email
export const getSubscriberByEmail = async ( req: Request, res: Response ) => {
    const { email } = req.body;
    try {
        const subscriber = await Subscriber
            .findOne( {email} )
            .exec();
        if ( subscriber ) {
            res.status( 200 ).json( {message: 'Subscriber get successfully', success: true, subscriber} );
        }
        else {
            res.status( 404 ).json( {success: false, error: 'Subscriber not found'} );
        }
    }
    catch ( error: any ) {
        console.error( error );
        res.status( 500 ).json( {error: 'Unable to retrieve subscriber', details: error.message} );
    }
};