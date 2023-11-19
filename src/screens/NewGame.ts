import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'

import { GameState } from '../state/GameState'
import { GAME_DIFFICULTIES } from '../core/config'

import styles from '../styles/screens/new-game.scss?inline'

@customElement('app-new-game')
export class Setting extends LitElement {
  readonly state = GameState.get()

  static styles = unsafeCSS(styles)

  private start (mode: number): void {
    this.state.start(mode)
  }

  private getDifficulties (): TemplateResult[] {
    return Object.entries(GAME_DIFFICULTIES).map(([name, mode]) => (
      html`
        <div class="card" @click=${this.start.bind(this, mode)}>
          ${name.toUpperCase()}
        </div>
      `
    ))
  }

  render (): TemplateResult {
    return html`
      <main class="screen">
        <h1 class="title">Choose the difficulty</h1>
        <section class="difficulties">
          ${this.getDifficulties()}
        </section>
      </main>
    `
  }
}
