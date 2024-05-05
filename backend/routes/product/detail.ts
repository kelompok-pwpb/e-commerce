import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { ResponseSchema } from '@schema/http';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import createError from '@fastify/error';
const paramsSchema = z.object({
    id: z.coerce.number(),
});

const cb: FastifyPluginAsync = async (server) => {
    const route = server.withTypeProvider<ZodTypeProvider>();
    type Todo = any;
    type genericRoute = {
        Reply: ResponseSchema<{ data: Todo }>;
        Params: z.infer<typeof paramsSchema>;
    };
    const error = {
        productNotFound: createError('ERR_PRODUCT_NOT_FOUND', '%s', 404),
    };
    route.get<genericRoute>(
        '/product/:id',
        {
            schema: {
                params: paramsSchema,
            },
        },

        async (req, res) => {
            const product = await server.prisma.product.findFirst({
                where: {
                    id: req.params.id,
                },
                include: {
                    productInformation: true,
                    review: true,
                },
            });
            if (!product) {
                throw new error.productNotFound(
                    `product with id ${req.params.id} not found`
                );
            }
            res.status(200).send({
                data: product,
                success: true,
                error: null,
                message: 'success get product detail',
            });

            return res;
        }
    );
};

export default fp(cb, {
    encapsulate: true,
});
