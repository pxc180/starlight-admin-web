import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userName: String
});

export default model('User', userSchema);
