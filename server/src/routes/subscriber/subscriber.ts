
import {createSubscriber, deleteSubscriber, getAllSubscribers, updateSubscriber} from '../../controllers/subscriberController';
import express from 'express';

const subscriberRouter = express.Router();

subscriberRouter.get( '/subscribers', getAllSubscribers );
subscriberRouter.post( '/subscribers', createSubscriber );
subscriberRouter.put( '/subscribers/:id', updateSubscriber );
subscriberRouter.delete( '/subscribers/:id', deleteSubscriber );

export default subscriberRouter;