import userSchema from '../../docs/users.js';
import userController from '../../controllers/userController.js';
import { getFullPath } from '../config.js';

const userRoutes = [
  {
    method: 'GET',
    url: getFullPath('/queryList'),
    schema: {
      ...userSchema.list
    },
    handler: userController.getList
  },
  {
    method: 'GET',
    url: getFullPath('/queryById'),
    schema: {
      ...userSchema.detail
    },
    handler: userController.get
  },
  {
    method: 'POST',
    url: getFullPath('/add'),
    schema: {
      ...userSchema.add
    },
    handler: userController.add
  },
  {
    method: 'PUT',
    url: getFullPath('/edit'),
    schema: {
      ...userSchema.update
    },
    handler: userController.update
  },
  {
    method: 'DELETE',
    url: getFullPath('/deleteById'),
    schema: {
      ...userSchema.delete
    },
    handler: userController.deleteUser
  }
];

export default userRoutes;
