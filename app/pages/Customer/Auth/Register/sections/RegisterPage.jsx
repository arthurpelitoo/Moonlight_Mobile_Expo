import React from 'react';
import { View, Image, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { RegisterForm } from './sections/RegisterForm';
import { BackgroundCircle } from '../../../components/common/Generic/BackgroundCircle/BackgroundCircle';
import { Button } from '../../../components/common/Generic/Button/Button';
import { Card } from '../../../components/common/Generic/Card/Card';
import { AuthTabs } from '../../../components/common/Forms/AuthTabs';

import { COLORS } from '../../../style/colors';

function RegisterPage() {
  const navigation = useNavigation();

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
          {/* Fundo decorativo */}
          <BackgroundCircle />

          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoRow}>
              <Button variant="transparent" onPress={() => navigation.navigate('Home')}>
                <Image
                  source={require('../../../../assets/MoonlightIcone.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </Button>
            </View>

            {/* Card */}
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

export default RegisterPage;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgBottom },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  content: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 90,
    height: 100,
  },
  card: {
    width: '100%',
  },
});
