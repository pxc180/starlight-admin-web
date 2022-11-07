// const fastify = require('fastify')({ logger: true });
import fs from 'fs';
import path from 'path';
import Fastify from 'fastify';
import mongoose from 'mongoose';
import fastifySwagger from '@fastify/swagger';
import fastifyUi from '@fastify/swagger-ui';
import { options as swagger } from './config/swagger.js';

const fastify = new Fastify({
  logger: { level: 'info', file: '../fastity.log' }
});

await fastify.register(fastifySwagger);
await fastify.register(fastifyUi, swagger);

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

const __dirname = path.resolve();

let modulesFiles = fs.readdirSync(path.join(__dirname, '/routes/modules'));

function formatModules(_modules) {
  const routes = [];
  modulesFiles.forEach(async (item, index) => {
    let module = await import('./routes/modules/' + item);
    const defaultModule = module.default;

    if (!defaultModule) return;

    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];

    routes.push(...moduleList);

    if (index + 1 === _modules.length) {
      routes.forEach((route, index) => {
        fastify.route(route);
      });

      start();
    }
  });
}
await formatModules(modulesFiles);
