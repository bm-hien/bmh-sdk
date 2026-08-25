/** Telegram Bot API 10.3 types and method catalogs used by the public SDK. */

export const TELEGRAM_UPDATE_TYPES = [
  'message',
  'edited_message',
  'channel_post',
  'edited_channel_post',
  'business_connection',
  'business_message',
  'edited_business_message',
  'deleted_business_messages',
  'guest_message',
  'message_reaction',
  'message_reaction_count',
  'inline_query',
  'chosen_inline_result',
  'callback_query',
  'shipping_query',
  'pre_checkout_query',
  'purchased_paid_media',
  'poll',
  'poll_answer',
  'my_chat_member',
  'chat_member',
  'chat_join_request',
  'chat_boost',
  'removed_chat_boost',
  'managed_bot',
  'subscription',
  'stopped_message_generation',
] as const;

export type TelegramUpdateType = typeof TELEGRAM_UPDATE_TYPES[number];
/** Semantic events nested inside a message update and exposed by the BMH SDK. */
export const TELEGRAM_MESSAGE_EVENT_TYPES = ['successful_payment'] as const;
export const TELEGRAM_EVENT_TYPES = [...TELEGRAM_UPDATE_TYPES, ...TELEGRAM_MESSAGE_EVENT_TYPES] as const;
export type TelegramMessageEventType = typeof TELEGRAM_MESSAGE_EVENT_TYPES[number];
export type TelegramEventType = typeof TELEGRAM_EVENT_TYPES[number];
export type TelegramChatId = number | string;
export type TelegramParseMode = 'HTML' | 'MarkdownV2';
export type TelegramChatAction = 'typing' | 'upload_photo' | 'record_video' | 'upload_video' | 'record_voice' |
  'upload_voice' | 'upload_document' | 'choose_sticker' | 'find_location' | 'record_video_note' | 'upload_video_note';

export type TelegramUser = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
};

export type TelegramChat = {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_forum?: boolean;
};

export type TelegramMessageEntity = {
  type: string;
  offset: number;
  length: number;
  url?: string;
  user?: TelegramUser;
  language?: string;
  custom_emoji_id?: string;
};

export type TelegramMessage = {
  message_id: number;
  date: number;
  chat: TelegramChat;
  from?: TelegramUser;
  sender_chat?: TelegramChat;
  text?: string;
  entities?: TelegramMessageEntity[];
  caption?: string;
  caption_entities?: TelegramMessageEntity[];
  message_thread_id?: number;
  reply_to_message?: TelegramMessage;
  photo?: Array<{ file_id: string; file_unique_id: string; width: number; height: number; file_size?: number }>;
  audio?: Record<string, unknown>;
  document?: Record<string, unknown>;
  animation?: Record<string, unknown>;
  video?: Record<string, unknown>;
  voice?: Record<string, unknown>;
  video_note?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  location?: { latitude: number; longitude: number; horizontal_accuracy?: number };
  venue?: Record<string, unknown>;
  poll?: Record<string, unknown>;
  successful_payment?: TelegramSuccessfulPayment;
  [key: string]: unknown;
};

export type TelegramSuccessfulPayment = {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: Record<string, unknown>;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
  is_recurring?: boolean;
  is_first_recurring?: boolean;
  subscription_expiration_date?: number;
};

export type TelegramCallbackQuery = {
  id: string;
  from: TelegramUser;
  chat_instance: string;
  message?: TelegramMessage;
  inline_message_id?: string;
  data?: string;
  game_short_name?: string;
};

export type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
  channel_post?: TelegramMessage;
  edited_channel_post?: TelegramMessage;
  business_message?: TelegramMessage;
  edited_business_message?: TelegramMessage;
  guest_message?: TelegramMessage;
  business_connection?: Record<string, unknown>;
  deleted_business_messages?: Record<string, unknown>;
  message_reaction?: Record<string, unknown>;
  message_reaction_count?: Record<string, unknown>;
  inline_query?: Record<string, unknown>;
  chosen_inline_result?: Record<string, unknown>;
  callback_query?: TelegramCallbackQuery;
  shipping_query?: Record<string, unknown>;
  pre_checkout_query?: Record<string, unknown>;
  purchased_paid_media?: Record<string, unknown>;
  poll?: Record<string, unknown>;
  poll_answer?: Record<string, unknown>;
  my_chat_member?: Record<string, unknown>;
  chat_member?: Record<string, unknown>;
  chat_join_request?: Record<string, unknown>;
  chat_boost?: Record<string, unknown>;
  removed_chat_boost?: Record<string, unknown>;
  managed_bot?: Record<string, unknown>;
  subscription?: Record<string, unknown>;
  stopped_message_generation?: Record<string, unknown>;
  [key: string]: unknown;
};

export type TelegramInlineKeyboardButton = {
  text: string;
  callback_data?: string;
  url?: string;
  web_app?: { url: string };
  login_url?: Record<string, unknown>;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  copy_text?: { text: string };
  pay?: boolean;
};

export type TelegramInlineKeyboardMarkup = { inline_keyboard: TelegramInlineKeyboardButton[][] };
export type TelegramInlineButton = { text: string; data: string };
export type TelegramReaction = { type: 'emoji'; emoji: string } | { type: 'custom_emoji'; custom_emoji_id: string };
export const TELEGRAM_CHAT_PERMISSION_FIELDS = [
  'can_send_messages', 'can_send_audios', 'can_send_documents', 'can_send_photos', 'can_send_videos',
  'can_send_video_notes', 'can_send_voice_notes', 'can_send_polls', 'can_send_other_messages',
  'can_add_web_page_previews', 'can_react_to_messages', 'can_edit_tag', 'can_change_info',
  'can_invite_users', 'can_pin_messages', 'can_manage_topics',
] as const;
export const TELEGRAM_ADMINISTRATOR_RIGHT_FIELDS = [
  'is_anonymous', 'can_manage_chat', 'can_delete_messages', 'can_manage_video_chats',
  'can_restrict_members', 'can_promote_members', 'can_change_info', 'can_invite_users',
  'can_post_stories', 'can_edit_stories', 'can_delete_stories', 'can_post_messages',
  'can_edit_messages', 'can_pin_messages', 'can_manage_topics', 'can_manage_direct_messages',
  'can_manage_tags', 'can_send_welcome_messages',
] as const;
export type TelegramChatPermissions = Partial<Record<typeof TELEGRAM_CHAT_PERMISSION_FIELDS[number], boolean>>;
export type TelegramAdministratorRights = Partial<Record<typeof TELEGRAM_ADMINISTRATOR_RIGHT_FIELDS[number], boolean>>;

export type TelegramSendOptions = {
  message_thread_id?: number;
  direct_messages_topic_id?: number;
  parse_mode?: TelegramParseMode;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_parameters?: Record<string, unknown>;
  reply_markup?: TelegramInlineKeyboardMarkup | Record<string, unknown>;
  business_connection_id?: string;
  ephemeral_message_parameters?: Record<string, unknown>;
};

