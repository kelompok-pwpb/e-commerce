import fp from 'fastify-plugin';
import {
    FastifyPluginAsync,
    FastifyRequest,
    RouteGenericInterface,
} from 'fastify';
import z from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import createError from '@fastify/error';
import { Product, ProductInformation } from '@prisma/client';
const queryStringSchema = z.object({
    quantity: z.coerce.number(),
});
const paramsSchema = z.object({
    id: z.coerce.number(),
});

interface requestDecorator<
    T extends RouteGenericInterface = RouteGenericInterface
> extends FastifyRequest<T> {
    product: Product & { productInformation: ProductInformation | null };
}

const cb: FastifyPluginAsync = async (server) => {
    const route = server.withTypeProvider<ZodTypeProvider>();
    const error = {
        quantityExceed: createError(
            'ERR_QUANTITY_EXCEED',
            'Quantity should no more than product stock',
            404
        ),
        cartNotFound: createError(
            'ERROR_CART_NOT_FOUND',
            'cart not found',
            404
        ),
    };

    type routeGeneric = {
        Params: z.infer<typeof paramsSchema>;
        Querystring: z.infer<typeof queryStringSchema>;
    };
    route.addHook<routeGeneric>('preHandler', async (reqTemp) => {
        const req = reqTemp as requestDecorator<routeGeneric>;

        const cart = await server.prisma.cart.findFirst({
            where: {
                id: req.params.id,
            },
            include: {
                product: {
                    include: {
                        productInformation: true,
                    },
                },
            },
        });
        if (!cart) {
            throw new error.cartNotFound();
        }

        const product = cart.product;
        if ((product.productInformation?.stock ?? 0) < req.query.quantity) {
            throw new error.quantityExceed();
        }

        req.product = product;
    });
    route.patch(
        '/cart/:id',
        {
            schema: {
                querystring: queryStringSchema,
                params: paramsSchema,
            },
        },
        async (reqTemp, res) => {
            const req = reqTemp as requestDecorator<routeGeneric>;

            await server.prisma.cart.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    count: req.query.quantity,
                },
            });

            res.status(204).send();
            return res;
        }
    );
};
export default fp(cb, { encapsulate: true });
