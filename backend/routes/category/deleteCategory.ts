import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { createError } from '@fastify/error';
import z from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const cb: FastifyPluginAsync = async (server) => {
    const route = server.withTypeProvider<ZodTypeProvider>();
    const error = {
        productNotFound: createError('ERR_CATEGORY_NOT_FOUND', '%s', 404),
    };
    route.delete(
        '/category/:id',
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
                        `category with id ${req.params.id} not found`
                    );
                }
                throw e;
            }

            res.status(204).send();

            return res;
        }
    );
};
export default fp(cb, {
    encapsulate: true,
});
