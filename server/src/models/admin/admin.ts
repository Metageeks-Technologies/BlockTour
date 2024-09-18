import mongoose, {Document, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IAdmin extends Document {
  email: string;
  password: string;
  name: string;
  posts?: [type: Schema.Types.ObjectId];
  profileImage?: string;
  bio?: string;
}

const AdminSchema: Schema = new Schema( {
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  posts: {
    type: [{type: Schema.Types.ObjectId, ref: 'Post'}]
  },
  profileImage: {
    type: String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHBp3gsQdFjO_r7zsVr0d-gs8n86rXGbmp3w&s" 
  },
  bio: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false

} );

// Hash the password before saving the admin
AdminSchema.pre<IAdmin>( 'save', async function ( next ) {
  if ( !this.isModified( 'password' ) ) {
    return next();
  }
  const salt = await bcrypt.genSalt( 10 );
  this.password = await bcrypt.hash( this.password, salt );
  next();
} );

const Admin = mongoose.model<IAdmin>( 'Admin', AdminSchema );
export default Admin;