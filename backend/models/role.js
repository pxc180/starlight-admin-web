import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
  roleName: String,
  createTime: String,
  createBy: String,
  updateTime: String,
  updateBy: String
});

export default model('Role', roleSchema);
