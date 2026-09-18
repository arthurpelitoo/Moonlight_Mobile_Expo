import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getDynamicHost = (): string => {
  if (Platform.OS === 'web') {
      // No navegador, a própria página já roda no host correto (geralmente localhost)
      const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      console.log('🔍 [API Debug] Rodando na WEB, host da página:', host);
      return `http://${host}:3000`;
    }

    // Fluxo nativo (Android/iOS/emulador), igual já funcionava
    const hostUri = Constants.expoConfig?.hostUri;
    const resultIp = hostUri ? hostUri.split(':')[0] : '10.0.2.2';

    console.log('🔍 [API Debug] hostUri do Metro:', hostUri);
    console.log('🔍 [API Debug] IP Extraído:', resultIp);

    return `http://${resultIp}:3000`;
};

export const API_URL = process.env.EXPO_PUBLIC_API_URL || getDynamicHost();
console.log('🔍 [API Debug] FINAL:', API_URL);
