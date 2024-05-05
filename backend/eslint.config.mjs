//@ts-check

// import path from 'path';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// import { fileURLToPath } from 'url';
// import { FlatCompat } from '@eslint/eslintrc';
// import pluginJs from '@eslint/js';

// mimic CommonJS variables -- not needed if using CommonJS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: pluginJs.configs.recommended,
// });

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs', 'dist/**/*', 'log/**/*'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,

    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    // ...compat.extends('standard-with-typescript'),
    // ...compat.plugins('@typescript-eslint'),

    {
        rules: {
            '@typescript-eslint/no-unused-vars': ['error'],
            'require-await': 'off',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-this-alias': 'off',
        },
        files: ['**/*.ts'],
    }
);
