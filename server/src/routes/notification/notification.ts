

import {createNotification, deleteNotification, getAllNotifications, getNotificationsByReceiver, updateNotification} from '../../controllers/notificationController';
import express from 'express';

const notificationRouter = express.Router(); 

notificationRouter.get( '/all', getAllNotifications );
notificationRouter.post( '/create-notification', createNotification );
notificationRouter.put( '/update-notification', updateNotification );
notificationRouter.delete( '/delete-notification', deleteNotification );
notificationRouter.get( '/get-receiver-notifications/:receiver', getNotificationsByReceiver ) 

export default notificationRouter;