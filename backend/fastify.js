import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import { options as swagger } from './config/swagger.js';

const fastify = new Fastify({
  logger: { level: 'info' }
  // logger: { level: 'info', file: '../fastity.log' }
});

await fastify.register(fastifySwagger);
await fastify.register(fastifyUi, swagger);
await fastify.register(fastifyJwt, { secret: 'supersecret' });

export default fastify;
