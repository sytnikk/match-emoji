import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { GameState } from '../state/GameState'

import styles from '../styles/components/title.scss?inline'

@customElement('app-timer')
export class Timer extends LitElement {
  private readonly gameState = GameState.get()

  static styles = unsafeCSS(styles)

  @property({ type: Number }) hours = 0
  @property({ type: Number }) minutes = 0
  @property({ type: Number }) seconds = 0

  private intervalId?: number

  connectedCallback (): void {
    super.connectedCallback()

    this.intervalId = setInterval(() => {
      this.tick()
    }, 1000)
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()
    clearInterval(this.intervalId)
  }

  private tick (): void {
    if (this.seconds === 59) {
      this.seconds = 0
      if (this.minutes === 59) {
        this.minutes = 0
        this.hours++
      } else {
        this.minutes++
      }
    } else {
      this.seconds++
    }

    this.gameState.time = this.time
  }

  private formatNumber (num: number): string {
    return num.toString().padStart(2, '0')
  }

  get time (): string {
    return `${this.formatNumber(this.hours)}:${this.formatNumber(this.minutes)}:${this.formatNumber(this.seconds)}`
  }

  render (): TemplateResult {
    return html`
      <div class="title">
        Time: ${this.time}
      </div>
    `
  }
}
