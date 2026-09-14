import { WebView } from 'react-native-webview';
import { useCheckout } from '../../../hooks/checkout/useCheckout';
import { Spinner } from '../../../components/common/Generic/Spinner';
import { Animated, ScrollView, View } from 'react-native';
import { Card } from '@/src/components/common/Generic/Card/Card';
import { CardHeader } from '@/src/components/common/Generic/Card/CardHeader';
import { CardContent } from '@/src/components/common/Generic/Card/CardContent';
import { H1 } from '@/src/components/common/Generic/Text';
import { useFadeIn } from '@/src/hooks/animation/useFadeIn';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/src/components/common/Generic/GradientBackground';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CheckoutPage() {
    const { space, font } = useTheme();
    const fadeIn = useFadeIn();
    const {checkoutUrl, isLoading} = useCheckout();
    const router = useRouter();

    if (isLoading) {
      return (
        <Animated.View style={{ justifyContent: "center", width: "100%", height: "100%", padding: 24, opacity: fadeIn.opacity, transform: fadeIn.transform}}>
          <Spinner />
        </Animated.View>
      );
    }

    if (!checkoutUrl) {
      router.replace("/home");
      return null;
    }

    return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Animated.View style={{ opacity: fadeIn.opacity, transform: fadeIn.transform}}>
            <Card variant="primary" style={{padding: space[6]}}>
                <CardHeader><H1 style={{textAlign: "center", fontFamily: font.baseSemibold}}>Checkout</H1></CardHeader>
                <CardContent>
                  <WebView
                    source={{ uri: checkoutUrl }}
                    onNavigationStateChange={(navState) => {
                      // detecta quando o MP redireciona pra sua URL de sucesso/falha/pending
                      if (navState.url.includes('/checkout/success')) {
                        router.replace('/home');
                      } else if (navState.url.includes('/checkout/failure')) {
                        router.replace('/home');
                      } else if (navState.url.includes('/checkout/pending')) {
                        router.replace('/home');
                      }
                    }}
                  />
                </CardContent>
            </Card>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
    );
}