export type TelegramSendMessageParams = TelegramSendOptions & {
  chat_id: TelegramChatId;
  text: string;
  link_preview_options?: Record<string, unknown>;
};
export type TelegramSendMediaParams = TelegramSendOptions & {
  chat_id: TelegramChatId;
  caption?: string;
  show_caption_above_media?: boolean;
  has_spoiler?: boolean;
};
export type TelegramSendPhotoParams = TelegramSendMediaParams & { photo: string };
export type TelegramSendDocumentParams = TelegramSendMediaParams & { document: string; disable_content_type_detection?: boolean };
export type TelegramSendAudioParams = TelegramSendMediaParams & { audio: string; duration?: number; performer?: string; title?: string; thumbnail?: string };
export type TelegramSendVideoParams = TelegramSendMediaParams & { video: string; duration?: number; width?: number; height?: number; thumbnail?: string; supports_streaming?: boolean };
export type TelegramSendAnimationParams = TelegramSendMediaParams & { animation: string; duration?: number; width?: number; height?: number; thumbnail?: string };
export type TelegramSendVoiceParams = TelegramSendMediaParams & { voice: string; duration?: number };
export type TelegramSendVideoNoteParams = TelegramSendOptions & { chat_id: TelegramChatId; video_note: string; duration?: number; length?: number; thumbnail?: string };
export type TelegramSendLocationParams = TelegramSendOptions & { chat_id: TelegramChatId; latitude: number; longitude: number; horizontal_accuracy?: number; live_period?: number; heading?: number; proximity_alert_radius?: number };
export type TelegramSendVenueParams = TelegramSendLocationParams & { title: string; address: string; foursquare_id?: string; foursquare_type?: string; google_place_id?: string; google_place_type?: string };
export type TelegramSendContactParams = TelegramSendOptions & { chat_id: TelegramChatId; phone_number: string; first_name: string; last_name?: string; vcard?: string };
export type TelegramSendPollParams = TelegramSendOptions & { chat_id: TelegramChatId; question: string; options: Array<{ text: string; [key: string]: unknown }>; is_anonymous?: boolean; type?: 'quiz' | 'regular'; allows_multiple_answers?: boolean; correct_option_id?: number; explanation?: string; open_period?: number; close_date?: number; is_closed?: boolean };
export type TelegramInlineQueryResult = { type: string; id: string; [key: string]: unknown };
export type TelegramInlineQueryResultsButton = {
  text: string;
  web_app?: { url: string };
  start_parameter?: string;
};
export type TelegramInlineQueryAnswerOptions = {
  cacheTime?: number;
  isPersonal?: boolean;
  nextOffset?: string;
  button?: TelegramInlineQueryResultsButton;
};
export type TelegramLabeledPrice = { label: string; amount: number };
export type TelegramShippingOption = { id: string; title: string; prices: TelegramLabeledPrice[] };
export type TelegramShippingAnswerOptions = {
  shippingOptions?: TelegramShippingOption[];
  errorMessage?: string;
};
export type TelegramInvoiceOptions = {
  title: string;
  description: string;
  payload: string;
  currency: string;
  prices: TelegramLabeledPrice[];
  providerToken?: string;
  maxTipAmount?: number;
  suggestedTipAmounts?: number[];
  startParameter?: string;
  providerData?: string;
  photoUrl?: string;
  photoSize?: number;
  photoWidth?: number;
  photoHeight?: number;
  needName?: boolean;
  needPhoneNumber?: boolean;
  needEmail?: boolean;
  needShippingAddress?: boolean;
  sendPhoneNumberToProvider?: boolean;
  sendEmailToProvider?: boolean;
  isFlexible?: boolean;
  messageThreadId?: number;
  directMessagesTopicId?: number;
  disableNotification?: boolean;
  protectContent?: boolean;
  allowPaidBroadcast?: boolean;
  messageEffectId?: string;
  suggestedPostParameters?: Record<string, unknown>;
  replyParameters?: Record<string, unknown>;
};
export const TELEGRAM_FORUM_TOPIC_ICON_COLORS = [7322096, 16766590, 13338331, 9367192, 16749490, 16478047] as const;
export type TelegramForumTopicIconColor = typeof TELEGRAM_FORUM_TOPIC_ICON_COLORS[number];
export type TelegramForumTopic = {
  message_thread_id: number;
  name: string;
  icon_color: number;
  icon_custom_emoji_id?: string;
  is_name_implicit?: true;
};
export type TelegramCreateForumTopicOptions = {
  iconColor?: TelegramForumTopicIconColor;
  iconCustomEmojiId?: string;
};
export type TelegramEditForumTopicOptions = {
  name?: string;
  /** Pass null or an empty string to remove the custom icon. */
  iconCustomEmojiId?: string | null;
};
export type TelegramMessageDraftOptions = {
  messageThreadId?: number;
  parseMode?: TelegramParseMode;
  canStop?: boolean;
  keepOnStop?: boolean;
};
export type TelegramInputChecklistTask = {
  id: number;
  text: string;
  parseMode?: TelegramParseMode;
};
export type TelegramInputChecklist = {
  title: string;
  tasks: TelegramInputChecklistTask[];
  parseMode?: TelegramParseMode;
  othersCanAddTasks?: boolean;
  othersCanMarkTasksAsDone?: boolean;
};
export type TelegramSendChecklistOptions = {
  businessConnectionId?: string;
  disableNotification?: boolean;
  protectContent?: boolean;
};
export type TelegramEditChecklistOptions = {
  businessConnectionId?: string;
  messageId?: string | number;
};

function telegramQueryId(value: string, label: string) {
  const id = String(value ?? '').trim();
  if (!id) throw new Error(`${label} is only available in its matching Telegram query handler.`);
  return id;
}

function telegramUtf8Length(value: string) {
  return new TextEncoder().encode(value).byteLength;
}

function telegramInlineResult(value: TelegramInlineQueryResult, label: string) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const type = String(value.type ?? '').trim();
  const id = String(value.id ?? '').trim();
  if (!type) throw new Error(`${label} type is required.`);
  if (telegramUtf8Length(id) < 1 || telegramUtf8Length(id) > 64) throw new Error(`${label} ID must be 1-64 bytes.`);
  return { ...value, type, id };
}

function telegramInlineButton(value: TelegramInlineQueryResultsButton) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Telegram inline query button must be an object.');
  const text = String(value.text ?? '').trim();
  if (!text) throw new Error('Telegram inline query button text is required.');
  const hasWebApp = value.web_app !== undefined;
  const hasStartParameter = value.start_parameter !== undefined;
  if (Number(hasWebApp) + Number(hasStartParameter) !== 1) {
    throw new Error('Telegram inline query button requires exactly one of web_app or start_parameter.');
  }
  if (hasWebApp) {
    const url = String(value.web_app?.url ?? '').trim();
    if (!/^https:\/\//i.test(url)) throw new Error('Telegram inline query button web app URL must use HTTPS.');
    return { text, web_app: { url } };
  }
  const startParameter = String(value.start_parameter ?? '').trim();
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(startParameter)) {
    throw new Error('Telegram inline query button start parameter must use 1-64 letters, digits, underscores, or hyphens.');
  }
  return { text, start_parameter: startParameter };
}

