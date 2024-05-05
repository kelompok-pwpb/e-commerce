import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { ResponseSchema } from '@schema/http';
const querySchema = z.object({
    id: z.preprocess(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        (val) => (val instanceof Array ? val : [val]),
        z.coerce
            .number({ invalid_type_error: 'value must be a number' })
            .array()
    ),
});
const cb: FastifyPluginAsync = async (server) => {
    const route = server.withTypeProvider<ZodTypeProvider>();
    type TODO = any;
    type routeGeneric = {
        Reply: ResponseSchema<TODO>;
        Querystring: z.infer<typeof querySchema>;
    };
    route.get<routeGeneric>(
        '/product/list',
        {
            schema: {
                querystring: querySchema,
            },
        },
        async (req, res) => {
            const product = await server.prisma.product.findMany({
                where: {
                    id: {
                        in: req.query.id ?? null,
                    },
                },
                include: {
                    productInformation: true,
                    review: true,
                },
            });
            res.status(200).send({
                success: true,
                data: product,
                message: 'success getting product',
            });

            return res;
        }
    );
};
export default fp(cb, {
    encapsulate: true,
});
