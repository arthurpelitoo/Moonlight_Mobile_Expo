import React, { useRef } from "react"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import { Button } from "./Button/Button"


type CarrouselProps = {
    children?: React.ReactNode
    cardsPerView?: number
}

export function Carrousel({children, cardsPerView = 3} : CarrouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    function scrollLeft() {
        scrollRef.current?.scrollBy({
            left: - scrollRef.current.clientWidth, 
            behavior: "smooth" 
        })
    }

    function scrollRight() {
        scrollRef.current?.scrollBy({ 
            left: scrollRef.current.clientWidth,
            behavior: "smooth" 
        })
    }

  return (
    <div className="relative">

        {/* botão esquerda */}
        <Button
            as="button"
            onClick={scrollLeft}
            icon={<CaretLeftIcon size={32} weight="regular" color="white" />}
            variant="secondary"
            className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 cursor-pointer"
        />

        {/* conteúdo */}
        <div
            ref={scrollRef}
            className="flex gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory"
            >
            {React.Children.map(children, (child) => (
                <div
                className="snap-start"
                style={{
                    minWidth: `calc((100% - ${(cardsPerView - 1) * 16}px)/ ${cardsPerView})`, 
                    // (100% do espaço - (cards visiveis na tela - 1) * 16px de espaço gap) / cards visiveis na tela)
                    // ? itens + espaço entre eles (gap)
                    // Layout com gap SEMPRE precisa compensar no cálculo

                }}
                >
                    {child}
                </div>
            ))}
        </div>

        {/* botão direita */}
        <Button
            as="button"
            onClick={scrollRight}
            icon={<CaretRightIcon size={32} weight="regular" color="white" />}
            variant="secondary"
            className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 cursor-pointer"
        />
    </div>
  );
}
