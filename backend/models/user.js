import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userName: String,
  createTime: String,
  createBy: String,
  updateTime: String,
  updateBy: String
});

export default model('User', userSchema);
