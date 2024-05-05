import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { ResponseSchema } from '@schema/http';
import fp from 'fastify-plugin';
type responseSchema = {
    accessToken: string;
    refreshToken: string;
};
async function register(server: FastifyInstance) {
    server.post<{ Reply: ResponseSchema<{ data: responseSchema }> }>(
        '/auth/refresh',
        async (req, res) => {
            const payload: { id: number; jti: string } =
                await req.refreshJwtVerify();
            const tokenData = await server.prisma.token.findFirst({
                where: {
                    jti: payload.jti,
                    id: payload.id,
                },
                include: {
                    user: true,
                },
            });
            const token =
                req.cookies.refreshToken ??
                req.headers.authorization?.split('');
            if (!payload || !tokenData || tokenData?.token !== token) {
                throw new Error('UNAUTHORIZED');
            }

            const generatedToken = await res.createToken(tokenData.user);
            res.setCookie('refreshToken', generatedToken.refreshToken, {
                signed: true,
                httpOnly: true,
            });

            res.code(200).send({
                error: null,
                message: 'Success creating token',
                success: true,
                data: {
                    accessToken: generatedToken.accessToken,
                    refreshToken: generatedToken.refreshToken,
                },
            });

            return res;
        }
    );
}
const cb: FastifyPluginAsync = async (server) => {
    await server.register(register);
};

export default fp(cb);
