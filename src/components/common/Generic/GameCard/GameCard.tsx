import { formatCurrency } from "../../../../utils/currencyFormatter/formatCurrency";
import type { GameCardProps } from "./GameCard.types";
import { resolveImageUrl } from "../../../../utils/resolveImage/resolveImageUrl";
import { Card } from "../Card/Card";
import { Link } from "expo-router";
import { RenderDefaultActions } from "./GameCard.Actions";
import { Image, View } from "react-native";
import { H3, P } from "../Text";
import { CardContent } from "../Card/CardContent";

export function GameCard(props: GameCardProps) {
  const { game, gamePage, actions, isOwned } = props;

  return (
      <Card style={{height: "auto"}}>
          <Link href={gamePage}>
              <Image
                source={{ uri: resolveImageUrl(game.image) }}
                style={{ height: 256, borderRadius: 8, width: "100%" }}
                resizeMode="contain"
              />
                <CardContent style={{ marginTop: 4, alignItems: "center", width: "100%" }}>
                  <H3 numberOfLines={1}>{game.title}</H3>
                  <View style={{ height: 24 }}>
                    {!isOwned ? (
                      <P>
                        {game.price == 0 ? "Grátis" : formatCurrency(game.price)}
                      </P>
                    ) : (
                      <P>Na Biblioteca</P>
                    )}
                  </View>
                </CardContent>
          </Link>
          <View style={{gap: 4, marginTop: 8, alignItems: "center", flexDirection: "row"}}>
            {
              actions ?? <RenderDefaultActions {...props} />}
          </View>
      </Card>
  );
}