function telegramInvoiceText(value: unknown, label: string, minimum: number, maximum: number) {
  const text = String(value ?? '').trim();
  const length = Array.from(text).length;
  if (length < minimum || length > maximum) throw new Error(`${label} must be ${minimum}-${maximum} characters.`);
  return text;
}

function telegramPositiveInteger(value: unknown, label: string) {
  if (!Number.isSafeInteger(value) || Number(value) <= 0) throw new Error(`${label} must be a positive integer.`);
  return Number(value);
}

function telegramInvoicePrices(values: TelegramLabeledPrice[], currency: string) {
  if (!Array.isArray(values) || !values.length) throw new Error('Telegram invoices require at least one labeled price.');
  if (currency === 'XTR' && values.length !== 1) throw new Error('Telegram Stars invoices require exactly one labeled price.');
  const prices = values.map((value, index) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Telegram invoice price ${index + 1} must be an object.`);
    const label = telegramInvoiceText(value.label, `Telegram invoice price ${index + 1} label`, 1, 255);
    if (!Number.isSafeInteger(value.amount)) throw new Error(`Telegram invoice price ${index + 1} amount must be a safe integer.`);
    return { label, amount: value.amount };
  });
  if (prices.reduce((total, price) => total + price.amount, 0) <= 0) throw new Error('Telegram invoice total must be positive.');
  return prices;
}

export function buildTelegramInvoice(
  chatId: TelegramChatId,
  value: TelegramInvoiceOptions,
): TelegramMethodParams['sendInvoice'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Telegram invoice options must be an object.');
  const chat_id = typeof chatId === 'number' ? chatId : String(chatId ?? '').trim();
  if (chat_id === '' || (typeof chat_id === 'number' && (!Number.isSafeInteger(chat_id) || chat_id === 0))) {
    throw new Error('Telegram invoices require a valid destination chat.');
  }
  const title = telegramInvoiceText(value.title, 'Telegram invoice title', 1, 32);
  const description = telegramInvoiceText(value.description, 'Telegram invoice description', 1, 255);
  const payload = String(value.payload ?? '');
  if (telegramUtf8Length(payload) < 1 || telegramUtf8Length(payload) > 128) throw new Error('Telegram invoice payload must be 1-128 bytes.');
  const currency = String(value.currency ?? '').trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(currency)) throw new Error('Telegram invoice currency must be a three-letter ISO 4217 code or XTR.');
  const prices = telegramInvoicePrices(value.prices, currency);
  const maxTipAmount = value.maxTipAmount === undefined ? undefined : telegramPositiveInteger(value.maxTipAmount, 'Telegram maximum tip');
  if (value.suggestedTipAmounts !== undefined && !Array.isArray(value.suggestedTipAmounts)) {
    throw new Error('Telegram suggested tips must be an array.');
  }
  const suggestedTipAmounts = value.suggestedTipAmounts === undefined ? undefined : value.suggestedTipAmounts.map((amount, index) => telegramPositiveInteger(amount, `Telegram suggested tip ${index + 1}`));
  if (suggestedTipAmounts && (suggestedTipAmounts.length > 4
    || suggestedTipAmounts.some((amount, index) => index > 0 && amount <= suggestedTipAmounts[index - 1]))) {
    throw new Error('Telegram suggested tips must contain at most four strictly increasing positive amounts.');
  }
  if (suggestedTipAmounts?.length && (!maxTipAmount || suggestedTipAmounts.at(-1)! > maxTipAmount)) {
    throw new Error('Telegram suggested tips require maxTipAmount and must not exceed it.');
  }
  const unsupportedStarsOptions = Boolean(maxTipAmount || suggestedTipAmounts?.length || value.needName || value.needPhoneNumber
    || value.needEmail || value.needShippingAddress || value.sendPhoneNumberToProvider || value.sendEmailToProvider || value.isFlexible);
  if (currency === 'XTR' && unsupportedStarsOptions) throw new Error('Telegram Stars invoices do not support tips, customer details, provider forwarding, or flexible shipping.');
  const booleanKeys = [
    'needName', 'needPhoneNumber', 'needEmail', 'needShippingAddress', 'sendPhoneNumberToProvider',
    'sendEmailToProvider', 'isFlexible', 'disableNotification', 'protectContent', 'allowPaidBroadcast',
  ] as const;
  for (const key of booleanKeys) {
    if (value[key] !== undefined && typeof value[key] !== 'boolean') throw new Error(`Telegram invoice ${key} must be boolean.`);
  }
  const startParameter = value.startParameter === undefined ? undefined : String(value.startParameter).trim();
  if (startParameter && !/^[A-Za-z0-9_-]{1,64}$/.test(startParameter)) {
    throw new Error('Telegram invoice start parameter must use 1-64 letters, digits, underscores, or hyphens.');
  }
  const optionalPositive = (amount: number | undefined, label: string) => amount === undefined ? undefined : telegramPositiveInteger(amount, label);
  const messageThreadId = optionalPositive(value.messageThreadId, 'Telegram invoice message thread ID');
  const directMessagesTopicId = optionalPositive(value.directMessagesTopicId, 'Telegram invoice direct messages topic ID');
  const photoSize = optionalPositive(value.photoSize, 'Telegram invoice photo size');
  const photoWidth = optionalPositive(value.photoWidth, 'Telegram invoice photo width');
  const photoHeight = optionalPositive(value.photoHeight, 'Telegram invoice photo height');
  const providerToken = String(value.providerToken ?? '').trim();
  const providerData = value.providerData === undefined ? undefined : String(value.providerData);
  if (providerData) {
    try {
      const parsed = JSON.parse(providerData);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
    } catch { throw new Error('Telegram invoice providerData must be a JSON-serialized object.'); }
  }
  const photoUrl = value.photoUrl === undefined ? undefined : String(value.photoUrl).trim();
  if (photoUrl) {
    let parsed: URL;
    try { parsed = new URL(photoUrl); }
    catch { throw new Error('Telegram invoice photoUrl must be a valid HTTP(S) URL.'); }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error('Telegram invoice photoUrl must be a valid HTTP(S) URL.');
  }
  for (const [key, record] of [['suggestedPostParameters', value.suggestedPostParameters], ['replyParameters', value.replyParameters]] as const) {
    if (record !== undefined && (!record || typeof record !== 'object' || Array.isArray(record))) {
      throw new Error(`Telegram invoice ${key} must be an object.`);
    }
  }
  return {
    chat_id, title, description, payload, currency, prices,
    ...(currency !== 'XTR' && providerToken ? { provider_token: providerToken } : {}),
    ...(maxTipAmount === undefined ? {} : { max_tip_amount: maxTipAmount }),
    ...(suggestedTipAmounts === undefined ? {} : { suggested_tip_amounts: suggestedTipAmounts }),
    ...(startParameter === undefined ? {} : { start_parameter: startParameter }),
    ...(providerData === undefined ? {} : { provider_data: providerData }),
    ...(photoUrl === undefined ? {} : { photo_url: photoUrl }),
    ...(photoSize === undefined ? {} : { photo_size: photoSize }),
    ...(photoWidth === undefined ? {} : { photo_width: photoWidth }),
    ...(photoHeight === undefined ? {} : { photo_height: photoHeight }),
    ...(value.needName === undefined ? {} : { need_name: value.needName }),
    ...(value.needPhoneNumber === undefined ? {} : { need_phone_number: value.needPhoneNumber }),
    ...(value.needEmail === undefined ? {} : { need_email: value.needEmail }),
    ...(value.needShippingAddress === undefined ? {} : { need_shipping_address: value.needShippingAddress }),
    ...(value.sendPhoneNumberToProvider === undefined ? {} : { send_phone_number_to_provider: value.sendPhoneNumberToProvider }),
    ...(value.sendEmailToProvider === undefined ? {} : { send_email_to_provider: value.sendEmailToProvider }),
    ...(value.isFlexible === undefined ? {} : { is_flexible: value.isFlexible }),
    ...(messageThreadId === undefined ? {} : { message_thread_id: messageThreadId }),
    ...(directMessagesTopicId === undefined ? {} : { direct_messages_topic_id: directMessagesTopicId }),
    ...(value.disableNotification === undefined ? {} : { disable_notification: value.disableNotification }),
    ...(value.protectContent === undefined ? {} : { protect_content: value.protectContent }),
    ...(value.allowPaidBroadcast === undefined ? {} : { allow_paid_broadcast: value.allowPaidBroadcast }),
    ...(value.messageEffectId === undefined ? {} : { message_effect_id: String(value.messageEffectId).trim() }),
    ...(value.suggestedPostParameters === undefined ? {} : { suggested_post_parameters: value.suggestedPostParameters }),
    ...(value.replyParameters === undefined ? {} : { reply_parameters: value.replyParameters }),
  };
}

export function buildTelegramStarRefund(userId: string | number, chargeId: string): TelegramMethodParams['refundStarPayment'] {
  const user_id = Number(userId);
  if (!Number.isSafeInteger(user_id) || user_id <= 0) throw new Error('Telegram Star refunds require a positive user ID.');
  const telegram_payment_charge_id = String(chargeId ?? '').trim();
  if (!telegram_payment_charge_id) throw new Error('Telegram Star refunds require a payment charge ID.');
  return { user_id, telegram_payment_charge_id };
}

export function buildTelegramStarSubscriptionEdit(
  userId: string | number,
  chargeId: string,
  canceled: boolean,
): TelegramMethodParams['editUserStarSubscription'] {
  if (typeof canceled !== 'boolean') throw new Error('Telegram Star subscription canceled must be boolean.');
  return { ...buildTelegramStarRefund(userId, chargeId), is_canceled: canceled };
}

function telegramForumChatId(chatId: TelegramChatId) {
  const chat_id = typeof chatId === 'number' ? chatId : String(chatId ?? '').trim();
  if (chat_id === '' || (typeof chat_id === 'number' && (!Number.isSafeInteger(chat_id) || chat_id === 0))) {
    throw new Error('Telegram forum topics require a valid destination chat.');
  }
  return chat_id;
}

function telegramForumThreadId(threadId: string | number) {
  const message_thread_id = Number(threadId);
  if (!Number.isSafeInteger(message_thread_id) || message_thread_id <= 0) {
    throw new Error('Telegram forum topics require a positive message thread ID.');
  }
  return message_thread_id;
}

export function buildTelegramForumTopicCreate(
  chatId: TelegramChatId,
  name: string,
  options: TelegramCreateForumTopicOptions = {},
): TelegramMethodParams['createForumTopic'] {
  const topicName = telegramInvoiceText(name, 'Telegram forum topic name', 1, 128);
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new Error('Telegram forum topic options must be an object.');
  }
  if (options.iconColor !== undefined && !(TELEGRAM_FORUM_TOPIC_ICON_COLORS as readonly number[]).includes(options.iconColor)) {
    throw new Error('Telegram forum topic icon color is not supported.');
  }
  const iconCustomEmojiId = options.iconCustomEmojiId === undefined
    ? undefined : String(options.iconCustomEmojiId).trim();
  if (options.iconCustomEmojiId !== undefined && !iconCustomEmojiId) {
    throw new Error('Telegram forum topic custom emoji ID cannot be empty.');
  }
  return {
    chat_id: telegramForumChatId(chatId), name: topicName,
    ...(options.iconColor === undefined ? {} : { icon_color: options.iconColor }),
    ...(iconCustomEmojiId === undefined ? {} : { icon_custom_emoji_id: iconCustomEmojiId }),
  };
}

export function buildTelegramForumTopicEdit(
  chatId: TelegramChatId,
  threadId: string | number,
  options: TelegramEditForumTopicOptions,
): TelegramMethodParams['editForumTopic'] {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new Error('Telegram forum topic edit options must be an object.');
  }
  const name = options.name === undefined ? undefined
    : telegramInvoiceText(options.name, 'Telegram forum topic name', 0, 128);
  const icon = options.iconCustomEmojiId === undefined ? undefined
    : options.iconCustomEmojiId === null ? '' : String(options.iconCustomEmojiId).trim();
  if (name === undefined && icon === undefined) throw new Error('Telegram forum topic edits require a name or icon change.');
  return {
    chat_id: telegramForumChatId(chatId), message_thread_id: telegramForumThreadId(threadId),
    ...(name === undefined ? {} : { name }),
    ...(icon === undefined ? {} : { icon_custom_emoji_id: icon }),
  };
}

export function buildTelegramForumTopicTarget(
  chatId: TelegramChatId,
  threadId: string | number,
): TelegramMethodParams['closeForumTopic'] {
  return { chat_id: telegramForumChatId(chatId), message_thread_id: telegramForumThreadId(threadId) };
}

export function buildTelegramMessageDraft(
  chatId: TelegramChatId,
  draftId: number,
  text: string,
  options: TelegramMessageDraftOptions = {},
): TelegramMethodParams['sendMessageDraft'] {
  const chat_id = Number(chatId);
  if (!Number.isSafeInteger(chat_id) || chat_id <= 0) {
    throw new Error('Telegram message drafts require a private-chat user ID.');
  }
  if (!Number.isSafeInteger(draftId) || draftId === 0) {
    throw new Error('Telegram message draft ID must be a non-zero safe integer.');
  }
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new Error('Telegram message draft options must be an object.');
  }
  const optionKeys = new Set(['messageThreadId', 'parseMode', 'canStop', 'keepOnStop']);
  const unknownOption = Object.keys(options).find((key) => !optionKeys.has(key));
  if (unknownOption) throw new Error(`Unsupported Telegram message draft option: ${unknownOption}.`);
  if (options.parseMode !== undefined && options.parseMode !== 'HTML' && options.parseMode !== 'MarkdownV2') {
    throw new Error('Telegram message draft parse mode must be HTML or MarkdownV2.');
  }
  if (options.canStop !== undefined && typeof options.canStop !== 'boolean') {
    throw new Error('Telegram message draft canStop must be boolean.');
  }
  if (options.keepOnStop !== undefined && typeof options.keepOnStop !== 'boolean') {
    throw new Error('Telegram message draft keepOnStop must be boolean.');
  }
  const content = String(text ?? '');
  if (Array.from(content).length > 4096) throw new Error('Telegram message draft text must be 0-4096 characters.');
  const messageThreadId = options.messageThreadId;
  if (messageThreadId !== undefined && (!Number.isSafeInteger(messageThreadId) || messageThreadId <= 0)) {
    throw new Error('Telegram message draft thread ID must be a positive safe integer.');
  }
  return {
    chat_id, draft_id: draftId, text: content,
    ...(messageThreadId === undefined ? {} : { message_thread_id: messageThreadId }),
    ...(options.parseMode === undefined ? {} : { parse_mode: options.parseMode }),
    ...(options.canStop === undefined ? {} : { can_stop: options.canStop }),
    ...(options.keepOnStop === undefined ? {} : { keep_on_stop: options.keepOnStop }),
  };
}

function telegramChecklistParseMode(value: unknown, label: string) {
  if (value === undefined) return undefined;
  if (value !== 'HTML' && value !== 'MarkdownV2') throw new Error(`${label} must be HTML or MarkdownV2.`);
  return value;
}

export function buildTelegramChecklist(value: TelegramInputChecklist) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Telegram checklist must be an object.');
  const keys = new Set(['title', 'tasks', 'parseMode', 'othersCanAddTasks', 'othersCanMarkTasksAsDone']);
  const unknownKey = Object.keys(value).find((key) => !keys.has(key));
  if (unknownKey) throw new Error(`Unsupported Telegram checklist field: ${unknownKey}.`);
  const title = telegramInvoiceText(value.title, 'Telegram checklist title', 1, 255);
  const parseMode = telegramChecklistParseMode(value.parseMode, 'Telegram checklist parse mode');
  if (!Array.isArray(value.tasks) || value.tasks.length < 1 || value.tasks.length > 30) {
    throw new Error('Telegram checklists require 1-30 tasks.');
  }
  const ids = new Set<number>();
  const tasks = value.tasks.map((task, index) => {
    if (!task || typeof task !== 'object' || Array.isArray(task)) {
      throw new Error(`Telegram checklist task ${index + 1} must be an object.`);
    }
    const taskKeys = new Set(['id', 'text', 'parseMode']);
    const unknownTaskKey = Object.keys(task).find((key) => !taskKeys.has(key));
    if (unknownTaskKey) throw new Error(`Unsupported Telegram checklist task field: ${unknownTaskKey}.`);
    const id = telegramPositiveInteger(task.id, `Telegram checklist task ${index + 1} ID`);
    if (ids.has(id)) throw new Error('Telegram checklist task IDs must be unique.');
    ids.add(id);
    const taskParseMode = telegramChecklistParseMode(task.parseMode, `Telegram checklist task ${index + 1} parse mode`);
    return {
      id,
      text: telegramInvoiceText(task.text, `Telegram checklist task ${index + 1} text`, 1, 100),
      ...(taskParseMode === undefined ? {} : { parse_mode: taskParseMode }),
    };
  });
  for (const [key, item] of [
    ['othersCanAddTasks', value.othersCanAddTasks],
    ['othersCanMarkTasksAsDone', value.othersCanMarkTasksAsDone],
  ] as const) {
    if (item !== undefined && typeof item !== 'boolean') throw new Error(`Telegram checklist ${key} must be boolean.`);
  }
  return {
    title, tasks,
    ...(parseMode === undefined ? {} : { parse_mode: parseMode }),
    ...(value.othersCanAddTasks === undefined ? {} : { others_can_add_tasks: value.othersCanAddTasks }),
    ...(value.othersCanMarkTasksAsDone === undefined ? {} : { others_can_mark_tasks_as_done: value.othersCanMarkTasksAsDone }),
  };
}

function telegramChecklistConnectionId(value: unknown) {
  const id = String(value ?? '').trim();
  if (!id) throw new Error('Telegram checklists require a business connection ID.');
  return id;
}

function telegramChecklistChatId(value: TelegramChatId) {
  const chatId = typeof value === 'number' ? value : String(value ?? '').trim();
  if (chatId === '' || (typeof chatId === 'number' && (!Number.isSafeInteger(chatId) || chatId === 0))) {
    throw new Error('Telegram checklists require a valid destination chat.');
  }
  return chatId;
}

export function buildTelegramChecklistSend(
  businessConnectionId: string,
  chatId: TelegramChatId,
  checklist: TelegramInputChecklist,
  options: Pick<TelegramSendChecklistOptions, 'disableNotification' | 'protectContent'> = {},
): TelegramMethodParams['sendChecklist'] {
  if (!options || typeof options !== 'object' || Array.isArray(options)) throw new Error('Telegram checklist options must be an object.');
  const allowedOptions = new Set(['disableNotification', 'protectContent']);
  const unknownOption = Object.keys(options).find((key) => !allowedOptions.has(key));
  if (unknownOption) throw new Error(`Unsupported Telegram checklist option: ${unknownOption}.`);
  if (options.disableNotification !== undefined && typeof options.disableNotification !== 'boolean') {
    throw new Error('Telegram checklist disableNotification must be boolean.');
  }
  if (options.protectContent !== undefined && typeof options.protectContent !== 'boolean') {
    throw new Error('Telegram checklist protectContent must be boolean.');
  }
  return {
    business_connection_id: telegramChecklistConnectionId(businessConnectionId),
    chat_id: telegramChecklistChatId(chatId),
    checklist: buildTelegramChecklist(checklist),
    ...(options.disableNotification === undefined ? {} : { disable_notification: options.disableNotification }),
    ...(options.protectContent === undefined ? {} : { protect_content: options.protectContent }),
  };
}

export function buildTelegramChecklistEdit(
  businessConnectionId: string,
  chatId: TelegramChatId,
  messageId: string | number,
  checklist: TelegramInputChecklist,
): TelegramMethodParams['editMessageChecklist'] {
  const message_id = Number(messageId);
  if (!Number.isSafeInteger(message_id) || message_id <= 0) throw new Error('Telegram checklist edits require a positive message ID.');
  return {
    business_connection_id: telegramChecklistConnectionId(businessConnectionId),
    chat_id: telegramChecklistChatId(chatId), message_id,
    checklist: buildTelegramChecklist(checklist),
  };
}

export function buildTelegramInlineQueryAnswer(
  inlineQueryId: string,
  values: TelegramInlineQueryResult[],
  options: TelegramInlineQueryAnswerOptions = {},
): TelegramMethodParams['answerInlineQuery'] {
  if (!Array.isArray(values) || values.length > 50) throw new Error('Telegram inline queries support 0-50 results.');
  const results = values.map((value, index) => telegramInlineResult(value, `Telegram inline result ${index + 1}`));
  if (new Set(results.map((value) => value.id)).size !== results.length) throw new Error('Telegram inline result IDs must be unique.');
  if (options.cacheTime !== undefined && (!Number.isSafeInteger(options.cacheTime) || options.cacheTime < 0)) {
    throw new Error('Telegram inline query cache time must be a non-negative integer.');
  }
  const nextOffset = options.nextOffset === undefined ? undefined : String(options.nextOffset);
  if (nextOffset !== undefined && telegramUtf8Length(nextOffset) > 64) throw new Error('Telegram inline query next offset must not exceed 64 bytes.');
  if (options.isPersonal !== undefined && typeof options.isPersonal !== 'boolean') throw new Error('Telegram inline query isPersonal must be boolean.');
  return {
    inline_query_id: telegramQueryId(inlineQueryId, 'Telegram inline query ID'),
    results,
    ...(options.cacheTime === undefined ? {} : { cache_time: options.cacheTime }),
    ...(options.isPersonal === undefined ? {} : { is_personal: options.isPersonal }),
    ...(nextOffset === undefined ? {} : { next_offset: nextOffset }),
    ...(options.button === undefined ? {} : { button: telegramInlineButton(options.button) }),
  };
}

function telegramShippingOptions(values: TelegramShippingOption[]) {
  if (!Array.isArray(values) || !values.length) throw new Error('A successful Telegram shipping answer requires at least one shipping option.');
  const result = values.map((value, optionIndex) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Telegram shipping option ${optionIndex + 1} must be an object.`);
    const id = String(value.id ?? '').trim();
    const title = String(value.title ?? '').trim();
    if (telegramUtf8Length(id) < 1 || telegramUtf8Length(id) > 64) throw new Error(`Telegram shipping option ${optionIndex + 1} ID must be 1-64 bytes.`);
    if (!title) throw new Error(`Telegram shipping option ${optionIndex + 1} title is required.`);
    if (!Array.isArray(value.prices) || !value.prices.length) throw new Error(`Telegram shipping option ${optionIndex + 1} requires at least one price.`);
    const prices = value.prices.map((price, priceIndex) => {
      if (!price || typeof price !== 'object' || Array.isArray(price)) throw new Error(`Telegram shipping price ${priceIndex + 1} must be an object.`);
      const label = String(price.label ?? '').trim();
      if (!label) throw new Error(`Telegram shipping price ${priceIndex + 1} label is required.`);
      if (!Number.isSafeInteger(price.amount)) throw new Error(`Telegram shipping price ${priceIndex + 1} amount must be an integer.`);
      return { label, amount: price.amount };
    });
    return { id, title, prices };
  });
  if (new Set(result.map((value) => value.id)).size !== result.length) throw new Error('Telegram shipping option IDs must be unique.');
  return result;
}

