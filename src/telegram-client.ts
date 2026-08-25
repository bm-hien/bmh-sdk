import type { Bot } from './bot';
import { runFlowFunction } from './functions';
import { parseTelegramUpdate, type ParsedTelegramUpdate } from './telegram-events';
import type { BotContext } from './types';
import type {
  TelegramAdministratorRights,
  TelegramApi,
  TelegramChatAction,
  TelegramChatPermissions,
  TelegramForumTopic,
  TelegramMessage,
  TelegramMethod,
  TelegramParamsFor,
  TelegramParseMode,
  TelegramUpdate,
  TelegramUpdateType,
} from './telegram';
import {
  TELEGRAM_ADMINISTRATOR_RIGHT_FIELDS,
  TELEGRAM_CHAT_PERMISSION_FIELDS,
  TELEGRAM_METHODS,
  TELEGRAM_UPDATE_TYPES,
  buildTelegramInvoice,
  buildTelegramForumTopicCreate,
  buildTelegramForumTopicEdit,
  buildTelegramForumTopicTarget,
  buildTelegramChecklistEdit,
  buildTelegramChecklistSend,
  buildTelegramMessageDraft,
  buildTelegramGuestQueryAnswer,
  buildTelegramInlineQueryAnswer,
  buildTelegramPreCheckoutQueryAnswer,
  buildTelegramShippingQueryAnswer,
  buildTelegramStarRefund,
  buildTelegramStarSubscriptionEdit,
} from './telegram';

const telegramChatPermissionFields = new Set<string>(TELEGRAM_CHAT_PERMISSION_FIELDS);
const telegramAdministratorRightFields = new Set<string>(TELEGRAM_ADMINISTRATOR_RIGHT_FIELDS);

export { parseTelegramUpdate } from './telegram-events';
export type { ParsedTelegramUpdate } from './telegram-events';

export type TelegramClientOptions = {
  apiRoot?: string;
  fetch?: typeof globalThis.fetch;
};

export type TelegramRequestOptions = { signal?: AbortSignal };

export type TelegramClientResponseParameters = {
  migrate_to_chat_id?: number;
  retry_after?: number;
};

export class TelegramClientError extends Error {
  readonly method: string;
  readonly status: number;
  readonly errorCode?: number;
  readonly parameters?: TelegramClientResponseParameters;

  constructor(input: {
    method: string;
    status: number;
    description?: string;
    errorCode?: number;
    parameters?: TelegramClientResponseParameters;
  }) {
    super(input.description || `Telegram ${input.method} failed.`);
    this.name = 'TelegramClientError';
    this.method = input.method;
    this.status = input.status;
    this.errorCode = input.errorCode;
    this.parameters = input.parameters;
  }

  get retryAfter() { return this.parameters?.retry_after; }
  get migrateToChatId() { return this.parameters?.migrate_to_chat_id; }
}

export class TelegramClient {
  readonly apiRoot: string;
  private readonly token: string;
  private readonly fetcher: typeof globalThis.fetch;

  constructor(token: string, options: TelegramClientOptions = {}) {
    this.token = String(token ?? '').trim();
    if (!this.token || !/^[^\s/]+$/.test(this.token)) throw new Error('A valid Telegram bot token is required.');
    this.apiRoot = (options.apiRoot ?? 'https://api.telegram.org').replace(/\/+$/, '');
    this.fetcher = options.fetch ?? globalThis.fetch;
    if (typeof this.fetcher !== 'function') throw new Error('A Fetch API implementation is required.');
  }

  private endpoint(method: string) {
    return `${this.apiRoot}/bot${this.token}/${method}`;
  }

  private async result<T>(method: string, response: Response): Promise<T> {
    let payload: {
      ok?: boolean;
      result?: T;
      description?: string;
      error_code?: number;
      parameters?: TelegramClientResponseParameters;
    };
    try {
      payload = await response.json() as typeof payload;
      if (!payload || typeof payload !== 'object') throw new Error('Invalid JSON object.');
    } catch {
      throw new TelegramClientError({
        method,
        status: response.status,
        description: `Telegram ${method} returned an invalid response.`,
      });
    }
    if (!response.ok || !payload.ok) {
      throw new TelegramClientError({
        method,
        status: response.status,
        description: payload.description,
        errorCode: payload.error_code,
        parameters: payload.parameters,
      });
    }
    return payload.result as T;
  }

