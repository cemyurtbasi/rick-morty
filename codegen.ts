import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        folder: 'types',
        gqlTagName: 'gql',
        baseTypesPath: './src/__generated__/graphql-types'
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;