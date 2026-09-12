import { View, Image, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import type { GameResponseDTO } from "@/src/@types/game/game.dto";
import { resolveImageUrl } from "@/src/utils/resolveImage/resolveImageUrl";
import { useTheme } from "@/src/contexts/ThemeContext";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { H1, P } from "@/src/components/common/Generic/Text";
import { useGlow } from "@/src/hooks/animation/useGlow";

type HeroSectionProps = {
  game: GameResponseDTO;
};

export function HeroSection({ game }: HeroSectionProps) {
  const glowOpacity = useGlow();
  const {theme, font, fontSize, space, radius} = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: resolveImageUrl(game.banner_image) }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* equivalente ao .gradient-overlay (fade de baixo pra cima) */}
      <LinearGradient
        colors={["transparent", theme.base]}
        locations={[0.4, 1.0]} // [0.4] até [1.0] 60%
        style={StyleSheet.absoluteFill}
      />

      {/* equivalente ao bg-black/40 */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.opacityBase }]} />

      <View style={styles.content}>
        <View style={[styles.badge, { borderColor: theme.backdrop }]}>
          <P style={[styles.badgeText, { color: theme.iconBase, fontFamily: font.baseSemibold }]}>
            Jogos Populares
          </P>
        </View>

        <H1 style={[styles.title, { color: theme.textPrimary, fontSize: fontSize.display, marginBottom: space[4] }]}>
          {game.title.toUpperCase()}
        </H1>

        <P
          style={[styles.description, { color: theme.textPrimary, fontSize: fontSize.lg, marginBottom: space[8] }]}
          numberOfLines={4} // equivalente funcional ao "max-w-lg" truncando texto longo
        >
          {game.description}
        </P>

          <View>
            <Animated.View
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: radius.md,
                backgroundColor: theme.blueCta,
                opacity: glowOpacity,
              }}
            />
            <Link href={`/games/${game.id_game}`} asChild>
              <Button variant="cta">
                Visitar a página do jogo
              </Button>
            </Link>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 600,
    overflow: "hidden",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 40,
  },
  badge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  title: {
    fontWeight: "900",
    textTransform: "uppercase",
    lineHeight: 40,
  },
  description: {
    lineHeight: 24,
  },
});
