import appRootPath from 'app-root-path';
import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
const path = {
    root: appRootPath,
};

declare module 'fastify' {
    interface FastifyInstance {
        path: typeof path;
    }
}

const cb: FastifyPluginAsync = async (server) => {
    server.decorate('path', path);
};
export default fp(cb);
