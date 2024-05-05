import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { ResponseSchema, ResponseError } from '@schema/http';
import { FastifyError, createError } from '@fastify/error';
import z, { ZodError } from 'zod';
import {
    ZodTypeProvider,
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
async function register(server: FastifyInstance) {
    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);
    const route = server.withTypeProvider<ZodTypeProvider>();
    const error = {
        productNotFound: createError(
            'ERR_PRODUCT_NOT_FOUND',
            '%s',
            404,
            TypeError
        ),
    };

    route.setErrorHandler<
        FastifyError,
        { Reply: ResponseError<FastifyError | ZodError> }
    >((error, _, res) => {
        if (error instanceof ZodError) {
            res.status(400).send({
                code: 'ERR_VALIDATION',
                data: null,
                message: 'validation error',
                error: JSON.parse(error.message) as ZodError,
                success: false,
            });

            return;
        }
        if (error.name === 'FastifyError') {
            type statusCode = Parameters<typeof res.status>[0];
            res.status((error.statusCode as statusCode) || 422).send({
                code: error.code,
                data: null,
                message: error.message,
                success: false,
            });

            return;
        }
        res.status(422).send({
            code: 'ERROR_GENERIC',
            data: null,
            message: 'Generic error',
            error: error,
            success: false,
        });

        return;
    });

    route.delete<{ Params: { productId: number }; Reply: ResponseSchema }>(
        '/product/:productId',
        {
            schema: {
                params: z.object({
                    productId: z.coerce.number(),
                }),
            },
        },
        async (req, res) => {
            try {
                await server.prisma.product.delete({
                    where: {
                        id: req.params.productId,
                    },
                });
            } catch (e) {
                if (
                    e instanceof PrismaClientKnownRequestError &&
                    e.code === 'P2025'
                ) {
                    throw new error.productNotFound(
                        `product with id ${req.params.productId} not found`
                    );
                }
                throw e;
            }

            res.status(204).send();

            return;
        }
    );
}
const cb: FastifyPluginAsync = async (server) => {
    server.register(register);
};
export default fp(cb);
