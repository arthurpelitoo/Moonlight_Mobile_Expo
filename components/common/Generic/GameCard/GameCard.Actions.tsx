import { ShoppingCartIcon, TrashSimpleIcon } from "@phosphor-icons/react";
import { useBreakpoint } from "../../../../hooks/breakpoints/useBreakpoint";
import { Button } from "../Button/Button";
import type { GameCardProps } from "./GameCard.types";

export const RenderDefaultActions = (props : GameCardProps) => {
  const {isAlreadyInCart, isOwned, gamePage, onCart, onBuy, game} = props;
  const {isDesktop, isMobile, isTablet} = useBreakpoint();
  const showBuyButton = gamePage && isDesktop;
  const showVisitButton = gamePage && (isMobile || isTablet);
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
          {isAlreadyInCart ? <TrashSimpleIcon size={24} /> : <ShoppingCartIcon size={24}/>}
        </Button>
    </>
    )
  }

  return(
        <>

          {showBuyButton && (
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
          )}
          
          {showVisitButton && (
            <Button as="link" href={gamePage} variant="cta" className="rounded-md p-2 w-full animate-glow-cta">
              Visitar a Página
            </Button>
          )}

          {showCartButton && (
            <Button 
              variant={isAlreadyInCart ? "danger" : "primary"} 
              className={`rounded-md p-2 w-fit`}
              onClick={(e) => {
                e.stopPropagation();
                onCart();
              }}
            >
              {isAlreadyInCart ? <TrashSimpleIcon size={24} /> : <ShoppingCartIcon size={24}/>}
            </Button>
          )}
        </>
  );
}