import fp from 'fastify-plugin';
import {
    FastifyPluginAsync,
    FastifyRequest,
    RouteGenericInterface,
} from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { User } from '@prisma/client';
import createError from '@fastify/error';
import { createResponseSchema } from '@schema/http';

const bodySchema = z.object({
    productId: z.number(),
});

interface decoratorRequest<
    T extends RouteGenericInterface = RouteGenericInterface
> extends FastifyRequest<T> {
    userData: User;
}
const cb: FastifyPluginAsync = async (server) => {
    const route = server.withTypeProvider<ZodTypeProvider>();
    type routeGeneric = {
        Body: z.infer<typeof bodySchema>;
    };
    server.decorateRequest('userData', null);
    route.addHook<routeGeneric>('preHandler', async (reqTemp) => {
        const req = reqTemp as decoratorRequest<routeGeneric>;

        const error = {
            outOfStock: createError('ERR_OUT_OF_STOCK', 'out of stock', 400),
            productNotFound: createError(
                'ERR_PRODUCT_NOT_FOUND',
                'product not found',
                404
            ),
        };
        const user = await server.prisma.user.findFirst({
            where: {
                email: process.env.USER_EMAIL,
            },
        });
        const product = await server.prisma.product.findFirst({
            where: {
                id: req.body.productId,
                available: true,
            },
            include: {
                productInformation: true,
            },
        });

        if (!product) {
            throw new error.productNotFound();
        }

        if ((product.productInformation?.stock ?? 0) <= 0) {
            throw new error.outOfStock();
        }

        req.userData = user as NonNullable<typeof user>;
    });

    route.post(
        '/cart',
        {
            schema: {
                body: bodySchema,
                response: {
                    '2xx': createResponseSchema(
                        z.object({
                            productId: z.number(),
                            userId: z.number(),
                            id: z.number(),
                        })
                    ),
                },
            },
        },
        async (reqTemp, res) => {
            const req = reqTemp as decoratorRequest<routeGeneric>;
            const body = req.body;
            const cart = await server.prisma.cart.create({
                data: {
                    userId: req.userData.id,
                    productId: body.productId,
                    count: 0,
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
                message: 'success creating cart',
                success: true,
            });
        }
    );
};
export default fp(cb, {
    encapsulate: true,
});
