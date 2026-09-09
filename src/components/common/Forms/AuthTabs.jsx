import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

import { COLORS } from '@/src/style/colors';
import { FONTS } from '@/src/style/typography';

const ROUTES = {
  login: '/pages/Customer/Auth/Login/LoginPage',
  register: '/pages/Customer/Auth/Register/RegisterPage',
};

export function AuthTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const isRegister = pathname.includes('Register');

  return (
    <View style={styles.wrap}>
      <Tab label="Entrar" active={!isRegister} onPress={() => router.replace(ROUTES.login)} />
      <Tab label="Criar conta" active={isRegister} onPress={() => router.replace(ROUTES.register)} />
    </View>
  );
}

function Tab({ label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
      <View style={[styles.underline, active && styles.underlineActive]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', marginBottom: 24 },
  tab: { flex: 1, alignItems: 'center', paddingBottom: 10 },
  label: { color: COLORS.textSubtle, fontFamily: FONTS.medium, fontSize: 13, letterSpacing: 0.5 },
  labelActive: { color: COLORS.text },
  underline: { marginTop: 8, height: 2, width: '60%', borderRadius: 1, backgroundColor: 'transparent' },
  underlineActive: { backgroundColor: COLORS.indigo },
});
