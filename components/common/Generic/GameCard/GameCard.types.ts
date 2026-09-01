import type { GameResponseDTO } from "../../../../@types/game/game.dto";

export type GameCardProps = {
  game: GameResponseDTO;
  onCart: () => void
  onBuy: () => void
  gamePage: string
  isAlreadyInCart: boolean
  isOwned: boolean
  actions?: React.ReactNode
}