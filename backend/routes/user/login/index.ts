import fp from 'fastify-plugin';
import { ResponseSchema, createResponseSchema } from '@schema/http';
import z, { ZodIssue } from 'zod';
import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { FastifyError, FastifyInstance, FastifyPluginAsync } from 'fastify';
import createZodCustomError from '@module/createZodCustomError';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
const responseLoginSchema = loginSchema.omit({ password: true }).merge(
    z.object({
        name: z.string(),
        accessToken: z.string(),
        refreshToken: z.string(),
    })
);

async function register(server: FastifyInstance) {
    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);
    const route = server.withTypeProvider<ZodTypeProvider>();

    let user: User;
    route.addHook<{
        Reply: ResponseSchema<{ data: z.infer<typeof responseLoginSchema> }>;
        Body: z.infer<typeof loginSchema>;
    }>('preHandler', async (req) => {
        user = (await server.prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        })) as User;

        if (
            !user ||
            !(await bcrypt.compare(req.body.password, user.password))
        ) {
            throw createZodCustomError({
                message: 'Invalid email or password',
            });
        }
    });
    route.post<{
        Reply: ResponseSchema<{ data: z.infer<typeof responseLoginSchema> }>;
        Body: z.infer<typeof loginSchema>;
    }>(
        '/user/login',
        {
            schema: {
                body: loginSchema,
                response: {
                    '2xx': createResponseSchema(responseLoginSchema),
                },
            },
        },
        async (req, res) => {
            const token = await res.createToken({
                id: user.id,
                name: user.name,
            });
            res.setCookie('refreshToken', token.refreshToken, {
                httpOnly: true,
                signed: true,
            });
            res.status(200).send({
                message: 'Login success',
                error: null,
                success: true,
                data: {
                    ...req.body,
                    email: user.email,
                    name: user.name,
                    ...token,
                },
            });

            return res;
        }
    );
    route.setErrorHandler<
        FastifyError,
        {
            Reply: ResponseSchema<{ error: ZodIssue | FastifyError }>;
        }
    >((error, _, res) => {
        let errorMessage: ZodIssue | FastifyError;
        try {
            errorMessage = JSON.parse(error.message) as ZodIssue;
        } catch (err) {
            errorMessage = error;
        }
        res.status(400).send({
            data: null,
            error: errorMessage,
            code: 'ERROR_VALIDATION',
            message: 'Validation error',
            success: false,
        });
    });
}
const pluginCb: FastifyPluginAsync = async (server) => {
    server.register(register);
};
export default fp(pluginCb);
