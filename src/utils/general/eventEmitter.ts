export type EventTypes = {
  login: undefined;
  logout: undefined;
  displayProducts: undefined;
  promoCodeApplied: { discountCode: string; totalPrice: number };
};

export class EventEmitter<T> {
  private listeners: { [K in keyof T]?: ((data: T[K]) => void)[] } = {};

  on<K extends keyof T>(eventType: K, listener: (data: T[K]) => void): void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType]!.push(listener);
  }

  emit<K extends keyof T>(eventType: K, data: T[K]): void {
    const listeners = this.listeners[eventType];
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }
}

export const appEvents = new EventEmitter<EventTypes>();