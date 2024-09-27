import express from 'express';
import {adminLogout, currentAdmin, getAdminById, getAllAdmins, login, signup, updateAdmin} from '../../controllers/adminController';
import {verifyTokenAdmin} from '../../middleware/auth.admin';

const router = express.Router();

// Register admin
router.post( '/signup', signup );
router.post( '/login', login );
router.get( '/getCurrAdmin', verifyTokenAdmin, currentAdmin );
router.get( '/logout',  adminLogout ); 
router.put( '/:id', verifyTokenAdmin, updateAdmin );
router.get( '/get-admin/:id', getAdminById ); 
router.get( '/get-all-admins', getAllAdmins ); 

export default router;  
