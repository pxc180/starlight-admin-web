import menuController from '../../controllers/menuController.js';
import menuSchema from '../../docs/menu.js';
import { getFullPath } from '../config.js';

const menuRoutes = [
  {
    method: 'GET',
    url: getFullPath('/menu/queryAll'),
    schema: { ...menuSchema.queryAll },
    handler: menuController.queryAll
  },
  {
    method: 'POST',
    url: getFullPath('/menu/add'),
    schema: {
      ...menuSchema.add
    },
    handler: menuController.add
  }
];

export default menuRoutes;
