import userController from '../controllers/userController.js';

const APIPATH = '/api/';
const VERSION = 'v1';
const ENDPOINT = '/user';

const getFullPath = (method = '') => `${APIPATH}${VERSION}${ENDPOINT}${method}`;

const routes = [
  {
    method: 'GET',
    url: getFullPath('/queryList'),
    handler: userController.getList
  },
  {
    method: 'GET',
    url: getFullPath('/queryById'),
    schema: {
      querystring: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          }
        },
        required: ['id']
      }
    },
    handler: userController.get
  },
  {
    method: 'POST',
    url: getFullPath('/add'),
    handler: userController.add
  },
  {
    method: 'PUT',
    url: getFullPath('/edit'),
    schema: {
      body: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          }
        },
        required: ['id']
      }
    },
    handler: userController.update
  },
  {
    method: 'DELETE',
    url: getFullPath('/deleteById'),
    schema: {
      querystring: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          }
        },
        required: ['id']
      }
    },
    handler: userController.deleteUser
  }
];

export default routes;
