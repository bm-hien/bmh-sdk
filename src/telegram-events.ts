import { TELEGRAM_UPDATE_TYPES, type TelegramChat, type TelegramUpdate, type TelegramUpdateType } from './telegram';

export type ParsedTelegramUpdate = {
  kind: 'command' | TelegramUpdateType;
  updateType: TelegramUpdateType;
  command?: string;
  text: string;
  chatId?: string;
  messageId?: string;
  callbackQueryId?: string;
  callbackData?: string;
  inlineMessageId?: string;
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
  return {
    kind: commandMatch ? 'command' : updateType,
    updateType,
    command: commandMatch?.[1],
    text: text || caption,
    chatId,
    messageId: stringId(message.message_id),
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
