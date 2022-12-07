import { Schema, model } from 'mongoose';
import dayjs from 'dayjs';

const roleSchema = new Schema(
  {
    roleName: String,
    roleCode: { type: String, unique: true },
    description: String,
    createTime: String,
    createBy: String,
    updateTime: String,
    updateBy: String,
    menuIds: [String]
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

export default model('Role', roleSchema);
