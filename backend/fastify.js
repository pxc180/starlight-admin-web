import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import fastifyPlugin from 'fastify-plugin';
import { options as swagger } from './config/swagger.js';

const fastify = new Fastify({
  logger: { level: 'info' }
  // logger: { level: 'info', file: '../fastity.log' }
});

await fastify.register(fastifySwagger);
await fastify.register(fastifyUi, swagger);
await fastify.register(fastifyJwt, {
  secret: 'supersecret',
  sign: {
    expiresIn: '24h'
  },
  messages: {
    badRequestErrorMessage: 'Token格式有误，正确格式为: Bearer [token]',
    noAuthorizationInHeaderMessage: '未登录，请登录后重试',
    authorizationTokenExpiredMessage: '登录状态已过期',
    authorizationTokenInvalid: err => {
      return `无效Token: ${err.message}`;
    }
  }
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

export default fastify;
