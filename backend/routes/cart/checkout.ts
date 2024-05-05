import fp from 'fastify-plugin';
import {
    FastifyPluginAsync,
    FastifyRequest,
    RouteGenericInterface,
} from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { Cart } from '@prisma/client';
import z from 'zod';
import createError from '@fastify/error';
import { createResponseSchema } from '@schema/http';
interface requestDecorator<
    T extends RouteGenericInterface = RouteGenericInterface
> extends FastifyRequest<T> {
    cart: Cart;
}

const paramsSchema = z.object({
    cartId: z.coerce.number(),
});
const cb: FastifyPluginAsync = async (server) => {
    const error = {
        cartNotFound: createError('ERROR_CART_NOT_FOUND', '%s', 404),
        cartCountExceed: createError('ERROR_CART_COUNT_EXCEED', '%s', 401),
    };
    const route = server.withTypeProvider<ZodTypeProvider>();
    type routeGeneric = { Params: z.infer<typeof paramsSchema> };
    route.decorateRequest('cart', null);
    route.addHook<routeGeneric>('preHandler', async (reqTemp) => {
        //only to acces the decorator
        const req = reqTemp as requestDecorator<routeGeneric>;
        const cart = await server.prisma.cart.findFirst({
            where: {
                id: req.params.cartId,
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
            throw new error.cartNotFound(
                `cart with id ${req.params.cartId} not found`
            );
        }
        if ((cart.product.productInformation?.stock || 0) < cart.count) {
            throw new error.cartCountExceed(
                'cart count should no more than product stock'
            );
        }
        req.cart = cart;
    });
    route.post(
        '/cart/:cartId/order',
        {
            schema: {
                params: paramsSchema,
                response: {
                    //TODO: change  to not any
                    '2xx': createResponseSchema(z.instanceof(Object)),
                },
            },
        },
        async (reqTemp, res) => {
            const req = reqTemp as requestDecorator<routeGeneric>;
            const cart = req.cart;
            const order = await server.prisma.order.create({
                data: {
                    userId: cart.userId,
                    productId: cart.productId,
                    count: cart.count,
                    status: 'arrived',
                },
            });

            await server.prisma.cart.delete({
                where: {
                    id: cart.id,
                },
            });

            res.status(200).send({
                message: 'Success creating order',
                data: order,
                success: true,
            });

            return res;
        }
    );
};
export default fp(cb, { encapsulate: true });
