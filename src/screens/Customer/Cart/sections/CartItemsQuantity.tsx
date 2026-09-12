import { ShoppingCartIcon } from "@phosphor-icons/react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { Card, CardContent, CardHeader } from "../../../../components/common/Generic/Card";

type CartItemsQuantityProps = {
    quantity: number
}

export function CartItemsQuantity({quantity} : CartItemsQuantityProps){

    if(quantity > 0){
        return(
            <Card className="flex flex-col gap-10 border p-8">
                <CardHeader><h1 className="text-2xl text-center">Seu Carrinho</h1></CardHeader>
                <CardContent className="flex justify-center">
                    Tem {quantity} {quantity > 1 ? "itens" : "item"}
                </CardContent>
            </Card>
        )
    } else{
        return(
            <Card className="flex flex-col gap-10 border p-16">
                <CardHeader><h1 className="text-2xl text-center">Seu carrinho está vazio.</h1></CardHeader>
                <CardContent className="flex justify-center">
                    <Button as="link" href="/" variant="cta" className="p-4 flex gap-2 items-center rounded-md">
                       <ShoppingCartIcon size={28}/> Ver jogos
                    </Button> 
                </CardContent>
                
            </Card>
        )
    }
}