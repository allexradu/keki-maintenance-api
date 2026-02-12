import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import parser from '@typescript-eslint/parser'

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            prettier: prettierPlugin,
            import: importPlugin,
        },
        languageOptions: {
            parser, // Specify TypeScript parser
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            quotes: ['error', 'single'],
            'react/react-in-jsx-scope': 'off',
            'prettier/prettier': [
                'error',
                {
                    semi: false,
                    singleQuote: true,
                    useTabs: false,
                    tabWidth: 4,
                },
            ],
            'sort-imports': 'off',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
]
