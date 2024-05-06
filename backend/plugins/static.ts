import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
const cb: FastifyPluginAsync = async (server) => {
    server.register(fastifyStatic, {
        root: path.join(server.path.root.toString(), 'storage/product'),
        prefix: '/img/product',
    });
    server.register(fastifyStatic, {
        root: path.join(server.path.root.toString(), 'storage/user'),
        prefix: '/img/user',
        decorateReply: false,
    });
};

export default fp(cb);
