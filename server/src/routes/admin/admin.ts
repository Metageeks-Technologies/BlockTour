import express from 'express';
import {adminLogout, currentAdmin, login, signup, updateAdmin} from '../../controllers/adminController';
import authAdmin from '../../middleware/auth.admin';

const router = express.Router();

// Register admin
router.post( '/signup', signup );
router.post( '/login', login );
router.get( '/getCurrAdmin', authAdmin, currentAdmin );
router.get( '/logout',  adminLogout ); 
router.put( '/:id',authAdmin, updateAdmin );

export default router;  