export function buildTelegramShippingQueryAnswer(
  shippingQueryId: string,
  ok: boolean,
  options: TelegramShippingAnswerOptions = {},
): TelegramMethodParams['answerShippingQuery'] {
  if (typeof ok !== 'boolean') throw new Error('Telegram shipping answer ok must be boolean.');
  const shipping_query_id = telegramQueryId(shippingQueryId, 'Telegram shipping query ID');
  if (ok) return { shipping_query_id, ok, shipping_options: telegramShippingOptions(options.shippingOptions ?? []) };
  const errorMessage = String(options.errorMessage ?? '').trim();
  if (!errorMessage) throw new Error('A rejected Telegram shipping answer requires an error message.');
  return { shipping_query_id, ok, error_message: errorMessage };
}

export function buildTelegramPreCheckoutQueryAnswer(
  preCheckoutQueryId: string,
  ok: boolean,
  errorMessage?: string,
): TelegramMethodParams['answerPreCheckoutQuery'] {
  if (typeof ok !== 'boolean') throw new Error('Telegram pre-checkout answer ok must be boolean.');
  const pre_checkout_query_id = telegramQueryId(preCheckoutQueryId, 'Telegram pre-checkout query ID');
  if (ok) return { pre_checkout_query_id, ok };
  const message = String(errorMessage ?? '').trim();
  if (!message) throw new Error('A rejected Telegram pre-checkout answer requires an error message.');
  return { pre_checkout_query_id, ok, error_message: message };
}

