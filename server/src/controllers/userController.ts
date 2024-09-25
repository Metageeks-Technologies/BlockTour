// login user
// register user
// get current user
// logout user
// get all users
// get user by id
// update user
// delete user



// import User from "@src/models/user/user";
import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user/user";


// Signup controller
export const userSignup = async (req: Request, res: Response) => {
  const { email,password,name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ email, password,name});
    // console.log(newUser)
    await newUser.save();
    res.status(200).json({ message: 'User created successfully',user:newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};  

// // Login controller
export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // // console.log("user",user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY as string,{expiresIn:'7h'});

    res.status(200).json({ token,msg:"logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server error',error });
  }
};

// //current logged admin with token stored in cookies

export const currentUser = async (req: Request, res: Response) => {
  try {
    // Get the token from cookies

    const token = req.cookies.UserToken;

    // If no token is found, return an error
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify and decode the token using your secret key
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`) as { id: string };
    // Find the user by the ID stored in the token
    const user = await User.findById(decoded.id);
    // If no user is found, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Send back the user information
    res.status(200).json({ currentUser: user });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server error', error });
  }
};


// // Logout controller
export const userLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('Token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// // get all users
export const getAllUsers = async ( req: Request, res: Response ) => {
    try {
        const users = await User.find();
        res.status( 200 ).json( { users } );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Server error" } );
    }
}

// // get user by id
export const getUserById = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const
            user = await User.findById( id );
        if ( !user ) {
            return res.status( 404 ).json( {message: "User not found"} );
        }
        res.status( 200 ).json( {user} );
    } catch ( error ) { 
        res.status( 500 ).json( {message: "Server error"} );
    }
};

// update the user's contributor 
export const updateUserContributor = async ( req: Request, res: Response ) => {
    const { id } = req.params;
  const {isContributor, profileImage, newpassword, bio} = req.body;
    try {
        const user = await User.findById( id );
        if ( !user ) {
            return res.status( 404 ).json( {message: "User not found"} );
      }
      // console.log( "user:-", user )
      if ( newpassword ) {
        const hashedPassword = await bcrypt.hash( newpassword, 10 );
        user.password = hashedPassword; 
      }
      if ( profileImage ) {
        user.profileImage = profileImage;
      }

      if ( bio ) {
        user.bio = bio;
      }
      if ( isContributor === false || isContributor === true ) {
        user.contributor = isContributor as boolean; 
      }
        await user.save();
        res.status( 200 ).json( {user,msg:"user updated successfully"} );
    } catch ( error ) {
        res.status( 500 ).json( {message: "Server error"} );
    }
}



    