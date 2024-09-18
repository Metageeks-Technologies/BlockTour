import mongoose, { Document, Model } from 'mongoose';

// Define the Notification interface
export interface INotification extends Document {
  sender: string;
  receiver: string;
  message: string;
  read?: boolean;
}

// Define the Notification schema
const notificationSchema = new mongoose.Schema<INotification>({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, {
  timestamps: true,
  versionKey: false
});

// Define the Notification model
const Notification: Model<INotification> = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;
