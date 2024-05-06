import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

import entry from './entry';
import add from './add';
import deleteCategory from './deleteCategory';
const cb: FastifyPluginAsync = async (server) => {
    server.register(entry);
    server.register(add);
    server.register(deleteCategory);
};
export default fp(cb);
