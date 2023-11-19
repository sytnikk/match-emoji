import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'

import { GameState } from '../state/GameState'

import styles from '../styles/screens/game.scss?inline'

@customElement('app-game')
export class Game extends LitElement {
  readonly state = GameState.get()

  static styles = unsafeCSS(styles)

  private getCards (): TemplateResult[] {
    return this.state.cards.value.map((_, index) => {
      return html`<app-card index=${index} />`
    })
  }

  private readonly restart = (): void => {
    this.state.restart()
  }

  render (): TemplateResult {
    return html`
      <main class="screen">
        <header class="header">
          <app-score></app-score>
          <h1 class="title">Find all duplicates</h1>
          <app-timer></app-timer>
          <button class="restart-button" @click=${this.restart}>
            🔄
          </button>
        </header>
        <section class="container">
          ${this.getCards()}
        </section>
      </main>
    `
  }
}
