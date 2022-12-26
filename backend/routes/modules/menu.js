import menuController from '../../controllers/menuController.js';
import menuSchema from '../../docs/menu.js';
import { getFullPath } from '../config.js';
import fastify from '../../fastify.js';

const menuRoutes = [
  {
    method: 'GET',
    url: getFullPath('/menu/queryAll'),
    schema: { ...menuSchema.queryAll },
    onRequest: [fastify.authenticate],
    handler: menuController.queryAll
  },
  {
    method: 'POST',
    url: getFullPath('/menu/add'),
    schema: {
      ...menuSchema.add
    },
    onRequest: [fastify.authenticate],
    handler: menuController.add
  },
  {
    method: 'PUT',
    url: getFullPath('/menu/edit'),
    schema: {
      ...menuSchema.edit
    },
    onRequest: [fastify.authenticate],
    handler: menuController.edit
  },
  {
    method: 'DELETE',
    url: getFullPath('/menu/deleteById'),
    schema: {
      ...menuSchema.delete
    },
    onRequest: [fastify.authenticate],
    handler: menuController.deleteMenu
  },
  {
    method: 'GET',
    url: getFullPath('/menu/queryMenuByRoleId'),
    schema: {
      ...menuSchema.queryMenuByRoleId
    },
    onRequest: [fastify.authenticate],
    handler: menuController.queryMenuByRoleId
  }
];

export default menuRoutes;
