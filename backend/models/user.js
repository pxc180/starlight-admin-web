import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userName: String,
  createTime: String,
  createBy: String,
  updateTime: String,
  updateBy: String,
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
    default: ''
  }
});

export default model('User', userSchema);
