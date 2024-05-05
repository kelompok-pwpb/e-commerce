import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import multipart, { MultipartFile } from '@fastify/multipart';
const cb: FastifyPluginAsync = async (server) => {
    server.register(multipart, {
        attachFieldsToBody: true,

        async onFile(parts: MultipartFile & { value?: Buffer }) {
            parts.value = await parts.toBuffer();
            return;
        },
    });
};

export default fp(cb);
