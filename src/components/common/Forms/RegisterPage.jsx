import React from 'react';
import { View, Image, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { RegisterForm } from './sections/RegisterForm';
import { BackGroundCircle } from '@/components/common/Generic/BackGroundCircle';
import { Button } from '@/components/common/Generic/Button/Button';
import { Card } from '@/components/common/Generic/Card/Card';
import { AuthTabs } from '@/components/common/Forms/AuthTabs';
import { COLORS } from '@/src/style/colors';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BackGroundCircle />

          <View style={styles.content}>
            <View style={styles.logoRow}>
              <Button variant="transparent" onPress={() => router.push('/')}>
                <Image
                  source={require('@/assets/images/MoonlightIcone.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </Button>
            </View>

            <Card style={styles.card}>
              <AuthTabs />
              <RegisterForm />
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgBottom },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 32 },
  content: { width: '100%', maxWidth: 420, alignSelf: 'center' },
  logoRow: { alignItems: 'center', marginBottom: 32 },
  logo: { width: 90, height: 100 },
  card: { width: '100%' },
});
