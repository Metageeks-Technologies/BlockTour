import Notification ,{INotification} from "../models/notification/notification";
import { Request, Response } from "express";

// Create a notification
export const createNotification = async (req: Request, res: Response) => {
    const { sender, receiver, message } = req.body as { sender: string, receiver: string, message: string };

    try {
        const newNotification: INotification = new Notification({ sender, receiver, message });
        const savedNotification = await newNotification.save();

        res.status(200).json({ message: 'Notification created successfully', savedNotification });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Unable to create notification', details: error.message });
    }
};

// Get all notifications
export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find();

        res.status( 200 ).json( {message: 'Notifications retrieved successfully', notifications} );   
    } catch ( error: any ) {
        console.error( error );
        res.status( 500 ).json( {error: 'Unable to retrieve notifications', details: error.message} );
    }
};

// Get notifications by receiver
export const getNotificationsByReceiver = async (req: Request, res: Response) => {
    const {receiver} = req.params; 
    try {
        const notifications = await Notification.find( {receiver} ); 
        res.status( 200 ).json( {message: 'Notifications retrieved successfully', notifications} );
    } catch ( error: any ) {
        console.error( error );
        res.status( 500 ).json( {error: 'Unable to retrieve notifications', details: error.message} );
    }
};

// Update a notification
export const updateNotification = async ( req: Request, res: Response ) => {
    const {id} = req.params;
    const {read} = req.body;

    try {
        const notification = await Notification.findByIdAndUpdate( id, {read}, {new: true} ).exec();

        res.status( 200 ).json( {message: 'Notification updated successfully', notification} );
    } catch ( error: any ) {
        console.error( error );
        res.status( 500 ).json( {error: 'Unable to update notification', details: error.message} );
    }
};

// Delete a notification
export const deleteNotification = async ( req: Request, res: Response ) => {
    const {id} = req.params;

    try {
        const notification = await Notification.findByIdAndDelete( id ).exec();

        res.status( 200 ).json( {message: 'Notification deleted successfully', notification} );
    } catch ( error: any ) {
        console.error( error );
        res.status( 500 ).json( {error: 'Unable to delete notification', details: error.message} );
    }
};

