// const fastify = require('fastify')({ logger: true });
import Fastify from 'fastify';
import mongoose from 'mongoose';
import fastifySwagger from '@fastify/swagger';
import fastifyUi from '@fastify/swagger-ui';
import routes from './routes/index.js';
import { options as swagger } from './config/swagger.js';

const fastify = new Fastify({
  logger: { level: 'info', file: '../fastity.log' }
});

await fastify.register(fastifySwagger);
await fastify.register(fastifyUi, swagger);

routes.forEach((route, index) => {
  fastify.route(route);
});

mongoose
  .connect('mongodb://localhost/interaction-store-dataBase')
  .then(() => {
    console.log('MongoDB 已连接');
  })
  .catch(err => {
    console.log(err);
  });

const start = async () => {
  try {
    await fastify.listen({ port: 9001 });
    fastify.log.info(`服务运行端口：${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
