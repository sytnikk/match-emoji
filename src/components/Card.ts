import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { GameState } from '../state/GameState'
import { type CardState } from '../state/CardState'

import styles from '../styles/components/card.scss?inline'

@customElement('app-card')
export class Game extends LitElement {
  private readonly gameState = GameState.get()
  private cardState?: CardState

  static styles = unsafeCSS(styles)

  @property()
  private readonly classes = { opened: false, card: true }

  @property({ type: Number, attribute: 'index' })
  private index?: number

  attributeChangedCallback (name: string, _old: string | null, value: string | null): void {
    if (name !== 'index' || value === null) return

    this.index = Number(value)
    this.cardState = this.gameState.card(this.index)

    this.cardState.opened.subscribe((newValue) => {
      this.classes.opened = newValue
      this.requestUpdate()
    })
  }

  private readonly open = async (): Promise<void> => {
    if (typeof this.index !== 'number') return
    if (this.cardState !== undefined && this.cardState.guessed) return

    await this.gameState.open(this.index)
  }

  render (): TemplateResult {
    return html`
      <div @click=${this.open} class=${classMap(this.classes)}>
        <div class="card__front"></div>
        <div class="card__back">
          ${this?.cardState?.value}
        </div>
      </div>
    `
  }
}
