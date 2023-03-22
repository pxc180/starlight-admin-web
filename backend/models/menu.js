import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import dayjs from 'dayjs';

const menuSchema = new Schema(
  {
    parentId: String, // 父Id
    name: String, // 菜单标题
    url: { type: String, unique: true }, // 菜单路径
    component: String, // 页面组件
    hide: Number, // 是否隐藏
    redirect: String, // 跳转地址
    sortNo: Number, // 排序
    icon: String, // 菜单图标
    keepAlive: Number, // 是否缓存页面
    createTime: String,
    createBy: String,
    updateTime: String,
    updateBy: String,
    delFlag: Number // 删除状态 0正常 1已删除
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

menuSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

export default model('Menu', menuSchema);
