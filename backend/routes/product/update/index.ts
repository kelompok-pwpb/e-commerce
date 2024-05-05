import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import createError from '@fastify/error';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'node:path';
import { createZodMultipart, createZodMultipartFile } from '@schema/multipart';

const body = z.object({
    description: createZodMultipart(z.string()),
    name: createZodMultipart(z.string()),
    price: createZodMultipart(z.coerce.number()),
    category: createZodMultipart(z.string()),
    img: createZodMultipartFile().optional(),
    stock: createZodMultipart(z.coerce.number()),
    available: createZodMultipart(z.coerce.boolean()),
});

const paramsSchema = z.object({
    id: z.coerce.number(),
});

async function register(server: FastifyInstance) {
    const nanoid = (await import('nanoid')).nanoid;

    const route = server.withTypeProvider<ZodTypeProvider>();
    const error = {
        categoryNotFound: createError(
            'ERR_CATEGORY_NOT_FOUND',
            '%s',
            404,
            TypeError
        ),
        productNotFound: createError(
            'ERR_PRODUCT_NOT_FOUND',
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
    route.put<{
        Body: z.infer<typeof body>;
        Params: z.infer<typeof paramsSchema>;
    }>(
        '/product/:id',
        {
            schema: {
                body: body,
                params: paramsSchema,
            },
        },
        async (req, res) => {
            const img = req.body.img;
            let imgPath: string | undefined;
            const oldImg = await server.prisma.productInformation.findFirst({
                select: {
                    img: true,
                },
                where: {
                    productId: req.params.id,
                },
            });

            if (!oldImg) {
                throw new error.productNotFound('product not found');
            }
            if (img) {
                fs.unlinkSync(
                    path.join(server.path.root.toString(), oldImg.img)
                );
                const extension = img.mimetype.split('/')[1];
                imgPath = path.join(
                    'storage/product',
                    `${nanoid()}.${extension}`
                );
                const writeStream = fs.createWriteStream(imgPath);
                const read = Readable.from(img.value);
                read.pipe(writeStream).addListener('error', (err) => {
                    console.log(err);
                });
            }
            const body = req.body;
            await server.prisma.product.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    productInformation: {
                        update: {
                            price: body.price.value,
                            description: body.description.value,
                            name: body.name.value,
                            img: imgPath,
                            stock: body.stock.value,
                        },
                    },
                    productCategory: body.category.value,
                    available: body.available.value,
                },
            });
            res.status(204).send();

            return;
        }
    );
}

const callback: FastifyPluginAsync = async (server) => {
    await server.register(register);
};
export default fp(callback);
