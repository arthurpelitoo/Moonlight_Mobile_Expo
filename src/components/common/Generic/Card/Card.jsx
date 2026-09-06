import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS } from '../../../../style/colors';

/**
 * Card padrão do Moonlight — no web usa bg-white/5 + backdrop-blur.
 * RN não tem backdrop-blur nativo sem lib extra (expo-blur), então
 * aproximamos com um fundo sólido semi-transparente sobre o
 * BackgroundCircle, que já dá a sensação de profundidade.
 */
export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 6,
    padding: 24,
  },
});