export function buildTelegramGuestQueryAnswer(
  guestQueryId: string,
  value: TelegramInlineQueryResult,
): TelegramMethodParams['answerGuestQuery'] {
  return {
    guest_query_id: telegramQueryId(guestQueryId, 'Telegram guest query ID'),
    result: telegramInlineResult(value, 'Telegram guest result'),
  };
}

export const TELEGRAM_METHODS = [
  'getUpdates', 'setWebhook', 'deleteWebhook', 'getWebhookInfo', 'getMe', 'logOut', 'close',
  'sendMessage', 'forwardMessage', 'forwardMessages', 'copyMessage', 'copyMessages', 'sendPhoto', 'sendLivePhoto',
  'sendAudio', 'sendDocument', 'sendVideo', 'sendAnimation', 'sendVoice', 'sendVideoNote', 'sendPaidMedia',
  'sendMediaGroup', 'sendLocation', 'sendVenue', 'sendContact', 'sendPoll', 'sendChecklist', 'sendDice',
  'sendMessageDraft', 'sendChatAction', 'setMessageReaction', 'getUserProfilePhotos', 'getUserProfileAudios',
  'setUserEmojiStatus', 'getFile', 'banChatMember', 'unbanChatMember', 'restrictChatMember', 'promoteChatMember',
  'setChatAdministratorCustomTitle', 'setChatMemberTag', 'banChatSenderChat', 'unbanChatSenderChat',
  'setChatPermissions', 'exportChatInviteLink', 'createChatInviteLink', 'editChatInviteLink',
  'createChatSubscriptionInviteLink', 'editChatSubscriptionInviteLink', 'revokeChatInviteLink',
  'approveChatJoinRequest', 'declineChatJoinRequest', 'answerChatJoinRequestQuery', 'sendChatJoinRequestWebApp',
  'setChatPhoto', 'deleteChatPhoto', 'setChatTitle', 'setChatDescription', 'pinChatMessage', 'unpinChatMessage',
  'unpinAllChatMessages', 'leaveChat', 'getChat', 'getChatAdministrators', 'getChatMemberCount', 'getChatMember',
  'getUserPersonalChatMessages', 'setChatStickerSet', 'deleteChatStickerSet', 'getForumTopicIconStickers',
  'createForumTopic', 'editForumTopic', 'closeForumTopic', 'reopenForumTopic', 'deleteForumTopic',
  'unpinAllForumTopicMessages', 'editGeneralForumTopic', 'closeGeneralForumTopic', 'reopenGeneralForumTopic',
  'hideGeneralForumTopic', 'unhideGeneralForumTopic', 'unpinAllGeneralForumTopicMessages', 'answerCallbackQuery',
  'answerGuestQuery', 'getUserChatBoosts', 'getBusinessConnection', 'getManagedBotToken', 'replaceManagedBotToken',
  'getManagedBotAccessSettings', 'setManagedBotAccessSettings', 'setMyCommands', 'deleteMyCommands', 'getMyCommands',
  'setMyName', 'getMyName', 'setMyDescription', 'getMyDescription', 'setMyShortDescription', 'getMyShortDescription',
  'setMyProfilePhoto', 'removeMyProfilePhoto', 'setChatMenuButton', 'getChatMenuButton',
  'setMyDefaultAdministratorRights', 'getMyDefaultAdministratorRights', 'getAvailableGifts', 'sendGift',
  'giftPremiumSubscription', 'verifyUser', 'verifyChat', 'removeUserVerification', 'removeChatVerification',
  'readBusinessMessage', 'deleteBusinessMessages', 'setBusinessAccountName', 'setBusinessAccountUsername',
  'setBusinessAccountBio', 'setBusinessAccountProfilePhoto', 'removeBusinessAccountProfilePhoto',
  'setBusinessAccountGiftSettings', 'getBusinessAccountStarBalance', 'transferBusinessAccountStars',
  'getBusinessAccountGifts', 'getUserGifts', 'getChatGifts', 'convertGiftToStars', 'upgradeGift', 'transferGift',
  'postStory', 'repostStory', 'editStory', 'deleteStory', 'answerWebAppQuery', 'savePreparedInlineMessage',
  'savePreparedKeyboardButton', 'editMessageText', 'editMessageCaption', 'editMessageMedia',
  'editMessageLiveLocation', 'stopMessageLiveLocation', 'editMessageChecklist', 'editMessageReplyMarkup', 'stopPoll',
  'editEphemeralMessageText', 'editEphemeralMessageMedia', 'editEphemeralMessageCaption',
  'editEphemeralMessageReplyMarkup', 'approveSuggestedPost', 'declineSuggestedPost', 'deleteMessage',
  'deleteMessages', 'deleteEphemeralMessage', 'deleteMessageReaction', 'deleteAllMessageReactions', 'sendSticker',
  'getStickerSet', 'getCustomEmojiStickers', 'uploadStickerFile', 'createNewStickerSet', 'addStickerToSet',
  'setStickerPositionInSet', 'deleteStickerFromSet', 'replaceStickerInSet', 'setStickerEmojiList',
  'setStickerKeywords', 'setStickerMaskPosition', 'setStickerSetTitle', 'setStickerSetThumbnail',
  'setCustomEmojiStickerSetThumbnail', 'deleteStickerSet', 'sendRichMessage', 'sendRichMessageDraft',
  'answerInlineQuery', 'sendInvoice', 'createInvoiceLink', 'answerShippingQuery', 'answerPreCheckoutQuery',
  'getMyStarBalance', 'getStarTransactions', 'refundStarPayment', 'editUserStarSubscription',
  'setPassportDataErrors', 'sendGame', 'setGameScore', 'getGameHighScores',
] as const;

