import { LitElement, type TemplateResult, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { Screen } from './core/config'
import { GameState } from './state/GameState'

import './screens'
import './components'

@customElement('app-memory')
export class Memory extends LitElement {
  private readonly state = GameState.get()

  constructor () {
    super()

    this.state.screen.subscribe(() => {
      this.requestUpdate()
    })
  }

  render (): TemplateResult {
    switch (this.state.screen.value) {
      case Screen.NewGame:
        return html`<app-new-game/>`
      case Screen.Game:
        return html`<app-game />`
      case Screen.Results:
        return html`<app-results />`
      default:
        throw new Error('Unknown screen')
    }
  }
}
