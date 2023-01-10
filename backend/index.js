import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import fastify from './fastify.js';

mongoose
  .connect(
    'mongodb://root:pengxincheng123456@localhost:27017/starlight-admin-dataBase?authSource=admin'
  )
  .then(() => {
    console.log('MongoDB 已连接');
  })
  .catch(err => {
    console.log(err);
  });

const startServe = async () => {
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
  let finished = 0;

  return new Promise((resolve, reject) => {
    const start = async () => {
      while (finished < _modules.length) {
        try {
          let module = await import('./routes/modules/' + _modules[finished]);

          const defaultModule = module.default;

          if (!defaultModule) return;

          const routesList = Array.isArray(defaultModule)
            ? [...defaultModule]
            : [defaultModule];

          routesList.forEach((route, index) => {
            fastify.route(route);
          });

          finished++;
          if (finished === _modules.length) {
            resolve();
          }
        } catch (error) {
          console.error(error);
          break;
        }
      }
    };

    start();
  });
}

formatModules(modulesFiles).then(() => {
  startServe();
});
