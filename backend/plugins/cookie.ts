import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const cb: FastifyPluginAsync = async (server) => {
    server.register(fastifyCookie, {
        secret: 'COOKIE SECRET',
        hook: 'onRequest',
    } as FastifyCookieOptions);
};

export default fp(cb);
