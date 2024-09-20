

import {createNotification, deleteNotification, getAllNotifications, getNotificationsByIds, getNotificationsByReceiver, updateNotification} from '../../controllers/notificationController';
import express from 'express';

const notificationRouter = express.Router(); 

notificationRouter.get( '/all', getAllNotifications );
notificationRouter.post( '/create-notification', createNotification );
notificationRouter.put( '/update-notification', updateNotification );
notificationRouter.delete( '/delete-notification', deleteNotification );
notificationRouter.get( '/get-receiver-notifications/:receiver', getNotificationsByReceiver ) 
notificationRouter.post('/my-all-notification',getNotificationsByIds)

export default notificationRouter;