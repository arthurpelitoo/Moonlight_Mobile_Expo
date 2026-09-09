import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/src/style/colors';
import { FONTS } from '@/src/style/typography';

export default function LoginPage() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.text}>Tela de Login (em construção)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgBottom },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: COLORS.textSubtle, fontFamily: FONTS.regular },
});
