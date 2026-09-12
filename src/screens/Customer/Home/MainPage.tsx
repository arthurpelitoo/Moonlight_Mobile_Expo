import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { Spinner } from "@/src/components/common/Generic/Spinner";
import { useFetchGame } from "@/src/hooks/fetchItems/fetchOne/useFetchGame";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeroSection } from "./sections/HeroSection";
import { ScrollView } from "react-native";
import { CategoryCarrouselCardSection } from "./sections/CategoryCarrouselCardSection";

export default function Home() {
  const { game, isLoading } = useFetchGame(1);

  if (isLoading) {
    return (
      <GradientBackground style={{ justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </GradientBackground>
    );
  }

    return (
      <GradientBackground>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {game && <HeroSection game={game} />}
            <CategoryCarrouselCardSection />
            {/*<GamesUnder20List />*/}
            {/*<AllGamesList />*/}
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    )
}
