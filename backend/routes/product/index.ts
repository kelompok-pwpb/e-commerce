import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import detail from './detail';
import entry from './entry';
import list from './list';
const cb: FastifyPluginAsync = async (server) => {
    server.register(entry);
    server.register(detail);
    server.register(list);
};

export default fp(cb);
