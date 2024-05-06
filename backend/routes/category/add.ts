import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import createError from '@fastify/error';
import { createResponseSchema } from '@schema/http';

const bodySchema = z.object({
    name: z.string().trim().min(1, {
        message: 'required',
    }),
});
const cb: FastifyPluginAsync = async (server) => {
    const route = server.withTypeProvider<ZodTypeProvider>();
    const error = {
        categoryAlreadyUsed: createError(
            'ERR_CATEGORY_ALREADY_USED',
            'category is already used',
            404
        ),
    };
    route.post(
        '/category',
        {
            schema: {
                body: bodySchema,
                response: {
                    '2xx': createResponseSchema(z.instanceof(Object)),
                },
            },
        },
        async (req, res) => {
            try {
                const category = await server.prisma.productCategory.create({
                    data: {
                        name: req.body.name,
                    },
                });

                res.status(200).send({
                    message: 'success creating data',
                    success: true,
                    data: category,
                });

                return res;
            } catch (e) {
                throw new error.categoryAlreadyUsed();
            }
        }
    );
};
export default fp(cb, { encapsulate: true });
