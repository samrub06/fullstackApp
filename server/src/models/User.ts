import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  picture: {
    thumbnail: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  gender: string;
  country: string;
  phone: string;
  email: string;

}

const UserSchema: Schema = new Schema({
  picture: {
    thumbnail: { type: String, required: true }
  },
  name: {
    title: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>('User', UserSchema); 