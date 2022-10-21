import userController from '../controllers/userController.js';
import userSchema from '../docs/users.js';

const APIPATH = '/api/';
const VERSION = 'v1';
const ENDPOINT = '/user';

const getFullPath = (method = '') => `${APIPATH}${VERSION}${ENDPOINT}${method}`;

const routes = [
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

export default routes;
