import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import entry from './entry';
import checkout from './checkout';
import updateQuantity from './updateQuantity';
import deleteCart from './deleteCart';
import add from './add';
const cb: FastifyPluginAsync = async (server) => {
    server.register(entry);
    server.register(checkout);
    server.register(updateQuantity);
    server.register(deleteCart);
    server.register(add);
};

export default fp(cb);
