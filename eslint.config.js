// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat.js'; // <-- Adicione o .js aqui

export default defineConfig([
  ...expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      // Ativa explicitamente a verificação de dependências em hooks do React
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
]);
