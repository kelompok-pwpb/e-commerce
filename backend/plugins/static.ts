import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
const cb: FastifyPluginAsync = async (server) => {
    server.register(fastifyStatic, {
        root: path.join(server.path.root.toString(), 'storage/product'),
        prefix: '/img/product',
    });
};

export default fp(cb);
