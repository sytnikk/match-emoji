import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'

import { GameState } from '../state/GameState'

import styles from '../styles/components/title.scss?inline'

@customElement('app-score')
export class Score extends LitElement {
  private readonly state = GameState.get()

  static styles = unsafeCSS(styles)

  constructor () {
    super()

    this.state.attempts.subscribe(() => {
      this.requestUpdate()
    })
  }

  render (): TemplateResult {
    return html`
      <div class="title">
        Attempts: ${this.state.attempts.value}
      </div>
    `
  }
}
