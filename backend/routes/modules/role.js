import roleSchema from '../../docs/role.js';
import roleController from '../../controllers/roleController.js';
import { getFullPath } from '../config.js';

const roleRoutes = [
  {
    method: 'GET',
    url: getFullPath('/role/queryList'),
    schema: { ...roleSchema.queryList },
    handler: roleController.queryList
  }
];

export default roleRoutes;
