export class Observable<T> {
  public value: T

  private readonly subscribers: Array<(newValue: T, oldValue: T) => void> = []

  constructor (value: T) {
    this.value = value
  }

  public set (value: T): void {
    const oldValue = this.value
    this.value = value

    this.subscribers.forEach(f => {
      f(value, oldValue)
    })
  }

  public subscribe (callback: (newValue: T, oldValue: T) => void): void {
    this.subscribers.push(callback)
  }
}
