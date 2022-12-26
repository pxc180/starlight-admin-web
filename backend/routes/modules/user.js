import userSchema from '../../docs/user.js';
import userController from '../../controllers/userController.js';
import { getFullPath } from '../config.js';
import fastify from '../../fastify.js';

const userRoutes = [
  {
    method: 'GET',
    url: getFullPath('/user/queryList'),
    schema: {
      ...userSchema.list
    },
    onRequest: [fastify.authenticate],
    handler: userController.getList
  },
  {
    method: 'GET',
    url: getFullPath('/user/queryByRoleId'),
    schema: {
      ...userSchema.queryByRoleId
    },
    onRequest: [fastify.authenticate],
    handler: userController.queryByRoleId
  },
  {
    method: 'GET',
    url: getFullPath('/user/queryById'),
    schema: {
      ...userSchema.detail
    },
    onRequest: [fastify.authenticate],
    handler: userController.get
  },
  {
    method: 'POST',
    url: getFullPath('/user/add'),
    schema: {
      ...userSchema.add
    },
    onRequest: [fastify.authenticate],
    handler: userController.add
  },
  {
    method: 'PUT',
    url: getFullPath('/user/edit'),
    schema: {
      ...userSchema.update
    },
    onRequest: [fastify.authenticate],
    handler: userController.update
  },
  {
    method: 'DELETE',
    url: getFullPath('/user/deleteById'),
    schema: {
      ...userSchema.delete
    },
    onRequest: [fastify.authenticate],
    handler: userController.deleteUser
  },
  {
    method: 'GET',
    url: getFullPath('/user/login'),
    schema: { ...userSchema.login },
    handler: userController.userLogin
  }
];

export default userRoutes;
