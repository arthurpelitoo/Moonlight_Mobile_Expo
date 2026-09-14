import { Spinner } from "../../../components/common/Generic/Spinner";
import { useFetchGame } from "../../../hooks/fetchItems/fetchOne/useFetchGame";
import { HeroSection } from "./sections/HeroSection";
import { CategoryCarrouselCardSection } from "./sections/CategoryCarrouselCardSection";
import { AllGamesList } from "./sections/AllGamesList";
import { GamesUnder20List } from "./sections/GamesUnder20List";

function MainPage() {
  const {game, isLoading} = useFetchGame(1);

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-night-soft via-night to-night flex items-center justify-center">
        <Spinner variant="primary" />
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-night-soft via-night to-night flex flex-col items-center justify-center">
      {game && (
        <HeroSection game={game} />
      )}
      <CategoryCarrouselCardSection />
      <GamesUnder20List/>
      <AllGamesList/>
    </main>
  )
}


export default MainPage;
