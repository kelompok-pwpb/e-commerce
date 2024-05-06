import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import z from 'zod';
import { createResponseSchema } from '@schema/http';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
const cb: FastifyPluginAsync = async (server) => {
    const responseSchema = createResponseSchema(z.instanceof(Object));
    const route = server.withTypeProvider<ZodTypeProvider>();
    route.get(
        '/cart',
        {
            schema: {
                response: {
                    '2xx': responseSchema,
                },
            },
        },
        async (req, res) => {
            const user = await server.prisma.user.findFirst({
                where: {
                    email: process.env.USER_EMAIL,
                },
            });
            const cart = await server.prisma.cart.findMany({
                where: {
                    userId: user?.id,
                    product: {
                        available: true,
                    },
                },
                include: {
                    product: {
                        include: {
                            productInformation: true,
                        },
                    },
                },
            });
            res.status(200).send({
                data: cart,
                success: true,
                message: 'Success getting cart',
            });

            return res;
        }
    );
};

export default fp(cb, { encapsulate: true });
