import userSchema from '../../docs/user.js';
import userController from '../../controllers/userController.js';
import { getFullPath } from '../config.js';

const userRoutes = [
  {
    method: 'GET',
    url: getFullPath('/user/queryList'),
    schema: {
      ...userSchema.list
    },
    handler: userController.getList
  },
  {
    method: 'GET',
    url: getFullPath('/user/queryById'),
    schema: {
      ...userSchema.detail
    },
    handler: userController.get
  },
  {
    method: 'POST',
    url: getFullPath('/user/add'),
    schema: {
      ...userSchema.add
    },
    handler: userController.add
  },
  {
    method: 'PUT',
    url: getFullPath('/user/edit'),
    schema: {
      ...userSchema.update
    },
    handler: userController.update
  },
  {
    method: 'DELETE',
    url: getFullPath('/user/deleteById'),
    schema: {
      ...userSchema.delete
    },
    handler: userController.deleteUser
  }
];

export default userRoutes;
