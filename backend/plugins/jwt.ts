import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import fp from 'fastify-plugin';

type userData = {
    id: number;
    name: string;
};

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (req: FastifyRequest) => Promise<void>;
    }
    interface FastifyReply {
        refreshJwtSign: FastifyReply['jwtSign'];
        createToken: (data: userData) => Promise<{
            accessToken: string;
            refreshToken: string;
        }>;
    }
    interface FastifyRequest {
        // Custom namespace
        refreshJwtVerify: FastifyRequest['jwtVerify'];
        refreshJwtDecode: FastifyRequest['jwtDecode'];
        deleteRefreshToken: ({
            id,
            jti,
        }: {
            id: number;
            jti: string;
        }) => Promise<void>;
    }
}

export default fp(async (server: FastifyInstance) => {
    server.register(fastifyJwt, {
        secret: 'THIS ACCESS TOKEN NEED TO CHANGED LATER',
    } as FastifyJWTOptions);

    server.register(fastifyJwt, {
        secret: 'THIS REFRESH TOKEN NEED TO CHANGED LATER',
        namespace: 'refresh',
        cookie: {
            signed: true,
            cookieName: 'refreshToken',
        },
    } as FastifyJWTOptions);

    server.decorateReply('createToken', async function (user: userData) {
        const nanoid = (await import('nanoid')).nanoid;

        const access = server.jwt.sign({ data: user }, { expiresIn: '5m' });
        const reply: FastifyReply = this;
        const jti = nanoid();

        const refresh = await reply.refreshJwtSign(
            { data: user },
            { expiresIn: '7d', jti: nanoid() }
        );
        await server.prisma.token.create({
            data: {
                token: refresh,
                userId: user.id,
                jti: jti,
            },
        });

        return {
            accessToken: access,
            refreshToken: refresh,
        };
    });

    server.decorateRequest(
        'deleteRefreshToken',
        async ({ id, jti }: { id: number; jti: string }) => {
            await server.prisma.token.delete({
                where: {
                    id,
                    jti,
                },
            });
        }
    );
    server.decorate('authenticate', async function (req: FastifyRequest) {
        await req.jwtVerify();
    });
});