/** These methods are managed by hosted delivery and should not be used as Visual Flow actions. */
export const TELEGRAM_RUNTIME_MANAGED_METHODS = ['getUpdates', 'setWebhook', 'deleteWebhook', 'logOut', 'close'] as const;

export type TelegramMethod = typeof TELEGRAM_METHODS[number];

export type TelegramMethodParams = {
  sendMessage: TelegramSendMessageParams;
  sendPhoto: TelegramSendPhotoParams;
  sendSticker: TelegramSendOptions & { chat_id: TelegramChatId; sticker: string; emoji?: string };
  sendDocument: TelegramSendDocumentParams;
  sendAudio: TelegramSendAudioParams;
  sendVideo: TelegramSendVideoParams;
  sendAnimation: TelegramSendAnimationParams;
  sendVoice: TelegramSendVoiceParams;
  sendVideoNote: TelegramSendVideoNoteParams;
  sendLocation: TelegramSendLocationParams;
  sendVenue: TelegramSendVenueParams;
  sendContact: TelegramSendContactParams;
  sendPoll: TelegramSendPollParams;
  sendDice: TelegramSendOptions & { chat_id: TelegramChatId; emoji?: string };
  sendMessageDraft: { chat_id: number; draft_id: number; text?: string; message_thread_id?: number; parse_mode?: TelegramParseMode; entities?: TelegramMessageEntity[]; can_stop?: boolean; keep_on_stop?: boolean };
  sendChecklist: { business_connection_id: string; chat_id: TelegramChatId; checklist: ReturnType<typeof buildTelegramChecklist>; disable_notification?: boolean; protect_content?: boolean; message_effect_id?: string; reply_parameters?: Record<string, unknown>; reply_markup?: TelegramInlineKeyboardMarkup };
  sendInvoice: TelegramSendOptions & {
    chat_id: TelegramChatId; title: string; description: string; payload: string; provider_token?: string;
    currency: string; prices: TelegramLabeledPrice[]; max_tip_amount?: number; suggested_tip_amounts?: number[];
    start_parameter?: string; provider_data?: string; photo_url?: string; photo_size?: number; photo_width?: number;
    photo_height?: number; need_name?: boolean; need_phone_number?: boolean; need_email?: boolean;
    need_shipping_address?: boolean; send_phone_number_to_provider?: boolean; send_email_to_provider?: boolean;
    is_flexible?: boolean; allow_paid_broadcast?: boolean; message_effect_id?: string;
    suggested_post_parameters?: Record<string, unknown>;
  };
  sendChatAction: { chat_id: TelegramChatId; action: TelegramChatAction; message_thread_id?: number; business_connection_id?: string };
  setMessageReaction: { chat_id: TelegramChatId; message_id: number; reaction?: TelegramReaction[]; is_big?: boolean };
  forwardMessage: { chat_id: TelegramChatId; from_chat_id: TelegramChatId; message_id: number; disable_notification?: boolean; protect_content?: boolean };
  copyMessage: { chat_id: TelegramChatId; from_chat_id: TelegramChatId; message_id: number; caption?: string; parse_mode?: TelegramParseMode };
  editMessageText: { chat_id?: TelegramChatId; message_id?: number; inline_message_id?: string; text: string; parse_mode?: TelegramParseMode; reply_markup?: TelegramInlineKeyboardMarkup };
  editMessageChecklist: { business_connection_id: string; chat_id: TelegramChatId; message_id: number; checklist: ReturnType<typeof buildTelegramChecklist>; reply_markup?: TelegramInlineKeyboardMarkup };
  deleteMessage: { chat_id: TelegramChatId; message_id: number };
  deleteMessages: { chat_id: TelegramChatId; message_ids: number[] };
  answerCallbackQuery: { callback_query_id: string; text?: string; show_alert?: boolean; url?: string; cache_time?: number };
  answerInlineQuery: { inline_query_id: string; results: TelegramInlineQueryResult[]; cache_time?: number; is_personal?: boolean; next_offset?: string; button?: TelegramInlineQueryResultsButton };
  answerShippingQuery: { shipping_query_id: string; ok: boolean; shipping_options?: TelegramShippingOption[]; error_message?: string };
  answerPreCheckoutQuery: { pre_checkout_query_id: string; ok: boolean; error_message?: string };
  answerGuestQuery: { guest_query_id: string; result: TelegramInlineQueryResult };
  refundStarPayment: { user_id: number; telegram_payment_charge_id: string };
  editUserStarSubscription: { user_id: number; telegram_payment_charge_id: string; is_canceled: boolean };
  createForumTopic: { chat_id: TelegramChatId; name: string; icon_color?: TelegramForumTopicIconColor; icon_custom_emoji_id?: string };
  editForumTopic: { chat_id: TelegramChatId; message_thread_id: number; name?: string; icon_custom_emoji_id?: string };
  closeForumTopic: { chat_id: TelegramChatId; message_thread_id: number };
  reopenForumTopic: { chat_id: TelegramChatId; message_thread_id: number };
  deleteForumTopic: { chat_id: TelegramChatId; message_thread_id: number };
  unpinAllForumTopicMessages: { chat_id: TelegramChatId; message_thread_id: number };
  getMe: Record<string, never>;
  getFile: { file_id: string };
  getChat: { chat_id: TelegramChatId };
  getChatAdministrators: { chat_id: TelegramChatId; return_bots?: boolean };
  getChatMemberCount: { chat_id: TelegramChatId };
  getChatMember: { chat_id: TelegramChatId; user_id: number };
  banChatMember: { chat_id: TelegramChatId; user_id: number; until_date?: number; revoke_messages?: boolean };
  unbanChatMember: { chat_id: TelegramChatId; user_id: number; only_if_banned?: boolean };
  restrictChatMember: { chat_id: TelegramChatId; user_id: number; permissions: TelegramChatPermissions; use_independent_chat_permissions?: boolean; until_date?: number };
  promoteChatMember: { chat_id: TelegramChatId; user_id: number } & TelegramAdministratorRights;
  setChatAdministratorCustomTitle: { chat_id: TelegramChatId; user_id: number; custom_title: string };
  setChatMemberTag: { chat_id: TelegramChatId; user_id: number; tag?: string };
  setChatPermissions: { chat_id: TelegramChatId; permissions: TelegramChatPermissions; use_independent_chat_permissions?: boolean };
  approveChatJoinRequest: { chat_id: TelegramChatId; user_id: number };
  declineChatJoinRequest: { chat_id: TelegramChatId; user_id: number };
  setChatTitle: { chat_id: TelegramChatId; title: string };
  setChatDescription: { chat_id: TelegramChatId; description?: string };
  stopPoll: { chat_id: TelegramChatId; message_id: number; reply_markup?: TelegramInlineKeyboardMarkup };
  pinChatMessage: { chat_id: TelegramChatId; message_id: number; disable_notification?: boolean; business_connection_id?: string };
  unpinChatMessage: { chat_id: TelegramChatId; message_id?: number; business_connection_id?: string };
  unpinAllChatMessages: { chat_id: TelegramChatId };
  leaveChat: { chat_id: TelegramChatId };
};

