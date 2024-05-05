import 'dotenv/config';
import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { Readable } from 'stream';
import path from 'path';
import appRootPath from 'app-root-path';
import fs from 'node:fs';

const prisma = new PrismaClient();

type modelName = Prisma.ModelName;
type getCreateMethodData<K extends Uncapitalize<modelName>> = NonNullable<
    Parameters<PrismaClient[K]['createMany']>[0]
>['data'];
async function main() {
    await prisma.$connect();
    await user();
    await createCustomUser();
    await productCategory();
    await product();
    await productInformation();
    await review();
    await createCart();
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function createCustomUser() {
    await prisma.user.create({
        data: {
            email: process.env.USER_EMAIL as string,
            name: 'YogaGanteng123',
            password: await bcrypt.hash(
                'YOGI123',
                parseInt(process.env.BCRYPT_SALT as string)
            ),
        },
    });
}
async function createImg() {
    const nanoid = (await import('nanoid')).nanoid;
    const fileType = await import('file-type');
    const response = await fetch(
        faker.image.urlLoremFlickr({ category: 'fashion' })
    );
    const responseBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(responseBuffer);
    const extension =
        (await fileType.fileTypeFromBuffer(responseBuffer))?.ext || 'jpg';
    const readable = Readable.from(buffer);
    const storagePath = path.join(
        'storage/product',
        `${nanoid()}.${extension}`
    );
    const writeStream = fs.createWriteStream(
        path.join(appRootPath.toString(), storagePath)
    );

    readable.pipe(writeStream).on('error', (err) => {
        console.log(err);
    });

    return storagePath;
}
async function productCategory() {
    const category: string[] = [
        'kamen',
        'udeng',
        'saput',
        'sandal wanita',
        'sandal pria',
    ];
    await prisma.productCategory.createMany({
        data: category.map((category) => {
            return {
                name: category,
            };
        }),
    });
}

async function product() {
    const category = (
        await prisma.productCategory.findMany({
            select: {
                name: true,
            },
        })
    ).map((category) => {
        return category.name;
    });
    type data = getCreateMethodData<'product'>;
    const data: data = Array.from(
        {
            length: getRandomInt(12, 20),
        },
        () => {
            return {
                productCategory: category[getRandomInt(0, category.length - 1)],
                available: true,
            };
        }
    );
    await prisma.product.createMany({
        data: data,
    });
}

async function productInformation() {
    const product = await prisma.product.findMany();

    const mapper = await Promise.all(
        product.map(async (product) => {
            return {
                productId: product.id,
                stock: getRandomInt(10, 100),
                name: faker.commerce.productName(),
                price: parseInt(
                    faker.commerce.price({ min: 5000, max: 120000 })
                ),
                description: faker.lorem.lines(5),
                img: await createImg(),
            };
        })
    );
    await prisma.productInformation.createMany({
        data: mapper,
    });
}

async function user() {
    console.log(process.env.BCRYPT_SALT);
    await prisma.user.createMany({
        data: await Promise.all(
            Array.from({ length: getRandomInt(10, 12) }, async () => {
                return {
                    email: faker.internet.email(),
                    name: faker.internet.userName(),
                    password: await bcrypt.hash(
                        faker.internet.password(),
                        parseInt(process.env.BCRYPT_SALT as string)
                    ),
                };
            })
        ),
    });
}

async function review() {
    const product = (
        await prisma.product.findMany({
            take: getRandomInt(10, 12),
        })
    ).map((e) => e.id);
    const user = (
        await prisma.user.findMany({
            take: getRandomInt(7, 10),
        })
    ).map((e) => e.id);

    const rating = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    for (let i = 0; i < product.length; i++) {
        await prisma.review.createMany({
            data: user.map((id) => {
                return {
                    userId: id,
                    productId: product[i],
                    rating: rating[getRandomInt(0, rating.length - 1)],
                    text: faker.lorem.lines(),
                };
            }),
        });
    }
}

async function createCart() {
    const id = (
        await prisma.user.findFirst({
            where: {
                email: process.env.USER_EMAIL,
            },
        })
    )?.id;
    const products = await prisma.product.findMany({
        include: {
            productInformation: true,
        },
    });
    const mapper: getCreateMethodData<'cart'> = Array.from(
        { length: getRandomInt(5, 10) },
        () => {
            const product = products[getRandomInt(0, products.length - 1)];
            return {
                userId: id as number,
                productId: product.id,
                count: getRandomInt(0, product.productInformation?.stock || 0),
            };
        }
    );
    await prisma.cart.createMany({
        data: mapper,
    });
}
main();
