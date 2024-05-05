import { FastifyInstance } from 'fastify';
import path from 'path';
import autoload from '@fastify/autoload';
import fp from 'fastify-plugin';
import { FastifyError } from 'fastify';
import { ResponseError } from '@schema/http';
import {
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod';
import { ZodError } from 'zod';
export default fp(async function (server: FastifyInstance) {
    server.addHook('onRoute', (requestOption) => {
        let method: string;

        if (requestOption.method instanceof Array) {
            method = requestOption.method.join(',');
        } else {
            method = requestOption.method;
        }

        console.log(`${requestOption.url} (${method})`);
    });
    server.setErrorHandler<
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
        console.log(error);
        res.status(422).send({
            code: 'ERROR_GENERIC',
            data: null,
            message: 'Generic error',
            error: error,
            success: false,
        });

        return;
    });
    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);
    server.register(autoload, {
        dir: path.join(__dirname, 'plugins'),
    });
    server.register(autoload, {
        dir: path.join(__dirname, 'routes'),
    });
});
