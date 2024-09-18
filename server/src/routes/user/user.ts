import express from 'express';
import authAdmin from '../../middleware/auth.admin';
import {currentUser, userLogin, userLogout, userSignup, getAllUsers,getUserById, updateUserContributor} from '../../controllers/userController';

const userRouter = express.Router();

// Register user
userRouter.post( '/signup',userSignup  );
userRouter.post( '/login', userLogin );
userRouter.get( '/getCurrUser', currentUser );
userRouter.get( '/logout', userLogout ); 
userRouter.get( '/', getAllUsers );
userRouter.get( '/:id', getUserById ); 
userRouter.put( '/:id', updateUserContributor );

export default userRouter;