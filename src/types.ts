import type { TelegramApi, TelegramChat, TelegramEventType, TelegramMessage, TelegramSuccessfulPayment, TelegramUpdate, TelegramUpdateType, TelegramUser } from './telegram';

export type SDKBotPlatform = 'telegram' | 'discord';
export type BotEventName = TelegramEventType;

export type BotContext = {
  platform: SDKBotPlatform;
  update: TelegramUpdate;
  updateType: TelegramUpdateType;
  text?: string;
  chatId?: string;
  userId?: string;
  messageId?: string;
  messageThreadId?: string;
  draftId?: string;
  businessConnectionId?: string;
  callbackQueryId?: string;
  callbackData?: string;
  inlineQueryId?: string;
  shippingQueryId?: string;
  preCheckoutQueryId?: string;
  guestQueryId?: string;
  user?: { id?: string; firstName?: string; username?: string; raw?: TelegramUser };
  chat?: { id?: string; type?: TelegramChat['type']; title?: string; username?: string; raw?: TelegramChat };
  message?: TelegramMessage;
  successfulPayment?: TelegramSuccessfulPayment;
  reply(text: string): Promise<unknown>;
  when(expression: string): boolean;
  http: {
    get(url: string): Promise<unknown>;
    request(url: string, options?: { method?: string }): Promise<unknown>;
  };
  telegram: TelegramApi;
  run(flowFunction: BotFlowFunction): Promise<unknown>;
  step(type: string, config?: Record<string, unknown>): Promise<unknown>;
};

export type BotHandler = (context: BotContext) => unknown | Promise<unknown>;

export type BotFlowFunction = {
  readonly __bmhFlowFunction: true;
  readonly name: string;
  readonly handler: BotHandler;
};