  private async request(method: TelegramMethod, init: RequestInit) {
    if (!(TELEGRAM_METHODS as readonly string[]).includes(method)) {
      throw new TelegramClientError({
        method,
        status: 0,
        description: `Unsupported Telegram Bot API method: ${method}.`,
      });
    }
    try {
      return await this.fetcher(this.endpoint(method), init);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') throw error;
      throw new TelegramClientError({ method, status: 0, description: `Telegram ${method} request failed.` });
    }
  }

  async call<M extends TelegramMethod, T = unknown>(
    method: M,
    params: TelegramParamsFor<M>,
    options: TelegramRequestOptions = {},
  ): Promise<T> {
    const response = await this.request(method, {
      method: 'POST',
      signal: options.signal,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(params ?? {}),
    });
    return this.result<T>(method, response);
  }

  async upload<M extends TelegramMethod, T = unknown>(
    method: M,
    formData: FormData,
    options: TelegramRequestOptions = {},
  ): Promise<T> {
    if (!(formData instanceof FormData)) throw new TypeError('Telegram upload requires FormData.');
    const response = await this.request(method, { method: 'POST', body: formData, signal: options.signal });
    return this.result<T>(method, response);
  }

  async getFileUrl(fileId: string) {
    const value = String(fileId ?? '').trim();
    if (!value) throw new Error('A Telegram file ID is required.');
    const file = await this.call<'getFile', { file_path?: string }>('getFile', { file_id: value });
    if (!file.file_path) throw new Error('Telegram did not return a file path.');
    const path = file.file_path.split('/').map(encodeURIComponent).join('/');
    return `${this.apiRoot}/file/bot${this.token}/${path}`;
  }
}

export type TelegramContextOptions = {
  parseMode?: TelegramParseMode;
  disableNotification?: boolean;
  protectContent?: boolean;
};

function messageFromUpdate(update: TelegramUpdate) {
  return update.message ?? update.edited_message ?? update.channel_post ?? update.edited_channel_post
    ?? update.business_message ?? update.edited_business_message ?? update.guest_message
    ?? update.callback_query?.message;
}

function currentMessageId(context: Pick<BotContext, 'messageId'>, configured?: string) {
  const id = Number(configured || context.messageId || '');
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error('A valid Telegram message ID is required.');
  return id;
}

function currentMessageThreadId(context: Pick<BotContext, 'messageThreadId'>, configured?: string | number) {
  const id = Number(configured || context.messageThreadId || '');
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error('A valid Telegram message thread ID is required.');
  return id;
}

function telegramText(value: string, label: string, maximum: number, minimum = 1) {
  const text = String(value ?? '');
  const length = Array.from(text).length;
  if (length < minimum || length > maximum) throw new Error(`${label} must be ${minimum}-${maximum} characters.`);
  return text;
}

function requiredText(value: string, label: string) {
  const result = String(value ?? '').trim();
  if (!result) throw new Error(`${label} is required.`);
  return result;
}

function locationCoordinate(value: number, label: string, minimum: number, maximum: number) {
  if (!Number.isFinite(value) || value < minimum || value > maximum) {
    throw new Error(`${label} must be between ${minimum} and ${maximum}.`);
  }
  return value;
}

function telegramUserId(value: string) {
  const result = Number(requiredText(value, 'Telegram user ID'));
  if (!Number.isSafeInteger(result) || result <= 0) throw new Error('Telegram user ID must be a positive safe integer.');
  return result;
}

