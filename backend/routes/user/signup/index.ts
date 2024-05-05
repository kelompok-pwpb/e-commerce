import fp from 'fastify-plugin';
import type { FastifyError, FastifyInstance } from 'fastify';
import { ResponseSchema, createResponseSchema } from '@schema/http';
import bcrypt from 'bcrypt';
import z, { ZodIssue } from 'zod';
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod';
async function register(server: FastifyInstance) {
    const createUserSchema = z.object({
        name: z
            .string()
            .max(10)
            .min(4)
            .regex(/^[_A-Za-z1-9]*$/, {
                message: 'username must only alpha numeric',
            }),
        email: z.string().email(),
        password: z.string(),
    });
    const createUserSchemaResponse = createUserSchema
        .omit({
            password: true,
        })
        .merge(
            z.object({
                id: z.number(),
                accessToken: z.string(),
                refreshToken: z.string(),
            })
        );

    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);
    server.withTypeProvider<ZodTypeProvider>().route<{
        Reply: ResponseSchema<{
            data: z.infer<typeof createUserSchemaResponse>;
        }>;
        Body: z.infer<typeof createUserSchema>;
    }>({
        method: 'POST',
        url: '/user/signup',
        schema: {
            body: createUserSchema,
            response: {
                '2xx': createResponseSchema(createUserSchemaResponse),
            },
        },

        handler: async (req, res) => {
            const body = req.body;
            const result = await server.prisma.user.create({
                data: {
                    email: body.email,
                    name: body.name,
                    password: await bcrypt.hash(
                        body.password,
                        parseInt(process.env.BCRYPT_SALT as string)
                    ),
                },
            });

            const token = await res.createToken({
                id: result.id,
                name: result.name,
            });

            res.setCookie('refreshToken', token.refreshToken, {
                signed: true,
                httpOnly: true,
            });
            res.code(200).send({
                success: true,
                data: {
                    ...server.util.excludeProperty(req.body, {
                        password: true,
                    }),
                    id: result.id,
                    ...token,
                },
                error: null,
                message: 'success creating user',
            });

            return res;
        },
    });
    server.addHook<{
        Body: z.infer<typeof createUserSchema>;
    }>('preHandler', async (request) => {
        const schema = z.object({
            email: z.string().superRefine(async (val, ctx) => {
                const customValidator = server.zodCustomValidator.string(
                    val,
                    ctx
                );

                customValidator.unique('user', 'email');
                await customValidator.validate();
            }),
        });
        const body = request.body;
        await schema.parseAsync(body);
    });
    server.setErrorHandler<
        FastifyError,
        { Reply: ResponseSchema<{ error: ZodIssue | FastifyError }> }
    >((error, _, res) => {
        let errorMessage: ZodIssue | FastifyError;
        try {
            errorMessage = JSON.parse(error.message) as ZodIssue;
        } catch (err) {
            errorMessage = error;
        }
        console.log(error);
        res.status(400).send({
            data: null,
            error: errorMessage,
            code: 'ERROR_VALIDATION',
            message: 'Validation error',
            success: false,
        });
    });
}
export default fp(async (server: FastifyInstance) => {
    server.register(register);
});
