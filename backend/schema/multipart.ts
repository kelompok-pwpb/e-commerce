import z from 'zod';
import { Readable } from 'stream';
export const createZodMultipart = <T extends z.ZodTypeAny>(value: T) => {
    return z.object({
        value: value,
        mimetype: z.enum(['text/plain']),
    });
};

export const createZodMultipartFile = () => {
    return z.object({
        file: z.instanceof(Readable),
        filename: z.string(),
        value: z.instanceof(Buffer),
        mimetype: z.enum(['image/png', 'image/jpg']),
    });
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace util {
    type inferedMultipart = z.infer<ReturnType<typeof createZodMultipart>>;
    type multipartObject = {
        [key: string]:
            | z.infer<ReturnType<typeof createZodMultipart>>
            | z.infer<ReturnType<typeof createZodMultipartFile>>;
    };
    export type extractMultipart<T extends multipartObject> = {
        [K in keyof T]-?: T[K] extends inferedMultipart
            ? T[K]['value']
            : string;
    };
}
