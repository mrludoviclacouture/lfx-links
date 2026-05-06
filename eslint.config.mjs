import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    rules: {
      // Errors
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ],
      'no-duplicate-imports': 'error',

      // Best practices
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      // React
      'react/prop-types': 'off', // not needed without TS
      'react/self-closing-comp': 'warn',
      'react-hooks/exhaustive-deps': 'warn',

      // Next.js
      '@next/next/no-img-element': 'error', // enforce <Image />

      // Prettier — surfaces formatting issues as ESLint errors
      'prettier/prettier': 'error'
    },
    plugins: {
      prettier: (await import('eslint-plugin-prettier')).default
    }
  }
]

export default eslintConfig
