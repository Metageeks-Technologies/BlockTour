import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin/admin';

// Signup controller
export const signup = async (req: Request, res: Response) => {
  const { email, password,name } = req.body; 
  try {
    // clg 
    const existingAdmin = await Admin.findOne( {email} );
    console.log("exixsting:-",existingAdmin)
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    } 
    const newAdmin = new Admin({ email, password,name}); 
    console.log(newAdmin) 
    await newAdmin.save(); 
    res.status(200).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error',error });
  }
};

// Login controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne
      ( {email} );
    
    if ( !admin ) {
      console.log("admin not found")
      return res.status(401).json({ message: 'Invalid email or password admin not found' });
    }
    const isValidPassword = await bcrypt.compare( password, admin.password );
    if ( !isValidPassword ) {
      return res.status( 401 ).json( {message: 'Invalid email or password'} );
    } 
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY as string,{expiresIn:'7d'});

    // res.cookie( 'Token', token );
    res.status( 200 ).json( {message: 'Logged in successfully', token: token} );
  } catch ( error ) {
    res.status( 500 ).json( {message: 'Server error'} );
  }
}

 
//current logged admin with token stored in cookies
export const currentAdmin = async (req: any, res: Response) => {
  const { id } = req.user as { id: string }; 
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Logout controller
export const adminLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('Token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//update admin
export const updateAdmin = async (req: Request, res: Response) => {
  const {id} = req.params;

  const {name, email, newPassword,profileImage,bio} = req.body;
  try { 
    const admin = await Admin.findById( id );
    if ( !admin ) {
      return res.status( 404 ).json( {message: 'Admin not found'} );
    }
    if ( newPassword ) {
      const hashedPassword = await bcrypt.hash( newPassword, 10 );
      admin.password = hashedPassword;
    }
    if ( name ) {
      admin.name = name;
    }
    if ( email ) {
      admin.email = email
    }
    if ( profileImage ) {
      admin.profileImage = profileImage
    } 
    if ( bio ) {
      admin.bio = bio
    }
    await admin.save();
    res.status( 200 ).json( {message: 'Admin updated successfully'} );
   
  } catch ( error ) {
    res.status( 500 ).json( {message: 'Server error'} );
  }
}

// admin by id
export const getAdminById = async ( req: Request, res: Response ) => {
  const { id } = req.params;
  try {
    const
      admin = await Admin.findById( id );
    if ( !admin ) {
      return res.status( 404 ).json( {message: 'Admin not found'} );
    }
    res.status( 200 ).json( {admin} );
  } catch ( error ) { 
    res.status( 500 ).json( {message: 'Server error'} );
  }
};

// all admins only admin
export const getAllAdmins = async ( req: Request, res: Response ) => {
  try {
    const admins = await Admin.find( {role: 'admin'} );
    res.status( 200 ).json( {admins} );
  } catch ( error ) {
    res.status( 500 ).json( {message: 'Server error'} );
  }
}
  


