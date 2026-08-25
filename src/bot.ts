import type { BotContext, BotEventName, BotHandler } from './types';

/** A small, runtime-neutral registry for Telegram commands and update handlers. */
export class Bot {
  private readonly commands = new Map<string, BotHandler>();
  private readonly listeners = new Map<BotEventName, BotHandler[]>();
  private readonly callbacks = new Map<string, BotHandler[]>();

  command(name: string, handler: BotHandler) {
    const command = String(name ?? '').trim().replace(/^\/+/, '');
    if (!command || !/^[A-Za-z0-9_]+$/.test(command)) {
      throw new Error('A command must contain only letters, digits, or underscores.');
    }
    this.commands.set(command, handler);
    return this;
  }

  on(event: BotEventName, handler: BotHandler) {
    const handlers = this.listeners.get(event) ?? [];
    handlers.push(handler);
    this.listeners.set(event, handlers);
    return this;
  }

  callback(data: string, handler: BotHandler) {
    const key = String(data ?? '');
    const handlers = this.callbacks.get(key) ?? [];
    handlers.push(handler);
    this.callbacks.set(key, handlers);
    return this;
  }

  /** Used by delivery adapters; most applications should register handlers instead. */
  async dispatch(type: 'command' | BotEventName, payload: unknown, context: BotContext) {
    if (type === 'command') {
      await this.commands.get(String(payload ?? '').replace(/^\/+/, ''))?.(context);
      return;
    }
    if (type === 'callback_query') {
      const data = String(payload ?? '');
      for (const handler of this.callbacks.get(data) ?? []) await handler(context);
      if (data) for (const handler of this.callbacks.get('') ?? []) await handler(context);
    }
    for (const handler of this.listeners.get(type) ?? []) await handler(context);
  }
}
