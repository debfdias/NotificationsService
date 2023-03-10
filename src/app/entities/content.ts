export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentValid = this.validateLength(content);

    if (!isContentValid) {
      throw new Error('Content not valid!');
    }

    this.content = content;
  }
}
