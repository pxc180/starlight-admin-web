export const options = {
  routePrefix: '/api/v1/helper',
  exposeRoute: true,

  swagger: {
    info: {
      title: 'Store Restful API',
      description:
        '使用Node.js、MongoDB、Fastity 和 Swagger 构建 Restful 风格 API',
      version: '1.0.0'
    },
    stripBasePath: true,
    host: 'localhost',
    basePath: '/api/v1',
    externalDocs: {
      url: 'https://swagger.io',
      description: '更多信息'
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
};
