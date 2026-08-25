import type { TelegramApi, TelegramChat, TelegramMessage, TelegramUpdate, TelegramUpdateType, TelegramUser } from './telegram';

export type SDKBotPlatform = 'telegram' | 'discord';
export type BotEventName = TelegramUpdateType;

export type BotContext = {
  platform: SDKBotPlatform;
  update: TelegramUpdate;
  updateType: TelegramUpdateType;
  text?: string;
  chatId?: string;
  userId?: string;
  messageId?: string;
  callbackQueryId?: string;
  callbackData?: string;
  user?: { id?: string; firstName?: string; username?: string; raw?: TelegramUser };
  chat?: { id?: string; type?: TelegramChat['type']; title?: string; username?: string; raw?: TelegramChat };
  message?: TelegramMessage;
  reply(text: string): Promise<unknown>;
  when(expression: string): boolean;
  http: {
    get(url: string): Promise<unknown>;
    request(url: string, options?: { method?: string }): Promise<unknown>;
  };
  telegram: TelegramApi;
  step(type: string, config?: Record<string, unknown>): Promise<unknown>;
};

export type BotHandler = (context: BotContext) => unknown | Promise<unknown>;
