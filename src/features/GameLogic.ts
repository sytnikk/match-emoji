import confetti from 'canvas-confetti'

import { type Observable } from '../core/Observable'
import { type CardState } from '../state/CardState'
import { type GameState } from '../state/GameState'

export class GameLogic {
  private openedCard?: CardState
  private delay?: Promise<void>

  constructor (
    private readonly gameState: GameState
  ) {}

  public async handleOpen (index: number): Promise<void> {
    await this.delay

    const currentCard = this.gameState.cards.value[index]
    this.openedCard = this.getOpenedCard(this.gameState.cards)

    if (this.isSameCard(currentCard, this.openedCard)) {
      return
    }

    this.toggleCard(currentCard)

    if (currentCard?.value === this.openedCard?.value) {
      this.setMatched(currentCard, this.openedCard)
      this.checkForWin(this.gameState.cards)
    } else {
      if (this.openedCard !== undefined) {
        this.incrementAttempts(this.gameState.attempts)
        this.delayedToggleCards(currentCard, this.openedCard)
      }
    }
  }

  private getOpenedCard (cards: Observable<CardState[]>): CardState | undefined {
    return cards.value.find(({ guessed, opened }) => !guessed && opened.value)
  }

  private isSameCard (card1: CardState | undefined, card2: CardState | undefined): boolean {
    return card1 === card2
  }

  private toggleCard (card: CardState): void {
    card.toggle()
  }

  private incrementAttempts (attempts: Observable<number>): void {
    attempts.set(attempts.value + 1)
  }

  private setMatched (card1: CardState, card2: CardState): void {
    card1.setGuessed()
    card2.setGuessed()
  }

  private checkForWin (cards: Observable<CardState[]>): void {
    const isUnsolvedLeft = cards.value.find(card => !card.guessed)

    if (isUnsolvedLeft === undefined) {
      setTimeout(async () => {
        const confetties = [];

        for (let index = 0; index < 5; index++) {
          confetties.push(confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: Math.random(),
              y: Math.random() - 0.2
            }
          }))
        }

        await Promise.all(confetties)
        this.gameState.end()
      }, 1000)
    }
  }

  private delayedToggleCards (card1: CardState, card2: CardState): void {
    this.delay = new Promise((resolve) => {
      setTimeout(() => {
        this.toggleCard(card1)
        this.toggleCard(card2)

        this.openedCard = undefined
        resolve()
      }, 500)
    })
  }
}
