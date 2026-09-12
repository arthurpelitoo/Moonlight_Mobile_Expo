import Constants from 'expo-constants';

const getDynamicHost = (): string => {

  // Pega o IP que o servidor do Expo (Metro Bundler) está usando
  // Exemplo de retorno de hostUri: "192.168.1.42:8081"
  const hostUri = Constants.expoConfig?.hostUri;
  const resultIp = hostUri ? hostUri.split(':')[0] : '10.0.2.2';

  // // Log estruturado mostrando entradas e saída
  // console.log('🔍 [API Debug] hostUri do Metro:', hostUri);
  // console.log('🔍 [API Debug] IP Extraído:', resultIp);

  return `http://${resultIp}:3000`;
};

export const API_URL = getDynamicHost() || process.env.EXPO_PUBLIC_API_URL ;
