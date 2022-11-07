const APIPATH = '/api/';
const VERSION = 'v1';

export const getFullPath = (method = '') => `${APIPATH}${VERSION}${method}`;
