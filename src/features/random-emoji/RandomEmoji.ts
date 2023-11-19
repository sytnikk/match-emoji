import { emojis } from './emojis'

export class RandomEmoji {
  private readonly emojis: string[] = [...emojis]

  public get (): string {
    const randomIndex = Math.floor(Math.random() * emojis.length)
    const emoji = this.emojis[randomIndex]
    this.emojis.slice(randomIndex, 1)
    return emoji
  }
}
