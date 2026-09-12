import { useMemo } from "react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { Carrousel } from "../../../../components/common/Generic/Carrousel";
import { CategoryCard } from "../../../../components/common/Generic/CategoryCard/CategoryCard";
import { CategoryCardSkeleton } from "../../../../components/common/Generic/CategoryCard/CategoryCardSkeleton";
import { useFetchPaginatedCategories } from "../../../../hooks/fetchItems/store/useFetchPaginatedCategories";
import type { CategoryPaginatedQueryPayload } from "../../../../@types/category/category.payload";
import { H2 } from "@/src/components/common/Generic/Text";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "@/src/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

export function CategoryCarrouselCardSection() {
  const { theme, space } = useTheme();
  const query: CategoryPaginatedQueryPayload = useMemo(() => ({
      page: 1,
      limit: 9,
      random: true,
      name: undefined,
  }), []);

  const { width } = useWindowDimensions();
  const cardsPerView = width < 500 ? 1 : width < 900 ? 2 : 3;
  const {categories, isLoading} = useFetchPaginatedCategories(query);

  const styles = StyleSheet.create({
    container: {
      position: "relative",
      width: "100%",
      gap: space[7],
      justifyContent: "center",
      alignItems: "center",
      minHeight: 300,
    },
    content: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      paddingBottom: 40,
    },
    fadeOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 0, // Ajuste a altura do fade conforme necessário
      zIndex: 10,
    }
  });


    return(
        <View style={styles.container}>

            <H2 style={{ textAlign: "center" }}>Categorias de Jogos a Explorar:</H2>
            <View style={{ width: "100%", justifyContent: "center"}}>
                <Carrousel cardsPerView={cardsPerView} containerWidth={width}>
                    {isLoading //está carregando? se sim placeholder carregando
                        ? Array.from({ length: cardsPerView }).map((_, i) => (<CategoryCardSkeleton key={i} />))
                        : (categories?.map(category => ( //carregou? então componente real
                          <Link href={`/categories/${category.id_category}`} asChild >
                            <CategoryCard category={category} />
                          </Link>
                    )))}
                </Carrousel>
            </View>
            {/* fade cima e baixo */}
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                <LinearGradient
                    colors={['transparent', theme.baseSoft]}
                    style={styles.fadeOverlay}
                />
            </View>
        </View>
    )
}
