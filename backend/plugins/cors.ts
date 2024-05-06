import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fastifyCors from '@fastify/cors';

const cb: FastifyPluginAsync = async (server) => {
    server.register(fastifyCors);
};
export default fp(cb);
