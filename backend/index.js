// const fastify = require('fastify')({ logger: true });
import Fastify from 'fastify';
import mongoose from 'mongoose';
import routes from './routes/index.js';

const fastify = Fastify({
  logger: true
});

// const mongoose = require('mongoose');
// const routes = require('./routes');

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

fastify.get('/', async (request, reply) => {
  return { message: 'Hello interaction-store-backend' };
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
