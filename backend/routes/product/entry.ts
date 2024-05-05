import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import z from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { createResponseSchema } from '@schema/http';
import { Decimal } from '@prisma/client/runtime/library';

const callback: FastifyPluginAsync = async (server: FastifyInstance) => {
    const searchResponse = createResponseSchema(
        z.array(
            z.object({
                productCategory: z.string(),
                id: z.number(),
                productInformation: z
                    .object({
                        description: z.string(),
                        name: z.string(),
                        price: z.instanceof(Decimal),
                    })
                    .nullable(),
                rating: z.instanceof(Decimal),
            })
        )
    );
    const route = server.withTypeProvider<ZodTypeProvider>();
    const queryStringSchema = z.object({
        count: z.number().max(20),
        lastId: z.number().optional().nullable(),
    });
    route.addHook<{ Querystring: z.infer<typeof queryStringSchema> }>(
        'preValidation',
        (req, _, done) => {
            const value = Object.assign({}, req.query);

            //check if NaN
            value.count = parseInt(value.count.toString(), 10) || value.count;
            value.lastId = value.lastId
                ? undefined
                : parseInt(value.count.toString(), 10) || value.lastId;
            req.query = value;
            done();
        }
    );
    route.get<{
        Querystring: z.infer<typeof queryStringSchema>;
        Reply: z.infer<typeof searchResponse>;
    }>(
        '/product',
        {
            exposeHeadRoute: false,
            schema: {
                querystring: queryStringSchema,
                response: {
                    '2xx': searchResponse,
                },
            },
        },
        async (req, res) => {
            const products =
                (await server.prisma.product.findMany({
                    select: {
                        productCategory: true,
                        id: true,

                        productInformation: {
                            select: {
                                price: true,
                                name: true,
                                img: true,
                                description: true,
                            },
                        },
                    },
                    where: {
                        id: {
                            gt: req.query.lastId ?? -1,
                        },
                        productCategory: {
                            not: null,
                        },
                    },

                    take: req.query.count,
                })) ?? [];
            const review = await server.prisma.review.groupBy({
                by: ['productId'],
                _avg: {
                    rating: true,
                },
                where: {
                    productId: {
                        in: products.map((product) => product.id),
                    },
                    product: {
                        productCategory: {
                            not: null,
                        },
                    },
                },
            });
            const mappedReview = server.util.transformArrayObject(
                review,
                'productId'
            );
            type UnwrapArray<A> = A extends unknown[]
                ? UnwrapArray<A[number]>
                : A;

            type NoUndefinedField<T> = {
                [P in keyof T]-?: Exclude<T[P], null | undefined>;
            };

            type Result = NoUndefinedField<UnwrapArray<typeof products>> & {
                rating: Decimal;
            };
            const result: Result[] = products.map((product) => {
                const rating =
                    mappedReview[product.id as keyof typeof mappedReview][
                        '_avg'
                    ]['rating'];
                return {
                    ...product,
                    rating: rating ?? 0,
                };
            }) as Result[];

            res.code(200).send({
                message: 'success retrieve data',
                error: null,
                data: result,
                success: true,
            });

            return res;
        }
    );
};

export default fp(callback, {
    encapsulate: true,
});
