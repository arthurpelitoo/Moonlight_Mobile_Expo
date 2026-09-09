import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../../../../style/colors';
import { FONTS } from '../../../../style/typography';

// Mesma régua de força usada no site — se o projeto já tiver essa
// lógica em utils/Validation/dataRules/User, importe de lá no lugar
// desta função local pra não duplicar regra de negócio.
function getStrength(password) {
  if (!password) return { level: 0, label: '', color: COLORS.border };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: 'Fraca', color: COLORS.danger };
  if (score <= 3) return { level: 2, label: 'Razoável', color: COLORS.warning };
  return { level: 3, label: 'Forte', color: COLORS.success };
}

export function PasswordStrength({ password, showError }) {
  if (!password) return null;
  const strength = getStrength(password);

  return (
    <View style={styles.wrap}>
      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            { width: `${(strength.level / 3) * 100}%`, backgroundColor: strength.color },
          ]}
        />
      </View>
      <Text style={[styles.label, { color: strength.color }]}>{strength.label}</Text>
      {showError ? <Text style={styles.error}>Senha muito curta</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 4,
    marginBottom: 8,
  },
  barBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right',
  },
  error: {
    color: COLORS.danger,
    fontFamily: FONTS.regular,
    fontSize: 11,
    marginTop: 2,
  },
});
