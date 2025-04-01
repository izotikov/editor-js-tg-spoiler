import {type InlineToolConstructorOptions} from "@editorjs/editorjs/types/tools/inline-tool";

export default class Spoiler {

  static get isInline(): boolean {
    return true;
  }

  static get sanitize() {
    return {
      span: {
        class: 'tg-spoiler',
      },
    };
  }

  static get shortcut(): string {
    return 'CMD+S';
  }

  private _state: boolean = false;
  private button!: HTMLButtonElement;
  private readonly tag: string = 'SPAN';
  private readonly class: string = 'tg-spoiler';
  private api: InlineToolConstructorOptions['api'];

  constructor({ api }: InlineToolConstructorOptions) {
    this.api = api;
  }

  render(): HTMLButtonElement {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M14.5 8.50001C13.5 7 10.935 6.66476 9.75315 7.79706C9.27092 8.25909 9 8.88574 9 9.53915C9 10.1926 9.27092 10.8192 
      9.75315 11.2812C10.9835 12.46 13.0165 11.5457 14.2468 12.7244C14.7291 13.1865 15 13.8131 15 14.4665C15 15.1199 14.7291 
      15.7466 14.2468 16.2086C12.8659 17.5317 10 17.5 9 16"></path>
      </svg>
    `;
    this.button.classList.add(this.api.styles.inlineToolButton);
    return this.button;
  }

  surround(range: Range): void {
    if (this.state) {
      this.unwrap(range);
      return;
    }
    this.wrap(range);
  }

  wrap(range: Range): void {
    const selectedText = range.extractContents();
    const span = document.createElement(this.tag);
    span.classList.add(this.class);
    span.appendChild(selectedText);
    range.insertNode(span);

    this.api.selection.expandToTag(span);
  }

  unwrap(range: Range): void {
    const span = this.api.selection.findParentTag(this.tag, this.class);
    if (!span) {
      return;
    }
    const text = range.extractContents();
    span.remove();
    range.insertNode(text);
  }

  checkState(): void {
    const span = this.api.selection.findParentTag(this.tag, this.class);
    this.state = !!span;
  }

  clear(): void {
    // No additional actions to clear for Spoiler
  }

  get state(): boolean {
    return this._state;
  }

  set state(state: boolean) {
    this._state = state;
    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }
}
