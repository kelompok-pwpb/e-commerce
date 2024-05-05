import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

type genericKey = {
    [key: string]: unknown;
};
const util = {
    excludeProperty<T extends genericKey>(
        object1: T,
        excludedObject: Partial<{
            [K in keyof T]: boolean;
        }>
    ) {
        type excludedObjectType = typeof excludedObject;
        // conditional key for the excluded object see https://stackoverflow.com/questions/57384765/typescript-conditional-exclude-type-exclude-from-interface
        type conditionalKey = {
            [K in keyof excludedObjectType]: excludedObjectType[K] extends true
                ? never
                : K;
        };
        const newObject: Partial<Pick<T, conditionalKey[keyof T]>> = {};
        Object.keys(object1).forEach((key) => {
            if (!excludedObject[key]) {
                type newObjectKey = keyof typeof newObject;
                newObject[key as newObjectKey] = object1[key as newObjectKey];
            }
        });

        return newObject as Pick<T, conditionalKey[keyof T]>;
    },
    pick<T extends Record<string, unknown>, K extends keyof T & string>(
        pickedObject: T,
        pickedProperty: K[]
    ) {
        const newObject: Partial<Pick<T, K>> = {};
        pickedProperty.forEach((key) => {
            if (!pickedObject[key]) {
                throw new Error(
                    `key ${key} doesnt exist in ${JSON.stringify(pickedObject)}`
                );
            }

            newObject[key] = pickedObject[key];
        });

        return newObject as Pick<T, K>;
    },
    transformArrayObject<T extends Record<string, unknown>>(
        arr: T[],
        key: keyof T
    ) {
        type supportedKey = string | number;
        const newObj: Partial<Record<supportedKey, T>> = {};

        for (let i = 0; i < arr.length; i++) {
            const value = arr[i][key];
            newObj[value as supportedKey] = arr[i];
        }

        return newObj as Record<supportedKey, T>;
    },
};

declare module 'fastify' {
    interface FastifyInstance {
        util: typeof util;
    }
}
export default fp((server: FastifyInstance, _, done) => {
    server.decorate('util', util);
    done();
});
