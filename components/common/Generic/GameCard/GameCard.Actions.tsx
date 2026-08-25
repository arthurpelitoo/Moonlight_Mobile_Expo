import { Button } from "../Button/Button";
import type { GameCardProps } from "./GameCard.types";

export const RenderDefaultActions = (props : GameCardProps) => {
  const {isAlreadyInCart, isOwned, gamePage, onCart, onBuy, game} = props;
  const showBuyButton = gamePage;
  const showCartButton = gamePage;

  if (isOwned) {
    return (
      <Button
        variant="cta"
        className="rounded-md p-2 w-full animate-glow-cta"
        onClick={(e) => {
          e.stopPropagation();
          window.open(game.link);
        }}
      >
        Baixar
      </Button>
    );
  }

  if(showBuyButton && props.game.price == 0){
    return(
      <>
        <Button 
          variant="cta" 
          className="rounded-md p-2 w-full animate-glow-cta" 
          onClick={(e) => {
            e.stopPropagation();
            onBuy();
          }}
        >
          Obter Jogo 
        </Button>
        <Button 
          variant={isAlreadyInCart ? "danger" : "primary"} 
          className={`rounded-md p-2 w-fit`}
          onClick={(e) => {
            e.stopPropagation();
            onCart();
          }}
        >
          
        </Button>
    </>
    )
  }

  return(
        <>

          
            <Button 
              variant="cta" 
              className="rounded-md p-2 w-full animate-glow-cta" 
              onClick={(e) => {
                e.stopPropagation();
                onBuy();
              }}
            >
              Comprar
            </Button>

          
            <Button 
              variant={isAlreadyInCart ? "danger" : "primary"} 
              className={`rounded-md p-2 w-fit`}
              onClick={(e) => {
                e.stopPropagation();
                onCart();
              }}
            >
            </Button>

        </>
  );
}