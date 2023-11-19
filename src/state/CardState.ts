import { Observable } from '../core/Observable'

export class CardState {
  public opened = new Observable<boolean>(false)
  public guessed = false

  constructor (
    public value: string
  ) {}

  public toggle (): void {
    this.opened.set(!this.opened.value)
  }

  public setGuessed (): void {
    this.guessed = true
  }
}
