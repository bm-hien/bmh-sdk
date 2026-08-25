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
  [key: string]: unknown;
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
  sendChatAction: { chat_id: TelegramChatId; action: TelegramChatAction; message_thread_id?: number; business_connection_id?: string };
  setMessageReaction: { chat_id: TelegramChatId; message_id: number; reaction?: TelegramReaction[]; is_big?: boolean };
  forwardMessage: { chat_id: TelegramChatId; from_chat_id: TelegramChatId; message_id: number; disable_notification?: boolean; protect_content?: boolean };
  copyMessage: { chat_id: TelegramChatId; from_chat_id: TelegramChatId; message_id: number; caption?: string; parse_mode?: TelegramParseMode };
  editMessageText: { chat_id?: TelegramChatId; message_id?: number; inline_message_id?: string; text: string; parse_mode?: TelegramParseMode; reply_markup?: TelegramInlineKeyboardMarkup };
  deleteMessage: { chat_id: TelegramChatId; message_id: number };
  answerCallbackQuery: { callback_query_id: string; text?: string; show_alert?: boolean; url?: string; cache_time?: number };
  getMe: Record<string, never>;
  getFile: { file_id: string };
  getChat: { chat_id: TelegramChatId };
  getChatAdministrators: { chat_id: TelegramChatId; return_bots?: boolean };
  getChatMemberCount: { chat_id: TelegramChatId };
  getChatMember: { chat_id: TelegramChatId; user_id: number };
  banChatMember: { chat_id: TelegramChatId; user_id: number; until_date?: number; revoke_messages?: boolean };
  unbanChatMember: { chat_id: TelegramChatId; user_id: number; only_if_banned?: boolean };
  pinChatMessage: { chat_id: TelegramChatId; message_id: number; disable_notification?: boolean; business_connection_id?: string };
  unpinChatMessage: { chat_id: TelegramChatId; message_id?: number; business_connection_id?: string };
};

export type TelegramParamsFor<M extends TelegramMethod> = M extends keyof TelegramMethodParams
  ? TelegramMethodParams[M]
  : Record<string, unknown>;

export interface TelegramApi {
  call<M extends TelegramMethod, T = unknown>(method: M, params: TelegramParamsFor<M>): Promise<T>;
  sendPhoto(photo: string, caption?: string): Promise<unknown>;
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
  sendButtons(text: string, buttons: TelegramInlineButton[]): Promise<unknown>;
  editMessage(text: string, messageId?: string): Promise<unknown>;
  deleteMessage(messageId?: string): Promise<unknown>;
  answerCallback(text?: string, showAlert?: boolean): Promise<unknown>;
  sendChatAction(action: TelegramChatAction): Promise<unknown>;
  setReaction(emoji: string, messageId?: string, big?: boolean): Promise<unknown>;
  forwardMessage(fromChatId: string, messageId?: string): Promise<unknown>;
  copyMessage(fromChatId: string, messageId?: string): Promise<unknown>;
  pinMessage(messageId?: string, silent?: boolean): Promise<unknown>;
  unpinMessage(messageId?: string): Promise<unknown>;
}
