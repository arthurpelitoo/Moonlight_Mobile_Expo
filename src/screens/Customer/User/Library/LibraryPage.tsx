import { useContext, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    useWindowDimensions,
} from "react-native";
import { ShoppingCartIcon } from "phosphor-react-native";
import { useFetchLibrary } from "@/src/hooks/fetchItems/store/useFetchLibrary";
import { useCart } from "@/src/hooks/cart/useCart";
import { LibraryContext } from "@/src/hooks/library/useLibrary";
import { useTheme } from "@/src/contexts/ThemeContext";
import { Spinner } from "@/src/components/common/Generic/Spinner";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { CardHeader } from "@/src/components/common/Generic/Card/CardHeader";
import { CardContent } from "@/src/components/common/Generic/Card/CardContent";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { GameCard } from "@/src/components/common/Generic/GameCard/GameCard";
import type { GameResponseDTO } from "@/src/@types/game/game.dto";
import { Link } from "expo-router";

function getColumns(width: number) {
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    return 1;
}

function LibraryPage() {
    const { games: libraryGames, isLoading } = useFetchLibrary();
    const { addItemToCart, removeItemFromCart, items } = useCart();
    const { isOwned } = useContext(LibraryContext);
    const { theme, font, fontSize, space, radius } = useTheme();
    const { width } = useWindowDimensions();
    const numColumns = getColumns(width);

    const styles = useMemo(
        () => getStyles(theme, font, fontSize, space, radius),
        [theme, font, fontSize, space, radius]
    );

    const isInCart = (id: number) =>
        items.some(cartItem => cartItem.id_game === id);

    const toCartItem = (game: GameResponseDTO) => ({
        id_game: game.id_game!,
        title: game.title,
        price: game.price,
        image: game.image,
        categories: game.categories,
    });

    const handleToggleCart = (game: GameResponseDTO) => {
        isInCart(game.id_game!)
            ? removeItemFromCart(game.id_game!)
            : addItemToCart(toCartItem(game));
    };

    const handleBuy = (game: GameResponseDTO) => {
        addItemToCart(toCartItem(game), "cart");
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <Spinner />
            </View>
        );
    }

    if (!libraryGames || libraryGames.length === 0) {
        return (
            <View style={styles.centered}>
                <Card style={styles.emptyCard}>
                    <CardHeader style={styles.emptyCardHeader}>
                        <Text style={styles.emptyTitle}>
                            Você ainda não adquiriu jogos na loja
                        </Text>
                    </CardHeader>
                    <CardContent style={styles.emptyCardContent}>
                        <Link asChild href={"/(customer)/(tabs)/home"} 
                        >
                            <Button
                            variant="cta"
                            style={styles.emptyButton}
                            >
                            <ShoppingCartIcon size={28} color={theme.ctaText} />
                            <Text style={styles.emptyButtonText}>Ver jogos</Text>
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </View>
        );
    }

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meus Jogos</Text>
            </View>

            <View style={styles.container}>
                <FlatList
                    key={numColumns}
                    data={libraryGames}
                    numColumns={numColumns}
                    keyExtractor={item => String(item.id_game)}
                    columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
                    contentContainerStyle={styles.list}
                    renderItem={({ item: game }) => {
                        const alreadyInCart = items.some(cartItem => cartItem.id_game === game.id_game);
                    const cartItem = { id_game: game.id_game!,
                    title: game.title, price: game.price,
                    image: game.image, categories: game.categories}

                        return (
                            <View
                                style={[
                                    styles.cardWrapper,
                                    { width: `${100 / numColumns}%` },
                                ]}
                            >
                                <GameCard
                                    game={game}
                                    onCart={() => alreadyInCart 
                                    ? removeItemFromCart(game.id_game!)
                                    : addItemToCart(cartItem)}

                                    onBuy={() => addItemToCart(game, "cart")}
                                    gamePage={{
                                        pathname: "/games/[id]",
                                        params: { id: String(game.id_game) },
                                    }}
                                    isAlreadyInCart={alreadyInCart}
                                    isOwned={isOwned(game.id_game!)}
                                />
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}

const getStyles = (
    theme: ReturnType<typeof useTheme>["theme"],
    font: ReturnType<typeof useTheme>["font"],
    fontSize: ReturnType<typeof useTheme>["fontSize"],
    space: ReturnType<typeof useTheme>["space"],
    radius: ReturnType<typeof useTheme>["radius"]
) =>
    StyleSheet.create({
        centered: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.base,
        },
        main: {
            flex: 1,
            backgroundColor: theme.base,
            paddingTop: space[6],
            paddingHorizontal: space[4],
        },
        header: {
            marginBottom: space[9],
            alignSelf: "center",
            backgroundColor: theme.opacityBase,
            borderRadius: radius.lg,
            padding: space[4],
            borderWidth: 1,
            borderColor: theme.borderBase,
        },
        headerTitle: {
            fontSize: fontSize.h2,
            fontFamily: font.baseSemibold,
            color: theme.textPrimary,
            textAlign: "center",
            paddingHorizontal: space[7],
        },
        container: {
            flex: 1,
            width: "100%",
            backgroundColor: theme.opacityBase,
            borderRadius: radius.lg,
            padding: space[4],
            borderWidth: 1,
            borderColor: theme.borderBase,
        },
        list: {
            gap: space[4],
        },
        row: {
            gap: space[4],
        },
        cardWrapper: {
            paddingHorizontal: space[2],
            marginBottom: space[4],
        },
        emptyCard: {
            padding: space[8],
            backgroundColor: theme.surfaceCard,
        },
        emptyCardHeader: {
            marginBottom: space[8],
        },
        emptyTitle: {
            textAlign: "center",
            fontSize: fontSize.h2,
            fontFamily: font.baseSemibold,
            color: theme.textPrimary,
        },
        emptyCardContent: {
            flexDirection: "row",
            justifyContent: "center",
        },
        emptyButton: {
            padding: space[4],
            flexDirection: "row",
            gap: space[2],
            alignItems: "center",
            borderRadius: radius.base,
            backgroundColor: theme.blueCta,
        },
        emptyButtonText: {
            color: theme.ctaText,
            fontFamily: font.baseMedium,
            fontSize: fontSize.md,
        },
    });

export default LibraryPage;