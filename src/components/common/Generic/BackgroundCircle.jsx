import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS } from '../../../../style/colors';

/**
 * Círculo decorativo de fundo (glow sutil atrás do card de auth).
 * Em RN não temos filter/blur de CSS, então simulamos o "glow" com
 * uma sombra grande e baixa opacidade num círculo absoluto.
 */
export function BackgroundCircle() {
  return (
    <View pointerEvents="none" style={styles.wrap}>
      <View style={styles.circle} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle: {
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: COLORS.indigo,
    opacity: 0.12,
    // "glow" via shadow (mais visível em iOS; Android usa elevation)
    shadowColor: COLORS.indigo,
    shadowOpacity: 0.6,
    shadowRadius: 80,
    shadowOffset: { width: 0, height: 0 },
  },
});
