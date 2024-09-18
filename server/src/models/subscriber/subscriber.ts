
import mongoose, { Schema, Document } from 'mongoose';

// Define the Subscriber interface
interface ISubscriber extends Document { 
    email: string;
    status: string;
}

// Create the Subscriber schema
const SubscriberSchema: Schema = new Schema({
    email: {type: String, required: true}, 
    status: {type: String, required: true, default: 'active'},
  createdAt: {type: Date, default: Date.now}, 
},
  {
    versionKey: false,
});


// Create the User model
const Subscriber = mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;