export type TelegramParamsFor<M extends TelegramMethod> = M extends keyof TelegramMethodParams
  ? TelegramMethodParams[M]
  : Record<string, unknown>;

export interface TelegramApi {
  call<M extends TelegramMethod, T = unknown>(method: M, params: TelegramParamsFor<M>): Promise<T>;
  sendPhoto(photo: string, caption?: string): Promise<unknown>;
  sendSticker(sticker: string, emoji?: string): Promise<unknown>;
  sendDocument(document: string, caption?: string): Promise<unknown>;
  sendAudio(audio: string, caption?: string): Promise<unknown>;
  sendVideo(video: string, caption?: string): Promise<unknown>;
  sendAnimation(animation: string, caption?: string): Promise<unknown>;
  sendVoice(voice: string, caption?: string): Promise<unknown>;
  sendVideoNote(videoNote: string): Promise<unknown>;
  sendLocation(latitude: number, longitude: number): Promise<unknown>;
  sendVenue(latitude: number, longitude: number, title: string, address: string): Promise<unknown>;
  sendContact(phoneNumber: string, firstName: string, lastName?: string): Promise<unknown>;
  sendPoll(question: string, options: string[], anonymous?: boolean): Promise<unknown>;
  sendDice(emoji?: string): Promise<unknown>;
  sendMessageDraft(draftId: number, text?: string, options?: TelegramMessageDraftOptions): Promise<boolean>;
  sendChecklist(checklist: TelegramInputChecklist, options?: TelegramSendChecklistOptions): Promise<TelegramMessage>;
  editChecklist(checklist: TelegramInputChecklist, options?: TelegramEditChecklistOptions): Promise<TelegramMessage>;
  sendInvoice(invoice: TelegramInvoiceOptions): Promise<unknown>;
  sendButtons(text: string, buttons: TelegramInlineButton[]): Promise<unknown>;
  editMessage(text: string, messageId?: string): Promise<unknown>;
  deleteMessage(messageId?: string): Promise<unknown>;
  deleteMessages(messageIds: Array<string | number>): Promise<unknown>;
  answerCallback(text?: string, showAlert?: boolean): Promise<unknown>;
  answerInlineQuery(results: TelegramInlineQueryResult[], options?: TelegramInlineQueryAnswerOptions): Promise<unknown>;
  answerShippingQuery(ok: boolean, options?: TelegramShippingAnswerOptions): Promise<unknown>;
  answerPreCheckoutQuery(ok: boolean, errorMessage?: string): Promise<unknown>;
  answerGuestQuery(result: TelegramInlineQueryResult): Promise<unknown>;
  refundStarPayment(chargeId?: string, userId?: string): Promise<unknown>;
  editStarSubscription(canceled: boolean, chargeId?: string, userId?: string): Promise<unknown>;
  createForumTopic(name: string, options?: TelegramCreateForumTopicOptions): Promise<TelegramForumTopic>;
  editForumTopic(options: TelegramEditForumTopicOptions, messageThreadId?: string | number): Promise<unknown>;
  closeForumTopic(messageThreadId?: string | number): Promise<unknown>;
  reopenForumTopic(messageThreadId?: string | number): Promise<unknown>;
  deleteForumTopic(messageThreadId?: string | number): Promise<unknown>;
  unpinAllForumTopicMessages(messageThreadId?: string | number): Promise<unknown>;
  sendChatAction(action: TelegramChatAction): Promise<unknown>;
  setReaction(emoji: string, messageId?: string, big?: boolean): Promise<unknown>;
  forwardMessage(fromChatId: string, messageId?: string): Promise<unknown>;
  copyMessage(fromChatId: string, messageId?: string): Promise<unknown>;
  pinMessage(messageId?: string, silent?: boolean): Promise<unknown>;
  unpinMessage(messageId?: string): Promise<unknown>;
  stopPoll(messageId?: string): Promise<unknown>;
  banMember(userId: string, options?: { untilDate?: number; revokeMessages?: boolean }): Promise<unknown>;
  unbanMember(userId: string, onlyIfBanned?: boolean): Promise<unknown>;
  restrictMember(userId: string, permissions: TelegramChatPermissions, untilDate?: number): Promise<unknown>;
  promoteMember(userId: string, rights: TelegramAdministratorRights): Promise<unknown>;
  setAdministratorTitle(userId: string, title: string): Promise<unknown>;
  setMemberTag(userId: string, tag?: string): Promise<unknown>;
  setDefaultPermissions(permissions: TelegramChatPermissions): Promise<unknown>;
  approveJoinRequest(userId: string): Promise<unknown>;
  declineJoinRequest(userId: string): Promise<unknown>;
  setChatTitle(title: string): Promise<unknown>;
  setChatDescription(description: string): Promise<unknown>;
  unpinAllMessages(): Promise<unknown>;
  leaveChat(): Promise<unknown>;
}
