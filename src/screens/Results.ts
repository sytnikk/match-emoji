import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'

import { GameState } from '../state/GameState'

import styles from '../styles/screens/results.scss?inline'

@customElement('app-results')
export class Results extends LitElement {
  readonly state = GameState.get()

  static styles = unsafeCSS(styles)

  private readonly restart = (): void => {
    this.state.restart()
  }

  render (): TemplateResult {
    return html`
      <main class="screen">
        <h1 class="title">Well done!</h1>
        <p class="title">Your time: ${this.state.time}</p>
        <p class="title">Your attempts: ${this.state.attempts.value}</p>
        <button class="restart-button" @click=${this.restart}>
          Restart
        </button>
      </main>
    `
  }
}
