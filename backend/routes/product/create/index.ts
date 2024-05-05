import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { z } from 'zod';
import path from 'node:path';
import fs from 'node:fs';
import { Readable } from 'node:stream';
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod';
import createError from '@fastify/error';
import { createZodMultipart, createZodMultipartFile } from '@schema/multipart';
const body = z.object({
    description: createZodMultipart(z.string()),
    name: createZodMultipart(z.string()),
    price: createZodMultipart(z.coerce.number()),
    category: createZodMultipart(z.string()),
    img: createZodMultipartFile(),
    stock: createZodMultipart(z.coerce.number()),
});

async function register(server: FastifyInstance) {
    const nanoid = (await import('nanoid')).nanoid;
    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);

    const route = server.withTypeProvider<ZodTypeProvider>();
    const error = {
        categoryNotFound: createError(
            'ERR_CATEGORY_NOT_FOUND',
            '%s',
            404,
            TypeError
        ),
    };

    route.addHook<{ Body: z.infer<typeof body> }>('preHandler', async (req) => {
        const category = await server.prisma.productCategory.findFirst({
            where: {
                name: req.body.category.value,
            },
        });

        if (!category) {
            throw error.categoryNotFound(
                `${req.body.category.value} not found`
            );
        }

        return;
    });
    route.post(
        '/product/create',
        {
            schema: {
                body: body,
            },
        },
        async (req, res) => {
            const img = req.body.img;
            const extension = img.mimetype.split('/')[1];
            const imgPath = path.join(
                server.path.root.toString(),
                'storage/product',
                `${nanoid()}.${extension}`
            );
            const writeStream = fs.createWriteStream(imgPath);
            const read = Readable.from(img.value);
            read.pipe(writeStream).addListener('error', (err) => {
                console.log(err);
            });
            const body = req.body;

            await server.prisma.product.create({
                data: {
                    productInformation: {
                        create: {
                            price: body.price.value,
                            description: body.description.value,
                            name: body.name.value,
                            img: imgPath,
                            stock: body.stock.value,
                        },
                    },
                    productCategory: body.category.value,
                    available: true,
                },
            });

            res.status(204).send();

            return;
        }
    );
}
const cb: FastifyPluginAsync = async (server) => {
    server.register(register);
};

export default fp(cb);
