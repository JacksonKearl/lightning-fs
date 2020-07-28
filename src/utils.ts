export const debounce = (f: () => void, delay: number) => {
  let timeout: any;
  return () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => f(), delay);
  };
};


export const once = <T extends any[]>(f: (...T) => void) => {
  let called = false;
  return (...args: T) => {
    if (!called) f(...args);
    called = true;
  };
};

export class Batcher<T> {
  private ongoing: Promise<void> | undefined;
  private items: { item: T; onProcessed: () => void }[] = [];

  constructor(private executor: (items: T[]) => Promise<void>) {}

  private async process() {
    const toProcess = this.items;
    this.items = [];
    await this.executor(toProcess.map(({ item }) => item));
    toProcess.map(({ onProcessed }) => onProcessed());
    if (this.items.length) {
      this.ongoing = this.process();
    } else {
      this.ongoing = undefined;
    }
  }

  async queue(item: T): Promise<void> {
    const result = new Promise<void>((resolve) => this.items.push({ item, onProcessed: resolve }));
    if (!this.ongoing) this.ongoing = new Promise((resolve) => setTimeout(resolve, 15)).then(() => this.process());
    return result;
  }
}