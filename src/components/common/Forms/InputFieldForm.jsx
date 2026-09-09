import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { COLORS } from '../../../style/colors';
import { FONTS } from '../../../style/typography';

/**
 * Espelha o InputFieldForm web: label + ícone à esquerda + input +
 * rightElement opcional (ex: botão de mostrar/ocultar senha).
 *
 * Diferenças por ser RN:
 * - `type="email"/"password"` do web vira `keyboardType` +
 *   `secureTextEntry` (props nativas do TextInput).
 * - `onChangeState` no web recebia o evento; aqui já recebe o valor
 *   direto (padrão do TextInput.onChangeText), pra bater com como o
 *   useRegisterForm já espera (setField("nome") -> (valor) => void).
 */
export function InputFieldForm({  
  id,
  
  label,
  
  value,
  
  onChangeState,
  
  onBlur,
  
  maxLength,
  
  icon,
  
  placeholder,
 
  rightElement,
  
  secureTextEntry,
  
  keyboardType = 'default',
  
  autoCapitalize = 'sentences',
 
  inputMode,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.box, focused && styles.boxFocused]}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <TextInput
          testID={id}
          style={styles.input}
          value={value}
          onChangeText={onChangeState}
          onBlur={onBlur}
          onFocus={() => setFocused(true)}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSubtle}
          secureTextEntry={secureTextEntry}
          keyboardType={inputMode === 'numeric' ? 'numeric' : keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {rightElement ? <View style={styles.rightSlot}>{rightElement}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 4,
  },
  label: {
    color: COLORS.textSubtle,
    fontFamily: FONTS.medium,
    fontSize: 12,
    marginBottom: 6,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
  },
  boxFocused: {
    borderColor: COLORS.borderFocus,
  },
  icon: {
    marginRight: 8,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontFamily: FONTS.regular,
    fontSize: 14,
    height: '100%',
    paddingVertical: 0,
  },
  rightSlot: {
    marginLeft: 8,
  },
});
