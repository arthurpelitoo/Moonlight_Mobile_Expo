import { GameResponseDTO } from "@/src/@types/game/game.dto";
import { Href } from "expo-router";

export type GameCardProps = {
  game: GameResponseDTO;
  onCart: () => Promise<void>
  onBuy: () => Promise<void>
  gamePage: Href;
  isAlreadyInCart: boolean
  isOwned: boolean
  actions?: React.ReactNode
}
