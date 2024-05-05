import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { createResponseSchema } from '@schema/http';
import z from 'zod';
const responseSchema = z
    .object({
        id: z.number(),
        name: z.string(),
    })
    .array();
const cb: FastifyPluginAsync = async (server) => {
    const route = server.withTypeProvider<ZodTypeProvider>();

    route.get(
        '/category',
        {
            schema: {
                response: {
                    '2xx': createResponseSchema(responseSchema),
                },
            },
        },
        async (req, res) => {
            const category = await server.prisma.productCategory.findMany();
            res.status(200).send({
                message: 'success get category',
                success: true,
                data: category,
            });

            return res;
        }
    );
};
export default fp(cb, {
    encapsulate: true,
});
