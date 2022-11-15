import roleSchema from '../../docs/role.js';
import roleController from '../../controllers/roleController.js';
import { getFullPath } from '../config.js';

const roleRoutes = [
  {
    method: 'GET',
    url: getFullPath('/role/queryAll'),
    schema: { ...roleSchema.queryAll },
    handler: roleController.queryAll
  },
  {
    method: 'GET',
    url: getFullPath('/role/queryList'),
    schema: { ...roleSchema.queryList },
    handler: roleController.queryList
  },
  {
    method: 'GET',
    url: getFullPath('/role/queryById'),
    schema: {
      ...roleSchema.queryById
    },
    handler: roleController.queryById
  },
  {
    method: 'POST',
    url: getFullPath('/role/add'),
    schema: {
      ...roleSchema.add
    },
    handler: roleController.add
  },
  {
    method: 'PUT',
    url: getFullPath('/role/edit'),
    schema: {
      ...roleSchema.update
    },
    handler: roleController.update
  },
  {
    method: 'DELETE',
    url: getFullPath('/role/deleteById'),
    schema: {
      ...roleSchema.delete
    },
    handler: roleController.deleteRole
  }
];

export default roleRoutes;
