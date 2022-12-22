import { Schema, model } from 'mongoose';
import dayjs from 'dayjs';

const userSchema = new Schema(
  {
    userName: { type: String, unique: true },
    realName: String,
    password: { type: String, default: '123456' },
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
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
      currentTime: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  }
);

export default model('User', userSchema);
