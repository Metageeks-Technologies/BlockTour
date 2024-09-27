import express from 'express';
import {currentUser, userLogin, userLogout, userSignup, getAllUsers,getUserById, updateUserContributor} from '../../controllers/userController';
import {verifyToken} from '../../middleware/authToken';

const userRouter = express.Router();

// Register user
userRouter.post( '/signup',userSignup  );
userRouter.post( '/login', userLogin );
userRouter.get( '/getCurrUser', verifyToken, currentUser );
userRouter.get( '/logout', userLogout ); 
userRouter.get( '/', getAllUsers );
userRouter.get( '/:id', getUserById ); 
userRouter.put( '/:id', updateUserContributor );

export default userRouter;