import roleSchema from '../../schemas/role.js';
import roleController from '../../controllers/roleController.js';
import { getFullPath } from '../config.js';
import fastify from '../../fastify.js';

const roleRoutes = [
  {
    method: 'GET',
    url: getFullPath('/role/queryAll'),
    schema: { ...roleSchema.queryAll },
    onRequest: [fastify.authenticate],
    handler: roleController.queryAll
  },
  {
    method: 'GET',
    url: getFullPath('/role/queryList'),
    schema: { ...roleSchema.queryList },
    onRequest: [fastify.authenticate],
    handler: roleController.queryList
  },
  {
    method: 'GET',
    url: getFullPath('/role/queryById'),
    schema: {
      ...roleSchema.queryById
    },
    onRequest: [fastify.authenticate],
    handler: roleController.queryById
  },
  {
    method: 'POST',
    url: getFullPath('/role/add'),
    schema: {
      ...roleSchema.add
    },
    onRequest: [fastify.authenticate],
    handler: roleController.add
  },
  {
    method: 'PUT',
    url: getFullPath('/role/edit'),
    schema: {
      ...roleSchema.update
    },
    onRequest: [fastify.authenticate],
    handler: roleController.update
  },
  {
    method: 'DELETE',
    url: getFullPath('/role/deleteById'),
    schema: {
      ...roleSchema.delete
    },
    onRequest: [fastify.authenticate],
    handler: roleController.deleteRole
  },
  {
    method: 'POST',
    url: getFullPath('/role/savePermissions'),
    schema: {
      ...roleSchema.savePermissions
    },
    onRequest: [fastify.authenticate],
    handler: roleController.savePermissions
  }
];

export default roleRoutes;
