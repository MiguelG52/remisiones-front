import { FlatCompat } from '@eslint/eslintrc'
import { off } from 'process'
 
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
        "@typescript-eslint/no-explicit-any":'off',
        "@typescript-eslint/no-unused-vars":"warn"
    },
  }),
]
 
export default eslintConfig