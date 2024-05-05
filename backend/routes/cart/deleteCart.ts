import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { createError } from '@fastify/error';
import z from 'zod';
import {
    ZodTypeProvider,
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

async function register(server: FastifyInstance) {
    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);
    const route = server.withTypeProvider<ZodTypeProvider>();
    const error = {
        productNotFound: createError('ERR_PRODUCT_NOT_FOUND', '%s', 404),
    };

    route.delete(
        '/cart/:id',
        {
            schema: {
                params: z.object({
                    id: z.coerce.number(),
                }),
            },
        },
        async (req, res) => {
            try {
                await server.prisma.cart.delete({
                    where: {
                        id: req.params.id,
                    },
                });
            } catch (e) {
                if (
                    e instanceof PrismaClientKnownRequestError &&
                    e.code === 'P2025'
                ) {
                    throw new error.productNotFound(
                        `product with id ${req.params.id} not found`
                    );
                }
                throw e;
            }

            res.status(204).send();

            return res;
        }
    );
}
const cb: FastifyPluginAsync = async (server) => {
    server.register(register);
};
export default fp(cb);
