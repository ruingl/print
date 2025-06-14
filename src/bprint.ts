import type { Options } from './types';

/**
 * Better print class.
 */
export class Bprint {
  private char: string;
  private msDelay: number;

  /**
   * Better print's constructor
   * @param options - Options object.
   */
  constructor(options?: Options) {
    this.char = options?.char || '*';
    this.msDelay = options?.msDelay || 100;
  }

  /**
   * Better print's delay
   * @param ms - Delay in ms
   */
  private delay(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }

  /**
   * Better print's slowPrint
   * @param text - Text to slowly print.
   */
  private async slowPrint(text: string): Promise<void> {
    for (const char of text) {
      process.stdout.write(char);
      await this.delay(this.msDelay);
    }
    process.stdout.write('\n');
  }

  public async print(text: string): Promise<void> {
    const lines = text.split('\n');
    const maxLen = Math.max(...lines.map(line => line.length));
    const border = this.char.repeat(maxLen + 4);

    await this.slowPrint(border);

    for (const line of lines) {
      await this.slowPrint(
        `${this.char} ${line.padEnd(maxLen)} ${this.char}`
      );
    }

    await this.slowPrint(border);
  }
}
