import fp from 'fastify-plugin';
import entry from './entry';
import { FastifyPluginAsync } from 'fastify';

const cb: FastifyPluginAsync = async (server) => {
    await server.register(entry);
};

export default fp(cb);
