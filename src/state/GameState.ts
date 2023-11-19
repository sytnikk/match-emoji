import { Screen } from '../core/config'

import { Observable } from '../core/Observable'
import { GameLogic } from '../features/GameLogic'
import { RandomEmoji } from '../features/random-emoji/RandomEmoji'

import { CardState } from './CardState'

export class GameState {
  private static instance: GameState | null = null
  readonly gameLogic: GameLogic

  public screen: Observable<Screen>
  public cards: Observable<CardState[]>
  public attempts: Observable<number>
  public time: string = '00:00:00'
  public mode?: number

  private constructor () {
    this.screen = new Observable<Screen>(Screen.NewGame)
    this.cards = new Observable<CardState[]>([])
    this.attempts = new Observable<number>(0)
    this.gameLogic = new GameLogic(this)
  }

  public static get (): GameState {
    if (GameState.instance === null) {
      GameState.instance = new GameState()
    }

    return GameState.instance
  }

  public card (index: number): CardState {
    return this.cards.value[index]
  }

  public start (mode: number): void {
    this.mode = mode
    this.attempts.set(0)
    this.time = '00:00:00'

    const randomEmoji = new RandomEmoji()
    const cards = []

    for (let index = 0; index < mode; index++) {
      const emoji = randomEmoji.get()
      cards.push(new CardState(emoji), new CardState(emoji))
    }

    this.cards.set(cards.sort(() => 0.5 - Math.random()))
    this.screen.set(Screen.Game)
  }

  public async open (index: number): Promise<void> {
    await this.gameLogic.handleOpen(index)
  }

  public end (): void {
    this.screen.set(Screen.Results)
  }

  public restart (): void {
    this.screen.set(Screen.NewGame)
  }
}