function optionalUnixDate(value: number | undefined, label: string) {
  if (value === undefined) return undefined;
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative Unix timestamp.`);
  return value;
}

function booleanTelegramFields(
  value: Record<string, boolean>,
  label: string,
  validKey: (key: string) => boolean,
) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const entries = Object.entries(value);
  if (!entries.length || entries.some(([key, allowed]) => !validKey(key) || typeof allowed !== 'boolean')) {
    throw new Error(`${label} require at least one supported boolean field.`);
  }
  return value;
}

function chatPermissions(value: TelegramChatPermissions) {
  return booleanTelegramFields(value as Record<string, boolean>, 'Telegram chat permissions', (key) => telegramChatPermissionFields.has(key)) as TelegramChatPermissions;
}

function administratorRights(value: TelegramAdministratorRights) {
  return booleanTelegramFields(value as Record<string, boolean>, 'Telegram administrator rights', (key) => telegramAdministratorRightFields.has(key)) as TelegramAdministratorRights;
}

function messageIds(values: Array<string | number>) {
  if (!Array.isArray(values) || values.length < 1 || values.length > 100) {
    throw new Error('Telegram deleteMessages requires 1-100 message IDs.');
  }
  const result = values.map((value) => Number(value));
  if (result.some((value) => !Number.isSafeInteger(value) || value <= 0)) {
    throw new Error('Telegram message IDs must be positive safe integers.');
  }
  if (new Set(result).size !== result.length) throw new Error('Telegram message IDs must be unique.');
  return result;
}

function memberLabel(value: string, label: string) {
  const result = telegramText(value.trim(), label, 16, 0);
  if (/\p{Extended_Pictographic}/u.test(result)) throw new Error(`${label} cannot contain emoji.`);
  return result;
}

function evaluateWhen(expression: string, text: string) {
  const value = expression.trim();
  if (!value) return true;
  let match = value.match(/^message\.text\s*(==|!=)\s*["'](.*)["']$/);
  if (match) return match[1] === '==' ? text === match[2] : text !== match[2];
  match = value.match(/^message\.text\s+contains\s+["'](.*)["']$/i);
  return match ? text.includes(match[1]) : false;
}

/** Convert a raw update into the normalized BMH handler context. */
export function createTelegramContext(
  update: TelegramUpdate,
  client: TelegramClient,
  options: TelegramContextOptions = {},
): BotContext | null {
  const event = parseTelegramUpdate(update);
  if (!event) return null;
  const message = messageFromUpdate(update);
  const sendDefaults = {
    ...(options.disableNotification ? { disable_notification: true } : {}),
    ...(options.protectContent ? { protect_content: true } : {}),
  };
  const requireChat = () => {
    if (!event.chatId) throw new Error(`Telegram ${event.updateType} updates do not provide a chat for this action.`);
    return event.chatId;
  };
  const captionBody = (field: string, media: string, caption?: string) => ({
    chat_id: requireChat(),
    [field]: requiredText(media, `Telegram ${field}`),
    ...(caption ? { caption: telegramText(caption, 'Telegram caption', 1024) } : {}),
    ...(caption && options.parseMode ? { parse_mode: options.parseMode } : {}),
    ...sendDefaults,
  });
  const answeredQueries = new Set<string>();
  const answerQuery = async (key: string, request: () => Promise<unknown>) => {
    if (answeredQueries.has(key)) throw new Error('This Telegram query has already been answered by the current update handler.');
    answeredQueries.add(key);
    try { return await request(); }
    catch (error) { answeredQueries.delete(key); throw error; }
  };

  const context: BotContext = {
    platform: 'telegram' as const,
    update,
    updateType: event.updateType,
    text: event.text,
    chatId: event.chatId,
    userId: event.user?.id,
    messageId: event.messageId,
    messageThreadId: event.messageThreadId,
    draftId: event.draftId,
    businessConnectionId: event.businessConnectionId,
    callbackQueryId: event.callbackQueryId,
    callbackData: event.callbackData,
    inlineQueryId: event.inlineQueryId,
    shippingQueryId: event.shippingQueryId,
    preCheckoutQueryId: event.preCheckoutQueryId,
    guestQueryId: event.guestQueryId,
    successfulPayment: event.successfulPayment,
    user: event.user ? {
      ...event.user,
      raw: (message?.from ?? update.callback_query?.from) as never,
    } : undefined,
    chat: event.chat ? { ...event.chat, raw: message?.chat as never } : undefined,
    message,
    reply(text: string) {
      return client.call('sendMessage', {
        chat_id: requireChat(),
        text: telegramText(text, 'Telegram message', 4096),
        ...(options.parseMode ? { parse_mode: options.parseMode } : {}),
        ...sendDefaults,
      });
    },
    when(expression: string) { return evaluateWhen(expression, event.text); },
    http: {
      async get(url: string) { return (await fetch(url)).json(); },
      async request(url: string, requestOptions?: { method?: string }) {
        return (await fetch(url, { method: requestOptions?.method ?? 'GET' })).json();
      },
    },
    telegram: {} as TelegramApi,
    run(flowFunction) { return runFlowFunction(flowFunction, context); },
    async step(type: string) { throw new Error(`Local runtime does not have an adapter for ${type}.`); },
  };

  context.telegram = {
    call<M extends TelegramMethod, T = unknown>(method: M, params: TelegramParamsFor<M>) {
      return client.call<M, T>(method, params);
    },
    sendPhoto(photo, caption) { return client.call('sendPhoto', captionBody('photo', photo, caption) as never); },
    sendSticker(sticker, emoji) {
      return client.call('sendSticker', { chat_id: requireChat(), sticker: requiredText(sticker, 'Telegram sticker'), ...(emoji ? { emoji } : {}), ...sendDefaults });
    },
    sendDocument(document, caption) { return client.call('sendDocument', captionBody('document', document, caption) as never); },
    sendAudio(audio, caption) { return client.call('sendAudio', captionBody('audio', audio, caption) as never); },
    sendVideo(video, caption) { return client.call('sendVideo', captionBody('video', video, caption) as never); },
    sendAnimation(animation, caption) { return client.call('sendAnimation', captionBody('animation', animation, caption) as never); },
    sendVoice(voice, caption) { return client.call('sendVoice', captionBody('voice', voice, caption) as never); },
    sendVideoNote(videoNote) {
      return client.call('sendVideoNote', {
        chat_id: requireChat(),
        video_note: requiredText(videoNote, 'Telegram video note'),
        ...sendDefaults,
      });
    },
    sendLocation(latitude, longitude) {
      return client.call('sendLocation', {
        chat_id: requireChat(),
        latitude: locationCoordinate(latitude, 'Telegram latitude', -90, 90),
        longitude: locationCoordinate(longitude, 'Telegram longitude', -180, 180),
        ...sendDefaults,
      });
    },
    sendVenue(latitude, longitude, title, address) {
      return client.call('sendVenue', {
        chat_id: requireChat(),
        latitude: locationCoordinate(latitude, 'Telegram latitude', -90, 90),
        longitude: locationCoordinate(longitude, 'Telegram longitude', -180, 180),
        title: requiredText(title, 'Telegram venue title'),
        address: requiredText(address, 'Telegram venue address'),
        ...sendDefaults,
      });
    },
    sendContact(phoneNumber, firstName, lastName) {
      return client.call('sendContact', {
        chat_id: requireChat(),
        phone_number: requiredText(phoneNumber, 'Telegram contact phone number'),
        first_name: requiredText(firstName, 'Telegram contact first name'),
        ...(lastName ? { last_name: lastName.trim() } : {}),
        ...sendDefaults,
      });
    },
    sendPoll(question, pollOptions, anonymous = true) {
      if (pollOptions.length < 1 || pollOptions.length > 12) throw new Error('Telegram polls require 1-12 options.');
      return client.call('sendPoll', {
        chat_id: requireChat(),
        question: telegramText(question.trim(), 'Telegram poll question', 300),
        options: pollOptions.map((text, index) => ({
          text: telegramText(text.trim(), `Telegram poll option ${index + 1}`, 100),
        })),
        is_anonymous: anonymous,
        ...sendDefaults,
      });
    },
    sendDice(emoji) {
      return client.call('sendDice', { chat_id: requireChat(), ...(emoji ? { emoji } : {}), ...sendDefaults });
    },
    sendMessageDraft(draftId, text = '', draftOptions = {}) {
      if (event.chat?.type !== 'private') throw new Error('Telegram message drafts are available only in private chats.');
      const currentThread = event.messageThreadId ? Number(event.messageThreadId) : undefined;
      return client.call<'sendMessageDraft', boolean>('sendMessageDraft', buildTelegramMessageDraft(
        requireChat(), draftId, text, {
          ...draftOptions,
          messageThreadId: draftOptions.messageThreadId ?? currentThread,
          parseMode: draftOptions.parseMode ?? options.parseMode,
        },
      ));
    },
    sendChecklist(checklist, actionOptions = {}) {
      if (!actionOptions || typeof actionOptions !== 'object' || Array.isArray(actionOptions)) {
        throw new Error('Telegram sendChecklist options must be an object.');
      }
      const unsupported = Object.keys(actionOptions).find((key) => ![
        'businessConnectionId', 'disableNotification', 'protectContent',
      ].includes(key));
      if (unsupported) throw new Error(`Unsupported Telegram checklist option: ${unsupported}.`);
      return client.call<'sendChecklist', TelegramMessage>('sendChecklist', buildTelegramChecklistSend(
        actionOptions.businessConnectionId || event.businessConnectionId || '', requireChat(), checklist, {
          disableNotification: actionOptions.disableNotification ?? options.disableNotification,
          protectContent: actionOptions.protectContent ?? options.protectContent,
        },
      ));
    },
    editChecklist(checklist, actionOptions = {}) {
      if (!actionOptions || typeof actionOptions !== 'object' || Array.isArray(actionOptions)) {
        throw new Error('Telegram editChecklist options must be an object.');
      }
      const unsupported = Object.keys(actionOptions).find((key) => ![
        'businessConnectionId', 'messageId',
      ].includes(key));
      if (unsupported) throw new Error(`Unsupported Telegram checklist edit option: ${unsupported}.`);
      return client.call<'editMessageChecklist', TelegramMessage>('editMessageChecklist', buildTelegramChecklistEdit(
        actionOptions.businessConnectionId || event.businessConnectionId || '', requireChat(),
        actionOptions.messageId ?? event.messageId ?? '', checklist,
      ));
    },
    sendInvoice(invoice) {
      return client.call('sendInvoice', buildTelegramInvoice(requireChat(), {
        ...invoice,
        disableNotification: invoice.disableNotification ?? options.disableNotification,
        protectContent: invoice.protectContent ?? options.protectContent,
      }));
    },
    sendButtons(text, buttons) {
      if (!buttons.length) throw new Error('At least one Telegram inline button is required.');
      const inlineKeyboard = buttons.map((button, index) => {
        const label = requiredText(button.text, `Telegram button ${index + 1} label`);
        const data = String(button.data ?? '');
        const bytes = new TextEncoder().encode(data).byteLength;
        if (bytes < 1 || bytes > 64) throw new Error(`Telegram button ${index + 1} callback data must be 1-64 bytes.`);
        return [{ text: label, callback_data: data }];
      });
      return client.call('sendMessage', {
        chat_id: requireChat(),
        text: telegramText(text, 'Telegram message', 4096),
        reply_markup: { inline_keyboard: inlineKeyboard },
        ...sendDefaults,
      });
    },
    editMessage(text, messageId) {
      return client.call('editMessageText', update.callback_query?.inline_message_id && !messageId
        ? {
            inline_message_id: update.callback_query.inline_message_id,
            text: telegramText(text, 'Telegram message', 4096),
            ...(options.parseMode ? { parse_mode: options.parseMode } : {}),
          }
        : {
            chat_id: requireChat(),
            message_id: currentMessageId(context, messageId),
            text: telegramText(text, 'Telegram message', 4096),
            ...(options.parseMode ? { parse_mode: options.parseMode } : {}),
          });
    },
    deleteMessage(messageId) {
      return client.call('deleteMessage', { chat_id: requireChat(), message_id: currentMessageId(context, messageId) });
    },
    deleteMessages(ids) {
      return client.call('deleteMessages', { chat_id: requireChat(), message_ids: messageIds(ids) });
    },
    answerCallback(text, showAlert = false) {
      if (!event.callbackQueryId) throw new Error('Answer callback can only run after a Telegram callback query.');
      if (text) telegramText(text, 'Telegram callback notification', 200);
      return client.call('answerCallbackQuery', {
        callback_query_id: event.callbackQueryId,
        ...(text ? { text } : {}),
        show_alert: showAlert,
      });
    },
    answerInlineQuery(results, queryOptions) {
      const body = buildTelegramInlineQueryAnswer(event.inlineQueryId ?? '', results, queryOptions);
      return answerQuery(`inline:${body.inline_query_id}`, () => client.call('answerInlineQuery', body));
    },
    answerShippingQuery(ok, queryOptions) {
      const body = buildTelegramShippingQueryAnswer(event.shippingQueryId ?? '', ok, queryOptions);
      return answerQuery(`shipping:${body.shipping_query_id}`, () => client.call('answerShippingQuery', body));
    },
    answerPreCheckoutQuery(ok, errorMessage) {
      const body = buildTelegramPreCheckoutQueryAnswer(event.preCheckoutQueryId ?? '', ok, errorMessage);
      return answerQuery(`pre-checkout:${body.pre_checkout_query_id}`, () => client.call('answerPreCheckoutQuery', body));
    },
    answerGuestQuery(result) {
      const body = buildTelegramGuestQueryAnswer(event.guestQueryId ?? '', result);
      return answerQuery(`guest:${body.guest_query_id}`, () => client.call('answerGuestQuery', body));
    },
    refundStarPayment(chargeId, userId) {
      return client.call('refundStarPayment', buildTelegramStarRefund(
        userId || event.user?.id || '',
        chargeId || event.successfulPayment?.telegram_payment_charge_id || '',
      ));
    },
    editStarSubscription(canceled, chargeId, userId) {
      return client.call('editUserStarSubscription', buildTelegramStarSubscriptionEdit(
        userId || event.user?.id || '',
        chargeId || event.successfulPayment?.telegram_payment_charge_id || '',
        canceled,
      ));
    },
    createForumTopic(name, topicOptions) {
      return client.call<'createForumTopic', TelegramForumTopic>(
        'createForumTopic', buildTelegramForumTopicCreate(requireChat(), name, topicOptions),
      );
    },
    editForumTopic(topicOptions, messageThreadId) {
      return client.call('editForumTopic', buildTelegramForumTopicEdit(
        requireChat(), currentMessageThreadId(context, messageThreadId), topicOptions,
      ));
    },
    closeForumTopic(messageThreadId) {
      return client.call('closeForumTopic', buildTelegramForumTopicTarget(requireChat(), currentMessageThreadId(context, messageThreadId)));
    },
    reopenForumTopic(messageThreadId) {
      return client.call('reopenForumTopic', buildTelegramForumTopicTarget(requireChat(), currentMessageThreadId(context, messageThreadId)));
    },
    deleteForumTopic(messageThreadId) {
      return client.call('deleteForumTopic', buildTelegramForumTopicTarget(requireChat(), currentMessageThreadId(context, messageThreadId)));
    },
    unpinAllForumTopicMessages(messageThreadId) {
      return client.call('unpinAllForumTopicMessages', buildTelegramForumTopicTarget(requireChat(), currentMessageThreadId(context, messageThreadId)));
    },
    sendChatAction(action: TelegramChatAction) {
      return client.call('sendChatAction', { chat_id: requireChat(), action });
    },
    setReaction(emoji, messageId, big = false) {
      return client.call('setMessageReaction', {
        chat_id: requireChat(),
        message_id: currentMessageId(context, messageId),
        reaction: [{ type: 'emoji', emoji }],
        is_big: big,
      });
    },
    forwardMessage(fromChatId, messageId) {
      return client.call('forwardMessage', {
        chat_id: requireChat(),
        from_chat_id: fromChatId,
        message_id: currentMessageId(context, messageId),
        ...sendDefaults,
      });
    },
    copyMessage(fromChatId, messageId) {
      return client.call('copyMessage', {
        chat_id: requireChat(),
        from_chat_id: fromChatId,
        message_id: currentMessageId(context, messageId),
        ...sendDefaults,
      });
    },
    pinMessage(messageId, silent = false) {
      return client.call('pinChatMessage', {
        chat_id: requireChat(),
        message_id: currentMessageId(context, messageId),
        disable_notification: silent,
      });
    },
    unpinMessage(messageId) {
      return client.call('unpinChatMessage', {
        chat_id: requireChat(),
        ...(messageId || context.messageId ? { message_id: currentMessageId(context, messageId) } : {}),
      });
    },
    stopPoll(messageId) {
      return client.call('stopPoll', { chat_id: requireChat(), message_id: currentMessageId(context, messageId) });
    },
    banMember(userId, banOptions = {}) {
      const untilDate = optionalUnixDate(banOptions.untilDate, 'Telegram ban until date');
      return client.call('banChatMember', {
        chat_id: requireChat(), user_id: telegramUserId(userId),
        ...(untilDate === undefined ? {} : { until_date: untilDate }), revoke_messages: Boolean(banOptions.revokeMessages),
      });
    },
    unbanMember(userId, onlyIfBanned = true) {
      return client.call('unbanChatMember', { chat_id: requireChat(), user_id: telegramUserId(userId), only_if_banned: onlyIfBanned });
    },
    restrictMember(userId, permissions, untilDate) {
      const restrictedUntil = optionalUnixDate(untilDate, 'Telegram restriction until date');
      return client.call('restrictChatMember', {
        chat_id: requireChat(), user_id: telegramUserId(userId), permissions: chatPermissions(permissions),
        use_independent_chat_permissions: true,
        ...(restrictedUntil === undefined ? {} : { until_date: restrictedUntil }),
      });
    },
    promoteMember(userId, rights) {
      return client.call('promoteChatMember', { chat_id: requireChat(), user_id: telegramUserId(userId), ...administratorRights(rights) });
    },
    setAdministratorTitle(userId, title) {
      return client.call('setChatAdministratorCustomTitle', { chat_id: requireChat(), user_id: telegramUserId(userId), custom_title: memberLabel(title, 'Telegram administrator title') });
    },
    setMemberTag(userId, tag = '') {
      return client.call('setChatMemberTag', { chat_id: requireChat(), user_id: telegramUserId(userId), tag: memberLabel(tag, 'Telegram member tag') });
    },
    setDefaultPermissions(permissions) {
      return client.call('setChatPermissions', { chat_id: requireChat(), permissions: chatPermissions(permissions), use_independent_chat_permissions: true });
    },
    approveJoinRequest(userId) {
      return client.call('approveChatJoinRequest', { chat_id: requireChat(), user_id: telegramUserId(userId) });
    },
    declineJoinRequest(userId) {
      return client.call('declineChatJoinRequest', { chat_id: requireChat(), user_id: telegramUserId(userId) });
    },
    setChatTitle(title) {
      return client.call('setChatTitle', { chat_id: requireChat(), title: telegramText(title.trim(), 'Telegram chat title', 128) });
    },
    setChatDescription(description) {
      return client.call('setChatDescription', { chat_id: requireChat(), description: telegramText(description.trim(), 'Telegram chat description', 255, 0) });
    },
    unpinAllMessages() {
      return client.call('unpinAllChatMessages', { chat_id: requireChat() });
    },
    leaveChat() {
      return client.call('leaveChat', { chat_id: requireChat() });
    },
  };
  return context;
}

/** Dispatch a single validated update to command, callback, and update listeners. */
export async function dispatchTelegramUpdate(
  bot: Bot,
  client: TelegramClient,
  update: TelegramUpdate,
  options: TelegramContextOptions = {},
) {
  const event = parseTelegramUpdate(update);
  const context = createTelegramContext(update, client, options);
  if (!event || !context) return false;
  if (event.kind === 'command') await bot.dispatch('command', event.command, context);
  const payload = event.updateType === 'callback_query' ? event.callbackData : update[event.updateType];
  await bot.dispatch(event.updateType, payload, context);
  if (event.kind !== 'command' && event.kind !== event.updateType) {
    await bot.dispatch(event.kind, event.successfulPayment, context);
  }
  return true;
}

export type TelegramWebhookHandlerOptions = TelegramContextOptions & { secretToken?: string };

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

/** Create a Web Standard Request -> Response Telegram webhook handler. */
export function createTelegramWebhookHandler(
  bot: Bot,
  client: TelegramClient,
  options: TelegramWebhookHandlerOptions = {},
) {
  if (options.secretToken && !/^[A-Za-z0-9_-]{1,256}$/.test(options.secretToken)) {
    throw new Error('Telegram webhook secret token must use 1-256 letters, digits, underscores, or hyphens.');
  }
  return async (request: Request) => {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
    }
    if (options.secretToken) {
      const received = request.headers.get('X-Telegram-Bot-Api-Secret-Token') ?? '';
      if (!safeEqual(received, options.secretToken)) return new Response('Unauthorized', { status: 401 });
    }
    let update: TelegramUpdate;
    try { update = await request.json() as TelegramUpdate; }
    catch { return new Response('Invalid Telegram update', { status: 400 }); }
    if (!Number.isSafeInteger(update.update_id) || update.update_id < 0) {
      return new Response('Invalid Telegram update', { status: 400 });
    }
    await dispatchTelegramUpdate(bot, client, update, options);
    return new Response('OK');
  };
}

export type TelegramPollingOptions = TelegramContextOptions & {
  signal?: AbortSignal;
  offset?: number;
  timeout?: number;
  limit?: number;
  allowedUpdates?: readonly TelegramUpdateType[];
  onError?: (error: unknown) => void | Promise<void>;
};

function boundedInteger(value: number | undefined, fallback: number, minimum: number, maximum: number, label: string) {
  const result = value ?? fallback;
  if (!Number.isFinite(result)) throw new Error(`${label} must be a finite number.`);
  return Math.max(minimum, Math.min(maximum, Math.trunc(result)));
}

function waitForRetry(milliseconds: number, signal?: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (signal?.aborted) return resolve();
    const finish = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', finish);
      resolve();
    };
    const timer = setTimeout(finish, milliseconds);
    signal?.addEventListener('abort', finish, { once: true });
  });
}

/** Run cancellable long polling and confirm offsets only after successful dispatch. */
export async function runTelegramPolling(bot: Bot, client: TelegramClient, options: TelegramPollingOptions = {}) {
  const allowedUpdates = [...new Set(options.allowedUpdates ?? TELEGRAM_UPDATE_TYPES)];
  if (allowedUpdates.some((update) => !(TELEGRAM_UPDATE_TYPES as readonly string[]).includes(update))) {
    throw new Error('Polling allowedUpdates contains an unsupported Telegram update type.');
  }
  if (options.offset !== undefined && !Number.isSafeInteger(options.offset)) {
    throw new Error('Polling offset must be a safe integer.');
  }
  const timeout = boundedInteger(options.timeout, 30, 1, 50, 'Polling timeout');
  const limit = boundedInteger(options.limit, 100, 1, 100, 'Polling limit');
  let offset = options.offset ?? 0;

  while (!options.signal?.aborted) {
    try {
      const updates = await client.call<'getUpdates', TelegramUpdate[]>('getUpdates', {
        offset,
        timeout,
        limit,
        allowed_updates: allowedUpdates,
      }, { signal: options.signal });
      if (!Array.isArray(updates)) throw new Error('Telegram getUpdates did not return an array.');
      for (const update of updates) {
        if (options.signal?.aborted) break;
        if (!Number.isSafeInteger(update.update_id) || update.update_id < 0) {
          throw new Error('Telegram returned an invalid update identifier.');
        }
        if (update.update_id < offset) continue;
        await dispatchTelegramUpdate(bot, client, update, options);
        offset = Math.max(offset, update.update_id + 1);
      }
    } catch (error) {
      if (options.signal?.aborted) break;
      await options.onError?.(error);
      const retryAfter = error instanceof TelegramClientError ? error.retryAfter : undefined;
      await waitForRetry(Math.max(250, (retryAfter ?? 1) * 1000), options.signal);
    }
  }
}
