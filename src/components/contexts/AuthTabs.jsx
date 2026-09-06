import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { COLORS } from '../../../style/colors';
import { FONTS } from '../../../style/typography';

/**
 * Alternância "Entrar" / "Criar conta" no topo do card de autenticação.
 * Assume React Navigation — se o projeto usa outra navegação, troca
 * o useNavigation()/route.name por props (activeTab, onChangeTab).
 */
export function AuthTabs() {
  const navigation = useNavigation();
  const route = useRoute();
  const isRegister = route.name === 'Register';

  return (
    <View style={styles.wrap}>
      <Tab
        label="Entrar"
        active={!isRegister}
        onPress={() => navigation.navigate('Login')}
      />
      <Tab
        label="Criar conta"
        active={isRegister}
        onPress={() => navigation.navigate('Register')}
      />
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
  wrap: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  label: {
    color: COLORS.textSubtle,
    fontFamily: FONTS.medium,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  labelActive: {
    color: COLORS.text,
  },
  underline: {
    marginTop: 8,
    height: 2,
    width: '60%',
    borderRadius: 1,
    backgroundColor: 'transparent',
  },
  underlineActive: {
    backgroundColor: COLORS.indigo,
  },
});
