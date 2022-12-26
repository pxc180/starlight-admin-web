import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import fastifyPlugin from 'fastify-plugin';
import { options as swagger } from './config/swagger.js';
import boom from '@hapi/boom';

const fastify = new Fastify({
  logger: { level: 'info' }
  // logger: { level: 'info', file: '../fastity.log' }
});

await fastify.register(fastifySwagger);
await fastify.register(fastifyUi, swagger);
await fastify.register(fastifyJwt, {
  secret: 'supersecret'
});
await fastify.register(
  fastifyPlugin(async function (fastify, options) {
    fastify.decorate('authenticate', async function (req, reply) {
      try {
        await req.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });
  })
);

// fastify.addHook('onRequest', async (req, reply) => {
//   try {
//     await req.jwtVerify();
//   } catch (error) {
//     throw boom.boomify(error);
//   }
// });

export default fastify;
