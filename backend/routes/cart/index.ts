import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { createResponseSchema } from '@schema/http';
const cb: FastifyPluginAsync = async (server) => {
    const route = server.withTypeProvider<ZodTypeProvider>();
    const responseSchema = createResponseSchema(z.instanceof(Object));
    route.get<{ Reply: z.infer<typeof responseSchema> }>(
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
        }
    );
};

export default fp(cb);
