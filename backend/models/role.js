import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import dayjs from 'dayjs';

const roleSchema = new Schema(
  {
    roleName: { type: String, required: true },
    roleCode: { type: String, required: true, unique: true },
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

roleSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

export default model('Role', roleSchema);
