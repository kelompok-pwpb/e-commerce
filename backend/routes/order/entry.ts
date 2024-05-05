import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { createResponseSchema } from '@schema/http';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
async function register(server: FastifyInstance) {
    const route = server.withTypeProvider<ZodTypeProvider>();
    route.get(
        '/order',
        {
            schema: {
                response: {
                    '2xx': createResponseSchema(z.instanceof(Object)),
                },
            },
        },
        async (_, res) => {
            const user = await server.prisma.user.findFirst({
                where: {
                    email: process.env.USER_EMAIL,
                },
            });
            const order = await server.prisma.order.findMany({
                where: {
                    userId: user!.id,
                },
                include: {
                    product: {
                        include: {
                            productInformation: true,
                        },
                    },
                },
            });
            res.status(201).send({
                message: 'Success retrieve order',
                data: order,
                success: true,
            });

            return res;
        }
    );
}
const cb: FastifyPluginAsync = register;
export default fp(cb, { encapsulate: true });
