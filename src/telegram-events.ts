import {
  TELEGRAM_UPDATE_TYPES, type TelegramChat, type TelegramEventType, type TelegramSuccessfulPayment,
  type TelegramUpdate, type TelegramUpdateType,
} from './telegram';

export type ParsedTelegramUpdate = {
  kind: 'command' | TelegramEventType;
  updateType: TelegramUpdateType;
  command?: string;
  text: string;
  chatId?: string;
  messageId?: string;
  messageThreadId?: string;
  draftId?: string;
  businessConnectionId?: string;
  callbackQueryId?: string;
  callbackData?: string;
  inlineMessageId?: string;
  inlineQueryId?: string;
  shippingQueryId?: string;
  preCheckoutQueryId?: string;
  guestQueryId?: string;
  successfulPayment?: TelegramSuccessfulPayment;
  user?: { id?: string; firstName?: string; username?: string };
  chat?: { id?: string; type?: TelegramChat['type']; title?: string; username?: string };
};

const messageUpdateTypes = new Set<TelegramUpdateType>([
  'message',
  'edited_message',
  'channel_post',
  'edited_channel_post',
  'business_message',
  'edited_business_message',
  'guest_message',
]);

function object(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function stringId(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
}

function userFields(raw: Record<string, unknown> | null) {
  if (!raw) return undefined;
  return {
    id: stringId(raw.id),
    firstName: raw.first_name === undefined ? undefined : String(raw.first_name),
    username: raw.username === undefined ? undefined : String(raw.username),
  };
}

function chatFields(raw: Record<string, unknown> | null) {
  if (!raw) return undefined;
  const type = typeof raw.type === 'string' && ['private', 'group', 'supergroup', 'channel'].includes(raw.type)
    ? raw.type as TelegramChat['type']
    : undefined;
  return {
    id: stringId(raw.id),
    type,
    title: raw.title === undefined ? undefined : String(raw.title),
    username: raw.username === undefined ? undefined : String(raw.username),
  };
}

function successfulPaymentFields(raw: Record<string, unknown> | null): TelegramSuccessfulPayment | undefined {
  if (!raw || typeof raw.currency !== 'string' || !Number.isSafeInteger(raw.total_amount)
    || typeof raw.invoice_payload !== 'string' || typeof raw.telegram_payment_charge_id !== 'string'
    || typeof raw.provider_payment_charge_id !== 'string') return undefined;
  return {
    currency: raw.currency,
    total_amount: Number(raw.total_amount),
    invoice_payload: raw.invoice_payload,
    telegram_payment_charge_id: raw.telegram_payment_charge_id,
    provider_payment_charge_id: raw.provider_payment_charge_id,
    ...(typeof raw.shipping_option_id === 'string' ? { shipping_option_id: raw.shipping_option_id } : {}),
    ...(object(raw.order_info) ? { order_info: object(raw.order_info)! } : {}),
    ...(typeof raw.is_recurring === 'boolean' ? { is_recurring: raw.is_recurring } : {}),
    ...(typeof raw.is_first_recurring === 'boolean' ? { is_first_recurring: raw.is_first_recurring } : {}),
    ...(Number.isSafeInteger(raw.subscription_expiration_date) ? { subscription_expiration_date: Number(raw.subscription_expiration_date) } : {}),
  };
}

function parseCallback(callback: Record<string, unknown>): ParsedTelegramUpdate | null {
  const message = object(callback.message);
  const chat = object(message?.chat);
  const from = object(callback.from);
  const callbackQueryId = typeof callback.id === 'string' ? callback.id : '';
  if (!callbackQueryId) return null;
  const callbackData = typeof callback.data === 'string' ? callback.data : '';
  return {
    kind: 'callback_query',
    updateType: 'callback_query',
    text: callbackData,
    chatId: stringId(chat?.id),
    messageId: stringId(message?.message_id),
    messageThreadId: stringId(message?.message_thread_id),
    callbackQueryId,
    callbackData,
    inlineMessageId: typeof callback.inline_message_id === 'string' ? callback.inline_message_id : undefined,
    user: userFields(from),
    chat: chatFields(chat),
  };
}

function parseMessage(updateType: TelegramUpdateType, message: Record<string, unknown>): ParsedTelegramUpdate | null {
  const chat = object(message.chat);
  const chatId = stringId(chat?.id);
  if (!chatId) return null;
  const from = object(message.from) ?? object(message.sender_chat);
  const text = typeof message.text === 'string' ? message.text : '';
  const caption = typeof message.caption === 'string' ? message.caption : '';
  const commandMatch = updateType === 'message'
    ? text.trim().match(/^\/([A-Za-z0-9_]+)(?:@[A-Za-z0-9_]+)?(?:\s|$)/)
    : null;
  const successfulPayment = updateType === 'message' ? successfulPaymentFields(object(message.successful_payment)) : undefined;
  return {
    kind: commandMatch ? 'command' : successfulPayment ? 'successful_payment' : updateType,
    updateType,
    command: commandMatch?.[1],
    text: text || caption,
    chatId,
    messageId: stringId(message.message_id),
    messageThreadId: stringId(message.message_thread_id),
    businessConnectionId: stringId(message.business_connection_id),
    guestQueryId: updateType === 'guest_message' ? stringId(message.guest_query_id) : undefined,
    successfulPayment,
    user: userFields(from),
    chat: chatFields(chat),
  };
}

function parseGeneric(updateType: TelegramUpdateType, payload: Record<string, unknown>): ParsedTelegramUpdate {
  const nestedMessage = object(payload.message);
  const directChatId = stringId(payload.chat_id) ?? stringId(payload.user_chat_id);
  const chat = object(payload.chat) ?? object(payload.voter_chat) ?? object(payload.actor_chat)
    ?? object(payload.sender_chat) ?? object(nestedMessage?.chat) ?? (directChatId ? { id: directChatId } : null);
  const member = object(payload.member);
  const user = object(payload.from) ?? object(payload.user) ?? object(member?.user);
  const text = typeof payload.query === 'string' ? payload.query
    : typeof payload.data === 'string' ? payload.data
      : typeof payload.invoice_payload === 'string' ? payload.invoice_payload
        : typeof payload.paid_media_payload === 'string' ? payload.paid_media_payload
          : typeof payload.question === 'string' ? payload.question
            : typeof nestedMessage?.text === 'string' ? nestedMessage.text : '';
  return {
    kind: updateType,
    updateType,
    text,
    chatId: stringId(chat?.id),
    messageId: stringId(payload.message_id ?? nestedMessage?.message_id),
    messageThreadId: stringId(payload.message_thread_id ?? nestedMessage?.message_thread_id),
    draftId: updateType === 'stopped_message_generation' ? stringId(payload.draft_id) : undefined,
    businessConnectionId: stringId(payload.business_connection_id
      ?? (updateType === 'business_connection' ? payload.id : undefined)),
    inlineQueryId: updateType === 'inline_query' ? stringId(payload.id) : undefined,
    shippingQueryId: updateType === 'shipping_query' ? stringId(payload.id) : undefined,
    preCheckoutQueryId: updateType === 'pre_checkout_query' ? stringId(payload.id) : undefined,
    user: userFields(user),
    chat: chatFields(chat),
  };
}

/** Parse one Bot API update without assuming that a user ID is a destination chat ID. */
export function parseTelegramUpdate(update: TelegramUpdate): ParsedTelegramUpdate | null {
  if (!Number.isSafeInteger(update.update_id) || update.update_id < 0) return null;
  const record = update as Record<string, unknown>;
  const candidates = TELEGRAM_UPDATE_TYPES.flatMap((updateType) => {
    const payload = object(record[updateType]);
    return payload ? [{ updateType, payload }] : [];
  });
  if (candidates.length !== 1) return null;
  const [{ updateType, payload }] = candidates;
  if (updateType === 'callback_query') return parseCallback(payload);
  if (messageUpdateTypes.has(updateType)) return parseMessage(updateType, payload);
  return parseGeneric(updateType, payload);
}
