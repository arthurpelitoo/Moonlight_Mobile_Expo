import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS } from '../../../../style/colors';
import { FONTS } from '../../../../style/typography';

/**
 * Button genérico do Moonlight — espelha a API do Button web
 * (variant, disabled, onPress/onClick). O prop `as="link"` do web
 * não existe em RN; em telas mobile, navegação é sempre via onPress
 * + navigation.navigate, então esse prop é ignorado aqui.
 */
export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  ...rest
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'transparent' && styles.transparent,
        disabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text
          style={[
            styles.text,
            variant === 'transparent' && styles.textTransparent,
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  primary: {
    backgroundColor: COLORS.indigo,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  textTransparent: {
    color: COLORS.textSubtle,
    textTransform: 'none',
    fontFamily: FONTS.regular,
    fontSize: 12,
    letterSpacing: 0,
  },
});
