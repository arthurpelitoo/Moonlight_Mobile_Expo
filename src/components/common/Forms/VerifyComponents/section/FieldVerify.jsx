import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { COLORS } from '../../../../../style/colors';
import { FONTS } from '../../../../../style/typography';

/**
 * Mesma peça do web: mostra a mensagem de erro só quando o campo já
 * foi "tocado" (showError) e ainda não passou na validação (passed).
 * Não usa ícone de check/x aqui pra manter leve — só o texto some/
 * aparece, igual ao comportamento do site.
 */
export function FieldVerify({ passed, showError, errorMessage }) {
  if (passed || !showError) return null;
  return <Text style={styles.error}>{errorMessage}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: COLORS.danger,
    fontFamily: FONTS.regular,
    fontSize: 11,
    marginTop: 4,
    marginBottom: 8,
  },
});
