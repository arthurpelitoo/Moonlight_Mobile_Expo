import React from 'react';
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/src/contexts/ThemeContext';
import { RegisterForm } from './sections/RegisterForm';

export default function RegisterPage() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bodyBg }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Círculo decorativo de fundo */}
          <View
            pointerEvents="none"
            style={[styles.bgCircle, { backgroundColor: theme.cta }]}
          />

          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoRow}>
              <Image
                source={require('@/src/assets/images/icon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Card */}
            <View style={[
              styles.card,
              {
                backgroundColor: theme.secondaryBg,
                borderColor: theme.borderColor,
              }
            ]}>
              <RegisterForm />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:     { flex: 1 },
  flex:     { flex: 1 },
  scroll:   {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  bgCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    opacity: 0.08,
    alignSelf: 'center',
    top: '10%',
  },
  content:  { width: '100%', maxWidth: 420, alignSelf: 'center' },
  logoRow:  { alignItems: 'center', marginBottom: 28 },
  logo:     { width: 80, height: 90 },
  card:     { borderWidth: 1, borderRadius: 8, padding: 24 },
});
