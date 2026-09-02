import type { TelegramGeneratedMethodParams, TelegramGeneratedMethodResults } from './telegram-method-params';
import type { TelegramBotApiType } from './telegram-bot-api-types';

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
export type TelegramInputFile = string | Blob;
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
  added_to_attachment_menu?: true;
  can_join_groups?: boolean;
  can_read_all_group_messages?: boolean;
  supports_guest_queries?: boolean;
  supports_inline_queries?: boolean;
  can_connect_to_business?: boolean;
  has_main_web_app?: boolean;
  has_topics_enabled?: boolean;
  allows_users_to_create_topics?: boolean;
  can_manage_bots?: boolean;
  supports_join_request_queries?: boolean;
};

export type TelegramChat = {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_forum?: boolean;
  is_direct_messages?: boolean;
};

export type TelegramPhotoSize = {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
};
export type TelegramAudio = {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
  thumbnail?: TelegramPhotoSize;
};
export type TelegramUserProfilePhotos = { total_count: number; photos: TelegramPhotoSize[][] };
export type TelegramUserProfileAudios = { total_count: number; audios: TelegramAudio[] };
export type TelegramMessageId = { message_id: number };
export type TelegramFile = { file_id: string; file_unique_id: string; file_size?: number; file_path?: string };
export type TelegramWebhookInfo = {
  url: string; has_custom_certificate: boolean; pending_update_count: number; ip_address?: string;
  last_error_date?: number; last_error_message?: string; last_synchronization_error_date?: number;
  max_connections?: number; allowed_updates?: string[];
};
export type TelegramChatInviteLink = {
  invite_link: string; creator: TelegramUser; creates_join_request: boolean; is_primary: boolean; is_revoked: boolean;
  name?: string; expire_date?: number; member_limit?: number; pending_join_request_count?: number;
  subscription_period?: number; subscription_price?: number;
};
export type TelegramBotCommand = { command: string; description: string };
export type TelegramBotName = { name: string };
export type TelegramBotDescription = { description: string };
export type TelegramBotShortDescription = { short_description: string };
export type TelegramSentWebAppMessage = { inline_message_id?: string };
export type TelegramProfileListOptions = { offset?: number; limit?: number };

export type TelegramChatMemberOwner = {
  status: 'creator'; user: TelegramUser; is_anonymous: boolean; custom_title?: string;
};
export type TelegramChatMemberAdministrator = {
  status: 'administrator'; user: TelegramUser; can_be_edited: boolean; is_anonymous: boolean;
  can_manage_chat: boolean; can_delete_messages: boolean; can_manage_video_chats: boolean;
  can_restrict_members: boolean; can_promote_members: boolean; can_change_info: boolean;
  can_invite_users: boolean; can_post_stories: boolean; can_edit_stories: boolean;
  can_delete_stories: boolean; can_post_messages?: boolean; can_edit_messages?: boolean;
  can_pin_messages?: boolean; can_manage_topics?: boolean; can_manage_direct_messages?: boolean;
  can_manage_tags?: boolean; can_send_welcome_messages: boolean; custom_title?: string;
};
export type TelegramChatMemberMember = {
  status: 'member'; user: TelegramUser; tag?: string; until_date?: number;
};
export type TelegramChatMemberRestricted = {
  status: 'restricted'; user: TelegramUser; tag?: string; is_member: boolean;
  can_send_messages: boolean; can_send_audios: boolean; can_send_documents: boolean;
  can_send_photos: boolean; can_send_videos: boolean; can_send_video_notes: boolean;
  can_send_voice_notes: boolean; can_send_polls: boolean; can_send_other_messages: boolean;
  can_add_web_page_previews: boolean; can_react_to_messages: boolean; can_edit_tag: boolean;
  can_change_info: boolean; can_invite_users: boolean; can_pin_messages: boolean;
  can_manage_topics: boolean; until_date: number;
};
export type TelegramChatMemberLeft = { status: 'left'; user: TelegramUser };
export type TelegramChatMemberBanned = { status: 'kicked'; user: TelegramUser; until_date: number };
export type TelegramChatMember = TelegramChatMemberOwner | TelegramChatMemberAdministrator |
  TelegramChatMemberMember | TelegramChatMemberRestricted | TelegramChatMemberLeft | TelegramChatMemberBanned;

export type TelegramChatBoostSource =
  | { source: 'premium'; user: TelegramUser }
  | { source: 'gift_code'; user: TelegramUser }
  | { source: 'giveaway'; giveaway_message_id: number; user?: TelegramUser; prize_star_count?: number; is_unclaimed?: true };
export type TelegramChatBoost = {
  boost_id: string; add_date: number; expiration_date: number; source: TelegramChatBoostSource;
};
export type TelegramUserChatBoosts = { boosts: TelegramChatBoost[] };
export type TelegramBusinessBotRights = Partial<Record<
  'can_reply' | 'can_read_messages' | 'can_delete_sent_messages' | 'can_delete_all_messages' |
  'can_edit_name' | 'can_edit_bio' | 'can_edit_profile_photo' | 'can_edit_username' |
  'can_change_gift_settings' | 'can_view_gifts_and_stars' | 'can_convert_gifts_to_stars' |
  'can_transfer_and_upgrade_gifts' | 'can_transfer_stars' | 'can_manage_stories', true
>>;
export type TelegramBusinessConnection = {
  id: string; user: TelegramUser; user_chat_id: number; date: number;
  rights?: TelegramBusinessBotRights; is_enabled: boolean;
};
export type TelegramChatFullInfo = TelegramChat & {
  accent_color_id: number;
  max_reaction_count: number;
  photo?: { small_file_id: string; small_file_unique_id: string; big_file_id: string; big_file_unique_id: string };
  active_usernames?: string[];
  birthdate?: { day: number; month: number; year?: number };
  business_intro?: Record<string, unknown>;
  business_location?: Record<string, unknown>;
  business_opening_hours?: Record<string, unknown>;
  personal_chat?: TelegramChat;
  parent_chat?: TelegramChat;
  available_reactions?: Array<Record<string, unknown>>;
  background_custom_emoji_id?: string;
  profile_accent_color_id?: number;
  profile_background_custom_emoji_id?: string;
  emoji_status_custom_emoji_id?: string;
  emoji_status_expiration_date?: number;
  bio?: string;
  has_private_forwards?: true;
  has_restricted_voice_and_video_messages?: true;
  join_to_send_messages?: true;
  join_by_request?: true;
  description?: string;
  invite_link?: string;
  pinned_message?: TelegramMessage;
  permissions?: TelegramChatPermissions;
  accepted_gift_types: TelegramAcceptedGiftTypes;
  can_send_paid_media?: true;
  slow_mode_delay?: number;
  unrestrict_boost_count?: number;
  message_auto_delete_time?: number;
  has_aggressive_anti_spam_enabled?: true;
  has_hidden_members?: true;
  has_protected_content?: true;
  has_visible_history?: true;
  sticker_set_name?: string;
  can_set_sticker_set?: true;
  custom_emoji_sticker_set_name?: string;
  linked_chat_id?: number;
  location?: Record<string, unknown>;
  rating?: Record<string, unknown>;
  first_profile_audio?: TelegramAudio;
  unique_gift_colors?: TelegramUniqueGiftColors;
  paid_message_star_count?: number;
  guard_bot?: TelegramUser;
  community?: Record<string, unknown>;
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

export type TelegramMessage = TelegramBotApiType<'Message'> & { [key: string]: unknown };

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

export type TelegramCallbackQuery = TelegramBotApiType<'CallbackQuery'>;

export type TelegramUpdate = TelegramBotApiType<'Update'> & { [key: string]: unknown };

export type TelegramInlineKeyboardButton = {
  text: string;
  icon_custom_emoji_id?: string;
  style?: 'danger' | 'success' | 'primary';
  callback_data?: string;
  url?: string;
  web_app?: { url: string };
  login_url?: Record<string, unknown>;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  switch_inline_query_chosen_chat?: Record<string, unknown>;
  copy_text?: { text: string };
  callback_game?: Record<string, never>;
  pay?: boolean;
  disabled?: Record<string, never>;
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
  ephemeral_message_parameters?: TelegramEphemeralMessageParameters;
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
export type TelegramSendPhotoParams = TelegramSendMediaParams & { photo: TelegramInputFile };
export type TelegramSendDocumentParams = TelegramSendMediaParams & { document: TelegramInputFile; disable_content_type_detection?: boolean };
export type TelegramSendAudioParams = TelegramSendMediaParams & { audio: TelegramInputFile; duration?: number; performer?: string; title?: string; thumbnail?: TelegramInputFile };
export type TelegramSendVideoParams = TelegramSendMediaParams & { video: TelegramInputFile; duration?: number; width?: number; height?: number; thumbnail?: TelegramInputFile; supports_streaming?: boolean };
export type TelegramSendAnimationParams = TelegramSendMediaParams & { animation: TelegramInputFile; duration?: number; width?: number; height?: number; thumbnail?: TelegramInputFile };
export type TelegramSendVoiceParams = TelegramSendMediaParams & { voice: TelegramInputFile; duration?: number };
export type TelegramSendVideoNoteParams = TelegramSendOptions & { chat_id: TelegramChatId; video_note: TelegramInputFile; duration?: number; length?: number; thumbnail?: TelegramInputFile };
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
export type TelegramRichText = string | TelegramRichText[] | ({
  type: string;
  text?: TelegramRichText;
} & Record<string, unknown>);
export type TelegramInputRichMedia = {
  type: 'animation' | 'audio' | 'document' | 'photo' | 'video' | 'voice_note';
  media: TelegramInputFile;
  [key: string]: unknown;
};
export type TelegramInputRichMessageMedia = {
  id: string;
  media: TelegramInputRichMedia;
};
export type TelegramRichBlockCaption = { text: TelegramRichText; credit?: TelegramRichText };
export type TelegramRichBlockTableCell = {
  text?: TelegramRichText;
  is_header?: true;
  colspan?: number;
  rowspan?: number;
  align?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom';
};
export type TelegramRichMessageButton = {
  text: TelegramRichText;
  style?: 'danger' | 'success' | 'primary' | 'link';
  url?: string;
  callback_data?: string;
  web_app?: Record<string, unknown>;
  login_url?: Record<string, unknown>;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  switch_inline_query_chosen_chat?: Record<string, unknown>;
  copy_text?: Record<string, unknown>;
  disabled?: Record<string, unknown>;
};
export type TelegramInputRichBlockListItem = {
  blocks: TelegramInputRichBlock[];
  has_checkbox?: true;
  is_checked?: true;
  value?: number;
  type?: 'a' | 'A' | 'i' | 'I' | '1';
};
export type TelegramInputRichBlock = {
  type: 'paragraph' | 'heading' | 'pre' | 'footer' | 'divider' | 'mathematical_expression' | 'anchor' |
    'list' | 'blockquote' | 'expandable_blockquote' | 'pullquote' | 'collage' | 'slideshow' | 'table' |
    'details' | 'map' | 'buttons' | 'animation' | 'audio' | 'document' | 'photo' | 'video' | 'voice_note' |
    'thinking';
  text?: TelegramRichText;
  expression?: string;
  name?: string;
  size?: number;
  language?: string;
  items?: TelegramInputRichBlockListItem[];
  blocks?: TelegramInputRichBlock[];
  credit?: TelegramRichText;
  caption?: TelegramRichText | TelegramRichBlockCaption;
  cells?: TelegramRichBlockTableCell[][];
  summary?: TelegramRichText;
  buttons?: TelegramRichMessageButton[];
  animation?: TelegramInputRichMedia;
  audio?: TelegramInputRichMedia;
  document?: TelegramInputRichMedia;
  photo?: TelegramInputRichMedia;
  video?: TelegramInputRichMedia;
  voice_note?: TelegramInputRichMedia;
  [key: string]: unknown;
};
type TelegramInputRichMessageBase = {
  media?: TelegramInputRichMessageMedia[];
  isRtl?: boolean;
  skipEntityDetection?: boolean;
};
export type TelegramInputRichMessage = TelegramInputRichMessageBase & (
  | { html: string; markdown?: never; blocks?: never }
  | { markdown: string; html?: never; blocks?: never }
  | { blocks: TelegramInputRichBlock[]; html?: never; markdown?: never }
);
export type TelegramSendRichMessageOptions = {
  businessConnectionId?: string;
  messageThreadId?: number;
  directMessagesTopicId?: number;
  ephemeralMessageParameters?: { receiver_user_id: number; callback_query_id?: string; replace_callback_query_message?: boolean };
  disableNotification?: boolean;
  protectContent?: boolean;
  allowPaidBroadcast?: boolean;
  messageEffectId?: string;
  suggestedPostParameters?: Record<string, unknown>;
  replyParameters?: Record<string, unknown>;
  replyMarkup?: Record<string, unknown>;
};
export type TelegramRichMessageDraftOptions = {
  messageThreadId?: number;
  canStop?: boolean;
  keepOnStop?: boolean;
};
export type TelegramEphemeralMessageParameters = {
  receiver_user_id: number;
  callback_query_id?: string;
  replace_callback_query_message?: boolean;
};
export type TelegramEphemeralMessageTarget = {
  receiverUserId?: string | number;
  ephemeralMessageId?: string | number;
};
export type TelegramInputMedia = {
  type: 'animation' | 'audio' | 'document' | 'live_photo' | 'photo' | 'video';
  media: TelegramInputFile;
  thumbnail?: TelegramInputFile;
  caption?: string;
  parse_mode?: TelegramParseMode;
  caption_entities?: TelegramMessageEntity[];
  show_caption_above_media?: boolean;
  has_spoiler?: boolean;
  [key: string]: unknown;
};
export type TelegramEditEphemeralTextOptions = {
  parseMode?: TelegramParseMode;
  entities?: TelegramMessageEntity[];
  linkPreviewOptions?: Record<string, unknown>;
  replyMarkup?: TelegramInlineKeyboardMarkup;
};
export type TelegramEditEphemeralRichMessageOptions = {
  linkPreviewOptions?: Record<string, unknown>;
  replyMarkup?: TelegramInlineKeyboardMarkup;
};
export type TelegramEditEphemeralCaptionOptions = {
  parseMode?: TelegramParseMode;
  captionEntities?: TelegramMessageEntity[];
  showCaptionAboveMedia?: boolean;
  replyMarkup?: TelegramInlineKeyboardMarkup;
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
export type TelegramGiftBackground = {
  center_color: number;
  edge_color: number;
  text_color: number;
};
export type TelegramGift = {
  id: string;
  sticker: Record<string, unknown>;
  star_count: number;
  upgrade_star_count?: number;
  is_premium?: true;
  has_colors?: true;
  total_count?: number;
  remaining_count?: number;
  personal_total_count?: number;
  personal_remaining_count?: number;
  background?: TelegramGiftBackground;
  unique_gift_variant_count?: number;
  publisher_chat?: TelegramChat;
};
export type TelegramGifts = { gifts: TelegramGift[] };
export type TelegramUniqueGiftModel = {
  name: string;
  sticker: Record<string, unknown>;
  rarity_per_mille: number;
  rarity?: 'uncommon' | 'rare' | 'epic' | 'legendary';
};
export type TelegramUniqueGiftSymbol = {
  name: string;
  sticker: Record<string, unknown>;
  rarity_per_mille: number;
};
export type TelegramUniqueGiftBackdropColors = {
  center_color: number;
  edge_color: number;
  symbol_color: number;
  text_color: number;
};
export type TelegramUniqueGiftBackdrop = {
  name: string;
  colors: TelegramUniqueGiftBackdropColors;
  rarity_per_mille: number;
};
export type TelegramUniqueGiftColors = {
  model_custom_emoji_id: string;
  symbol_custom_emoji_id: string;
  light_theme_main_color: number;
  light_theme_other_colors: number[];
  dark_theme_main_color: number;
  dark_theme_other_colors: number[];
};
export type TelegramUniqueGift = {
  gift_id: string;
  base_name: string;
  name: string;
  number: number;
  model: TelegramUniqueGiftModel;
  symbol: TelegramUniqueGiftSymbol;
  backdrop: TelegramUniqueGiftBackdrop;
  is_premium?: true;
  is_burned?: true;
  is_from_blockchain?: true;
  colors?: TelegramUniqueGiftColors;
  publisher_chat?: TelegramChat;
};
export type TelegramOwnedGiftRegular = {
  type: 'regular';
  gift: TelegramGift;
  owned_gift_id?: string;
  sender_user?: TelegramUser;
  send_date: number;
  text?: string;
  entities?: TelegramMessageEntity[];
  is_private?: true;
  is_saved?: true;
  can_be_upgraded?: true;
  was_refunded?: true;
  convert_star_count?: number;
  prepaid_upgrade_star_count?: number;
  is_upgrade_separate?: true;
  unique_gift_number?: number;
};
export type TelegramOwnedGiftUnique = {
  type: 'unique';
  gift: TelegramUniqueGift;
  owned_gift_id?: string;
  sender_user?: TelegramUser;
  send_date: number;
  is_saved?: true;
  can_be_transferred?: true;
  transfer_star_count?: number;
  next_transfer_date?: number;
};
export type TelegramOwnedGift = TelegramOwnedGiftRegular | TelegramOwnedGiftUnique;
export type TelegramOwnedGifts = {
  total_count: number;
  gifts: TelegramOwnedGift[];
  next_offset?: string;
};
export type TelegramAcceptedGiftTypes = {
  unlimited_gifts: boolean;
  limited_gifts: boolean;
  unique_gifts: boolean;
  premium_subscription: boolean;
  gifts_from_channels: boolean;
};
export type TelegramStarAmount = {
  amount: number;
  nanostar_amount?: number;
};
export type TelegramGiftTextOptions = {
  text?: string;
  parseMode?: TelegramParseMode;
  textEntities?: TelegramMessageEntity[];
};
export type TelegramSendGiftOptions = TelegramGiftTextOptions & {
  userId?: string | number;
  chatId?: TelegramChatId;
  payForUpgrade?: boolean;
};
export type TelegramPremiumGiftOptions = TelegramGiftTextOptions & {
  userId?: string | number;
};
export type TelegramOwnedGiftListOptions = {
  excludeUnsaved?: boolean;
  excludeSaved?: boolean;
  excludeUnlimited?: boolean;
  excludeLimitedUpgradable?: boolean;
  excludeLimitedNonUpgradable?: boolean;
  excludeUnique?: boolean;
  excludeFromBlockchain?: boolean;
  sortByPrice?: boolean;
  offset?: string;
  limit?: number;
};
export type TelegramUpgradeGiftOptions = {
  keepOriginalDetails?: boolean;
  starCount?: number;
};

function telegramLookupChatId(value: unknown, label = 'Telegram lookup chat ID'): TelegramChatId {
  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value) || value === 0) throw new Error(`${label} must be a non-zero safe integer or username.`);
    return value;
  }
  const id = String(value ?? '').trim();
  if (!id) throw new Error(`${label} is required.`);
  return id;
}

function telegramLookupBusinessConnectionId(value: unknown) {
  const id = String(value ?? '').trim();
  if (!id) throw new Error('Telegram business connection lookup requires a business connection ID.');
  return id;
}

function telegramProfileListOptions(value: TelegramProfileListOptions, label: string) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} options must be an object.`);
  const unknown = Object.keys(value).find((key) => !['offset', 'limit'].includes(key));
  if (unknown) throw new Error(`Unsupported ${label} option: ${unknown}.`);
  const offset = value.offset;
  const limit = value.limit;
  if (offset !== undefined && (!Number.isSafeInteger(offset) || offset < 0)) {
    throw new Error(`${label} offset must be a non-negative safe integer.`);
  }
  if (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 1 || limit > 100)) {
    throw new Error(`${label} limit must be an integer from 1 to 100.`);
  }
  return { ...(offset === undefined ? {} : { offset }), ...(limit === undefined ? {} : { limit }) };
}

export function buildTelegramBotProfileQuery(): TelegramMethodParams['getMe'] {
  return {};
}

export function buildTelegramChatLookup(chatId: TelegramChatId): TelegramMethodParams['getChat'] {
  return { chat_id: telegramLookupChatId(chatId) };
}

export function buildTelegramChatAdministratorsLookup(
  chatId: TelegramChatId,
  returnBots?: boolean,
): TelegramMethodParams['getChatAdministrators'] {
  if (returnBots !== undefined && typeof returnBots !== 'boolean') {
    throw new Error('Telegram administrator lookup returnBots must be boolean.');
  }
  return { chat_id: telegramLookupChatId(chatId), ...(returnBots === undefined ? {} : { return_bots: returnBots }) };
}

export function buildTelegramChatMemberCountLookup(chatId: TelegramChatId): TelegramMethodParams['getChatMemberCount'] {
  return { chat_id: telegramLookupChatId(chatId) };
}

export function buildTelegramChatMemberLookup(
  chatId: TelegramChatId,
  userId: string | number,
): TelegramMethodParams['getChatMember'] {
  return {
    chat_id: telegramLookupChatId(chatId),
    user_id: telegramPositiveInteger(userId, 'Telegram member lookup user ID'),
  };
}

export function buildTelegramUserProfilePhotosQuery(
  userId: string | number,
  options: TelegramProfileListOptions = {},
): TelegramMethodParams['getUserProfilePhotos'] {
  return {
    user_id: telegramPositiveInteger(userId, 'Telegram profile photo user ID'),
    ...telegramProfileListOptions(options, 'Telegram profile photo query'),
  };
}

export function buildTelegramUserProfileAudiosQuery(
  userId: string | number,
  options: TelegramProfileListOptions = {},
): TelegramMethodParams['getUserProfileAudios'] {
  return {
    user_id: telegramPositiveInteger(userId, 'Telegram profile audio user ID'),
    ...telegramProfileListOptions(options, 'Telegram profile audio query'),
  };
}

export function buildTelegramUserChatBoostsLookup(
  chatId: TelegramChatId,
  userId: string | number,
): TelegramMethodParams['getUserChatBoosts'] {
  return {
    chat_id: telegramLookupChatId(chatId, 'Telegram boost lookup chat ID'),
    user_id: telegramPositiveInteger(userId, 'Telegram boost lookup user ID'),
  };
}

export function buildTelegramBusinessConnectionLookup(
  businessConnectionId: string,
): TelegramMethodParams['getBusinessConnection'] {
  return { business_connection_id: telegramLookupBusinessConnectionId(businessConnectionId) };
}

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
  const numeric = typeof value === 'number' ? value
    : typeof value === 'string' && /^\d+$/.test(value.trim()) ? Number(value.trim()) : Number.NaN;
  if (!Number.isSafeInteger(numeric) || numeric <= 0) throw new Error(`${label} must be a positive integer.`);
  return numeric;
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

const TELEGRAM_RICH_BLOCK_TYPES = new Set([
  'paragraph', 'heading', 'pre', 'footer', 'divider', 'mathematical_expression', 'anchor', 'list',
  'blockquote', 'expandable_blockquote', 'pullquote', 'collage', 'slideshow', 'table', 'details', 'map',
  'buttons', 'animation', 'audio', 'document', 'photo', 'video', 'voice_note', 'thinking',
]);
const TELEGRAM_RICH_MEDIA_TYPES = new Set(['animation', 'audio', 'document', 'photo', 'video', 'voice_note']);
const TELEGRAM_RICH_BUTTON_ACTIONS = [
  'url', 'callback_data', 'web_app', 'login_url', 'switch_inline_query', 'switch_inline_query_current_chat',
  'switch_inline_query_chosen_chat', 'copy_text', 'disabled',
] as const;
const TELEGRAM_RICH_MAX_CHARACTERS = 32_768;
const TELEGRAM_RICH_MAX_BLOCKS = 500;
const TELEGRAM_RICH_MAX_DEPTH = 16;
const TELEGRAM_RICH_MAX_MEDIA = 50;

function telegramRichRecord(value: unknown, label: string) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  return value as Record<string, unknown>;
}

function telegramRichTextLength(value: unknown, label: string, depth = 0): number {
  if (depth > TELEGRAM_RICH_MAX_DEPTH) throw new Error(`Telegram rich message formatting exceeds ${TELEGRAM_RICH_MAX_DEPTH} levels.`);
  if (typeof value === 'string') return Array.from(value).length;
  if (Array.isArray(value)) return value.reduce((total, item) => total + telegramRichTextLength(item, label, depth + 1), 0);
  const record = telegramRichRecord(value, label);
  return record.text === undefined ? 0 : telegramRichTextLength(record.text, label, depth + 1);
}

function telegramRichMedia(value: unknown, label: string, draft: boolean, expectedType?: string) {
  const record = telegramRichRecord(value, label);
  const type = String(record.type ?? '').trim();
  if (!TELEGRAM_RICH_MEDIA_TYPES.has(type) || (expectedType && type !== expectedType)) {
    throw new Error(`${label} has an unsupported media type.`);
  }
  const media = String(record.media ?? '').trim();
  if (!media) throw new Error(`${label} requires a media file ID, URL, or attach reference.`);
  if (draft && /^(?:https?:\/\/|attach:\/\/)/i.test(media)) {
    throw new Error('Telegram rich message drafts can use only previously uploaded media file IDs.');
  }
  return record;
}

type TelegramRichValidationState = { blocks: number; media: number; characters: number };

function telegramRichBlocks(
  value: unknown,
  state: TelegramRichValidationState,
  mode: 'send' | 'draft' | 'edit',
  depth = 1,
) {
  if (!Array.isArray(value) || value.length === 0) throw new Error('Telegram rich message blocks must be a non-empty array.');
  if (depth > TELEGRAM_RICH_MAX_DEPTH) throw new Error(`Telegram rich message blocks exceed ${TELEGRAM_RICH_MAX_DEPTH} levels.`);
  for (const [index, raw] of value.entries()) {
    const label = `Telegram rich message block ${index + 1}`;
    const block = telegramRichRecord(raw, label);
    const type = String(block.type ?? '').trim();
    if (!TELEGRAM_RICH_BLOCK_TYPES.has(type)) throw new Error(`${label} has an unsupported type: ${type || '(empty)'}.`);
    state.blocks += 1;
    if (state.blocks > TELEGRAM_RICH_MAX_BLOCKS) throw new Error(`Telegram rich messages support at most ${TELEGRAM_RICH_MAX_BLOCKS} blocks and structural items.`);

    if (['paragraph', 'heading', 'pre', 'footer', 'expandable_blockquote', 'pullquote', 'thinking'].includes(type)) {
      const length = telegramRichTextLength(block.text, `${label} text`);
      if (length === 0) throw new Error(`${label} requires text.`);
      state.characters += length;
    }
    if (type === 'thinking' && mode !== 'draft') throw new Error('Telegram rich thinking blocks are available only in rich message drafts.');
    if (type === 'heading' && (!Number.isSafeInteger(block.size) || Number(block.size) < 1 || Number(block.size) > 6)) {
      throw new Error(`${label} heading size must be an integer from 1 to 6.`);
    }
    if (type === 'mathematical_expression') {
      const expression = String(block.expression ?? '');
      if (!expression) throw new Error(`${label} requires a mathematical expression.`);
      state.characters += Array.from(expression).length;
    }
    if (type === 'anchor' && !String(block.name ?? '').trim()) throw new Error(`${label} requires an anchor name.`);
    if (block.credit !== undefined) state.characters += telegramRichTextLength(block.credit, `${label} credit`);
    if (block.summary !== undefined) state.characters += telegramRichTextLength(block.summary, `${label} summary`);
    if (block.caption !== undefined) {
      const caption = typeof block.caption === 'object' && block.caption && !Array.isArray(block.caption)
        && ('text' in block.caption || 'credit' in block.caption)
        ? block.caption as Record<string, unknown> : { text: block.caption };
      if (caption.text !== undefined) state.characters += telegramRichTextLength(caption.text, `${label} caption`);
      if (caption.credit !== undefined) state.characters += telegramRichTextLength(caption.credit, `${label} caption credit`);
    }

    if (['blockquote', 'collage', 'slideshow', 'details'].includes(type)) {
      telegramRichBlocks(block.blocks, state, mode, depth + 1);
    }
    if (type === 'list') {
      if (!Array.isArray(block.items) || block.items.length === 0) throw new Error(`${label} requires at least one list item.`);
      for (const [itemIndex, rawItem] of block.items.entries()) {
        const item = telegramRichRecord(rawItem, `${label} item ${itemIndex + 1}`);
        state.blocks += 1;
        if (state.blocks > TELEGRAM_RICH_MAX_BLOCKS) throw new Error(`Telegram rich messages support at most ${TELEGRAM_RICH_MAX_BLOCKS} blocks and structural items.`);
        if (item.type !== undefined && !['a', 'A', 'i', 'I', '1'].includes(String(item.type))) {
          throw new Error(`${label} item ${itemIndex + 1} has an unsupported ordered-list label type.`);
        }
        telegramRichBlocks(item.blocks, state, mode, depth + 1);
      }
    }
    if (type === 'table') {
      if (!Array.isArray(block.cells) || block.cells.length === 0) throw new Error(`${label} requires at least one table row.`);
      for (const [rowIndex, rawRow] of block.cells.entries()) {
        if (!Array.isArray(rawRow) || rawRow.length === 0) throw new Error(`${label} row ${rowIndex + 1} must contain cells.`);
        const columns = rawRow.reduce((total, rawCell) => {
          const cell = telegramRichRecord(rawCell, `${label} row ${rowIndex + 1} cell`);
          if (cell.text !== undefined) state.characters += telegramRichTextLength(cell.text, `${label} cell text`);
          const span = cell.colspan === undefined ? 1 : Number(cell.colspan);
          if (!Number.isSafeInteger(span) || span < 1) throw new Error(`${label} cell colspan must be a positive integer.`);
          return total + span;
        }, 0);
        if (columns > 20) throw new Error('Telegram rich message tables support at most 20 columns.');
        state.blocks += 1;
        if (state.blocks > TELEGRAM_RICH_MAX_BLOCKS) throw new Error(`Telegram rich messages support at most ${TELEGRAM_RICH_MAX_BLOCKS} blocks and structural items.`);
      }
    }
    if (type === 'buttons') {
      if (!Array.isArray(block.buttons) || block.buttons.length < 1 || block.buttons.length > 8) {
        throw new Error(`${label} requires 1-8 buttons.`);
      }
      if (block.align !== undefined && !['left', 'center', 'right'].includes(String(block.align))) {
        throw new Error(`${label} button alignment must be left, center, or right.`);
      }
      for (const [buttonIndex, rawButton] of block.buttons.entries()) {
        const button = telegramRichRecord(rawButton, `${label} button ${buttonIndex + 1}`);
        const textLength = telegramRichTextLength(button.text, `${label} button ${buttonIndex + 1} text`);
        if (!textLength) throw new Error(`${label} button ${buttonIndex + 1} requires text.`);
        state.characters += textLength;
        const actions = TELEGRAM_RICH_BUTTON_ACTIONS.filter((key) => button[key] !== undefined);
        if (actions.length !== 1) throw new Error(`${label} button ${buttonIndex + 1} requires exactly one action.`);
        if (button.callback_data !== undefined) {
          const bytes = telegramUtf8Length(String(button.callback_data));
          if (bytes < 1 || bytes > 64) throw new Error(`${label} button callback data must be 1-64 bytes.`);
        }
        if (button.style !== undefined && !['danger', 'success', 'primary', 'link'].includes(String(button.style))) {
          throw new Error(`${label} button style is unsupported.`);
        }
        if (button.style === 'link' && button.callback_data === undefined) {
          throw new Error(`${label} link style is available only for callback buttons.`);
        }
      }
    }
    if (type === 'map') {
      const location = telegramRichRecord(block.location, `${label} location`);
      const latitude = Number(location.latitude);
      const longitude = Number(location.longitude);
      if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
        throw new Error(`${label} requires valid latitude and longitude.`);
      }
      for (const [key, maximum] of [['zoom', 24], ['width', 10_000], ['height', 10_000]] as const) {
        if (block[key] !== undefined && (!Number.isSafeInteger(block[key]) || Number(block[key]) < 0 || Number(block[key]) > maximum)) {
          throw new Error(`${label} ${key} must be an integer from 0 to ${maximum}.`);
        }
      }
      const width = Number(block.width ?? 0);
      const height = Number(block.height ?? 0);
      if (width && height && (width + height > 10_000 || Math.max(width / height, height / width) > 20)) {
        throw new Error(`${label} map dimensions exceed Telegram limits.`);
      }
    }
    if (TELEGRAM_RICH_MEDIA_TYPES.has(type)) {
      telegramRichMedia(block[type], `${label} ${type}`, mode !== 'send', type);
      state.media += 1;
    }
    if (state.media > TELEGRAM_RICH_MAX_MEDIA) throw new Error(`Telegram rich messages support at most ${TELEGRAM_RICH_MAX_MEDIA} media attachments.`);
    if (state.characters > TELEGRAM_RICH_MAX_CHARACTERS) throw new Error(`Telegram rich messages support at most ${TELEGRAM_RICH_MAX_CHARACTERS} characters.`);
  }
}

export function buildTelegramRichMessage(value: TelegramInputRichMessage, mode: 'send' | 'draft' | 'edit' = 'send') {
  const record = telegramRichRecord(value, 'Telegram rich message');
  const allowed = new Set(['html', 'markdown', 'blocks', 'media', 'isRtl', 'skipEntityDetection']);
  const unknown = Object.keys(record).find((key) => !allowed.has(key));
  if (unknown) throw new Error(`Unsupported Telegram rich message field: ${unknown}.`);
  const contentKeys = ['html', 'markdown', 'blocks'].filter((key) => record[key] !== undefined);
  if (contentKeys.length !== 1) throw new Error('Telegram rich messages require exactly one of html, markdown, or blocks.');
  for (const key of ['isRtl', 'skipEntityDetection'] as const) {
    if (record[key] !== undefined && typeof record[key] !== 'boolean') throw new Error(`Telegram rich message ${key} must be boolean.`);
  }
  const state: TelegramRichValidationState = { blocks: 0, media: 0, characters: 0 };
  const contentKey = contentKeys[0];
  if (contentKey === 'blocks') telegramRichBlocks(record.blocks, state, mode);
  else {
    if (typeof record[contentKey] !== 'string' || !record[contentKey]) throw new Error(`Telegram rich message ${contentKey} must be a non-empty string.`);
    state.characters = Array.from(record[contentKey] as string).length;
    if (mode !== 'draft' && /<tg-thinking(?:\s|>)/i.test(record[contentKey] as string)) {
      throw new Error('Telegram rich thinking blocks are available only in rich message drafts.');
    }
  }
  if (state.characters > TELEGRAM_RICH_MAX_CHARACTERS) throw new Error(`Telegram rich messages support at most ${TELEGRAM_RICH_MAX_CHARACTERS} characters.`);
  let media: Array<{ id: string; media: Record<string, unknown> }> | undefined;
  if (record.media !== undefined) {
    if (!Array.isArray(record.media)) throw new Error('Telegram rich message media must be an array.');
    const ids = new Set<string>();
    media = record.media.map((raw, index) => {
      const item = telegramRichRecord(raw, `Telegram rich message media ${index + 1}`);
      const id = String(item.id ?? '').trim();
      if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) throw new Error(`Telegram rich message media ${index + 1} ID must use 1-64 letters, digits, underscores, or hyphens.`);
      if (ids.has(id)) throw new Error('Telegram rich message media IDs must be unique.');
      ids.add(id);
      return { id, media: telegramRichMedia(item.media, `Telegram rich message media ${index + 1}`, mode !== 'send') };
    });
    state.media += media.length;
  }
  if (state.media > TELEGRAM_RICH_MAX_MEDIA) throw new Error(`Telegram rich messages support at most ${TELEGRAM_RICH_MAX_MEDIA} media attachments.`);
  return {
    ...(contentKey === 'html' ? { html: record.html as string } : {}),
    ...(contentKey === 'markdown' ? { markdown: record.markdown as string } : {}),
    ...(contentKey === 'blocks' ? { blocks: record.blocks as TelegramInputRichBlock[] } : {}),
    ...(media === undefined ? {} : { media }),
    ...(record.isRtl === undefined ? {} : { is_rtl: record.isRtl as boolean }),
    ...(record.skipEntityDetection === undefined ? {} : { skip_entity_detection: record.skipEntityDetection as boolean }),
  };
}

function telegramRichChatId(value: TelegramChatId, draft: true): number;
function telegramRichChatId(value: TelegramChatId, draft?: false): TelegramChatId;
function telegramRichChatId(value: TelegramChatId, draft = false): TelegramChatId {
  if (draft) {
    const chatId = Number(value);
    if (!Number.isSafeInteger(chatId) || chatId <= 0) throw new Error('Telegram rich message drafts require a private-chat user ID.');
    return chatId;
  }
  const chatId = typeof value === 'number' ? value : String(value ?? '').trim();
  if (chatId === '' || (typeof chatId === 'number' && (!Number.isSafeInteger(chatId) || chatId === 0))) {
    throw new Error('Telegram rich messages require a valid destination chat.');
  }
  return chatId;
}

export function buildTelegramRichMessageSend(
  chatId: TelegramChatId,
  richMessage: TelegramInputRichMessage,
  options: TelegramSendRichMessageOptions = {},
): TelegramMethodParams['sendRichMessage'] {
  const record = telegramRichRecord(options, 'Telegram rich message options');
  const keys = new Set([
    'businessConnectionId', 'messageThreadId', 'directMessagesTopicId', 'ephemeralMessageParameters',
    'disableNotification', 'protectContent', 'allowPaidBroadcast', 'messageEffectId', 'suggestedPostParameters',
    'replyParameters', 'replyMarkup',
  ]);
  const unknown = Object.keys(record).find((key) => !keys.has(key));
  if (unknown) throw new Error(`Unsupported Telegram rich message option: ${unknown}.`);
  for (const key of ['disableNotification', 'protectContent', 'allowPaidBroadcast'] as const) {
    if (options[key] !== undefined && typeof options[key] !== 'boolean') throw new Error(`Telegram rich message ${key} must be boolean.`);
  }
  const positive = (value: unknown, label: string) => value === undefined ? undefined : telegramPositiveInteger(value, label);
  const messageThreadId = positive(options.messageThreadId, 'Telegram rich message thread ID');
  const directMessagesTopicId = positive(options.directMessagesTopicId, 'Telegram rich direct messages topic ID');
  const businessConnectionId = options.businessConnectionId === undefined ? undefined : String(options.businessConnectionId).trim();
  if (options.businessConnectionId !== undefined && !businessConnectionId) throw new Error('Telegram rich message business connection ID cannot be empty.');
  let ephemeral: TelegramEphemeralMessageParameters | undefined;
  if (options.ephemeralMessageParameters !== undefined) {
    const value = telegramRichRecord(options.ephemeralMessageParameters, 'Telegram ephemeral message parameters');
    const unknownEphemeral = Object.keys(value).find((key) => !['receiver_user_id', 'callback_query_id', 'replace_callback_query_message'].includes(key));
    if (unknownEphemeral) throw new Error(`Unsupported Telegram ephemeral message parameter: ${unknownEphemeral}.`);
    const receiverUserId = telegramPositiveInteger(value.receiver_user_id, 'Telegram ephemeral receiver user ID');
    const callbackQueryId = value.callback_query_id === undefined ? undefined : String(value.callback_query_id).trim();
    if (value.callback_query_id !== undefined && !callbackQueryId) throw new Error('Telegram ephemeral callback query ID cannot be empty.');
    if (value.replace_callback_query_message !== undefined && typeof value.replace_callback_query_message !== 'boolean') {
      throw new Error('Telegram ephemeral replace_callback_query_message must be boolean.');
    }
    ephemeral = {
      receiver_user_id: receiverUserId,
      ...(callbackQueryId === undefined ? {} : { callback_query_id: callbackQueryId }),
      ...(value.replace_callback_query_message === undefined ? {} : { replace_callback_query_message: value.replace_callback_query_message }),
    };
  }
  for (const [key, value] of [['suggestedPostParameters', options.suggestedPostParameters], ['replyParameters', options.replyParameters], ['replyMarkup', options.replyMarkup]] as const) {
    if (value !== undefined) telegramRichRecord(value, `Telegram rich message ${key}`);
  }
  return {
    chat_id: telegramRichChatId(chatId), rich_message: buildTelegramRichMessage(richMessage),
    ...(businessConnectionId === undefined ? {} : { business_connection_id: businessConnectionId }),
    ...(messageThreadId === undefined ? {} : { message_thread_id: messageThreadId }),
    ...(directMessagesTopicId === undefined ? {} : { direct_messages_topic_id: directMessagesTopicId }),
    ...(ephemeral === undefined ? {} : { ephemeral_message_parameters: ephemeral }),
    ...(options.disableNotification === undefined ? {} : { disable_notification: options.disableNotification }),
    ...(options.protectContent === undefined ? {} : { protect_content: options.protectContent }),
    ...(options.allowPaidBroadcast === undefined ? {} : { allow_paid_broadcast: options.allowPaidBroadcast }),
    ...(options.messageEffectId === undefined ? {} : { message_effect_id: String(options.messageEffectId).trim() }),
    ...(options.suggestedPostParameters === undefined ? {} : { suggested_post_parameters: options.suggestedPostParameters }),
    ...(options.replyParameters === undefined ? {} : { reply_parameters: options.replyParameters }),
    ...(options.replyMarkup === undefined ? {} : { reply_markup: options.replyMarkup }),
  };
}

export function buildTelegramRichMessageDraft(
  chatId: TelegramChatId,
  draftId: number,
  richMessage: TelegramInputRichMessage,
  options: TelegramRichMessageDraftOptions = {},
): TelegramMethodParams['sendRichMessageDraft'] {
  const record = telegramRichRecord(options, 'Telegram rich message draft options');
  const unknown = Object.keys(record).find((key) => !['messageThreadId', 'canStop', 'keepOnStop'].includes(key));
  if (unknown) throw new Error(`Unsupported Telegram rich message draft option: ${unknown}.`);
  if (!Number.isSafeInteger(draftId) || draftId === 0) throw new Error('Telegram rich message draft ID must be a non-zero safe integer.');
  for (const key of ['canStop', 'keepOnStop'] as const) {
    if (options[key] !== undefined && typeof options[key] !== 'boolean') throw new Error(`Telegram rich message draft ${key} must be boolean.`);
  }
  const messageThreadId = options.messageThreadId === undefined ? undefined
    : telegramPositiveInteger(options.messageThreadId, 'Telegram rich message draft thread ID');
  return {
    chat_id: telegramRichChatId(chatId, true), draft_id: draftId, rich_message: buildTelegramRichMessage(richMessage, 'draft'),
    ...(messageThreadId === undefined ? {} : { message_thread_id: messageThreadId }),
    ...(options.canStop === undefined ? {} : { can_stop: options.canStop }),
    ...(options.keepOnStop === undefined ? {} : { keep_on_stop: options.keepOnStop }),
  };
}

export function buildTelegramRichMessageEdit(
  chatId: TelegramChatId,
  messageId: string | number,
  richMessage: TelegramInputRichMessage,
  inlineMessageId?: string,
): TelegramMethodParams['editMessageText'] {
  const inline_message_id = inlineMessageId === undefined ? undefined : String(inlineMessageId).trim();
  if (inlineMessageId !== undefined && !inline_message_id) throw new Error('Telegram inline message ID cannot be empty.');
  if (inline_message_id) return { inline_message_id, rich_message: buildTelegramRichMessage(richMessage, 'edit') };
  const message_id = Number(messageId);
  if (!Number.isSafeInteger(message_id) || message_id <= 0) throw new Error('Telegram rich message edits require a positive message ID.');
  return {
    chat_id: telegramRichChatId(chatId), message_id,
    rich_message: buildTelegramRichMessage(richMessage, 'edit'),
  };
}

function telegramEphemeralTarget(
  chatId: TelegramChatId,
  receiverUserId: string | number,
  ephemeralMessageId: string | number,
) {
  return {
    chat_id: telegramRichChatId(chatId),
    receiver_user_id: telegramPositiveInteger(receiverUserId, 'Telegram ephemeral receiver user ID'),
    ephemeral_message_id: telegramPositiveInteger(ephemeralMessageId, 'Telegram ephemeral message ID'),
  };
}

function telegramEphemeralParseMode(value: unknown, label: string): TelegramParseMode | undefined {
  if (value === undefined) return undefined;
  if (value !== 'HTML' && value !== 'MarkdownV2') throw new Error(`${label} must be HTML or MarkdownV2.`);
  return value;
}

function telegramEphemeralEntities(value: unknown, label: string) {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) throw new Error(`${label} must be an array.`);
  return value.map((entity, index) => {
    const record = telegramRichRecord(entity, `${label} item ${index + 1}`);
    if (typeof record.type !== 'string' || !record.type.trim()) throw new Error(`${label} item ${index + 1} requires a type.`);
    if (!Number.isSafeInteger(record.offset) || Number(record.offset) < 0
      || !Number.isSafeInteger(record.length) || Number(record.length) <= 0) {
      throw new Error(`${label} item ${index + 1} requires a non-negative offset and positive length.`);
    }
    return record as TelegramMessageEntity;
  });
}

function telegramEphemeralReplyMarkup(value: unknown, label: string) {
  if (value === undefined) return undefined;
  const markup = telegramRichRecord(value, label);
  const unknown = Object.keys(markup).find((key) => key !== 'inline_keyboard');
  if (unknown) throw new Error(`Unsupported ${label} field: ${unknown}.`);
  if (!Array.isArray(markup.inline_keyboard)) throw new Error(`${label} requires inline_keyboard rows.`);
  const actionFields = [
    'url', 'callback_data', 'web_app', 'login_url', 'switch_inline_query', 'switch_inline_query_current_chat',
    'switch_inline_query_chosen_chat', 'copy_text', 'callback_game', 'pay', 'disabled',
  ];
  const inline_keyboard = markup.inline_keyboard.map((row, rowIndex) => {
    if (!Array.isArray(row) || !row.length) throw new Error(`${label} row ${rowIndex + 1} cannot be empty.`);
    return row.map((button, columnIndex) => {
      const itemLabel = `${label} button ${rowIndex + 1}:${columnIndex + 1}`;
      const record = telegramRichRecord(button, itemLabel);
      if (typeof record.text !== 'string' || !record.text.trim()) throw new Error(`${itemLabel} requires text.`);
      const unknownButton = Object.keys(record).find((key) => ![
        'text', 'icon_custom_emoji_id', 'style', ...actionFields,
      ].includes(key));
      if (unknownButton) throw new Error(`Unsupported ${itemLabel} field: ${unknownButton}.`);
      const actions = actionFields.filter((key) => record[key] !== undefined);
      if (actions.length !== 1) throw new Error(`${itemLabel} must define exactly one action.`);
      if (record.login_url !== undefined) throw new Error(`${itemLabel} cannot use login_url in an ephemeral message.`);
      if (record.callback_data !== undefined) {
        const bytes = new TextEncoder().encode(String(record.callback_data)).byteLength;
        if (bytes < 1 || bytes > 64) throw new Error(`${itemLabel} callback_data must be 1-64 bytes.`);
      }
      if (record.style !== undefined && !['danger', 'success', 'primary'].includes(String(record.style))) {
        throw new Error(`${itemLabel} style must be danger, success, or primary.`);
      }
      return record as TelegramInlineKeyboardButton;
    });
  });
  return { inline_keyboard };
}

function telegramEphemeralEditOptions(
  options: TelegramEditEphemeralTextOptions | TelegramEditEphemeralRichMessageOptions,
  allowTextFormatting: boolean,
) {
  const record = telegramRichRecord(options, 'Telegram ephemeral message edit options');
  const allowed = allowTextFormatting
    ? ['parseMode', 'entities', 'linkPreviewOptions', 'replyMarkup']
    : ['linkPreviewOptions', 'replyMarkup'];
  const unknown = Object.keys(record).find((key) => !allowed.includes(key));
  if (unknown) throw new Error(`Unsupported Telegram ephemeral message edit option: ${unknown}.`);
  const parseMode = allowTextFormatting ? telegramEphemeralParseMode(record.parseMode, 'Telegram ephemeral parse mode') : undefined;
  const entities = allowTextFormatting ? telegramEphemeralEntities(record.entities, 'Telegram ephemeral message entities') : undefined;
  if (parseMode !== undefined && entities !== undefined) throw new Error('Telegram ephemeral edits cannot use parseMode and entities together.');
  const linkPreviewOptions = record.linkPreviewOptions === undefined ? undefined
    : telegramRichRecord(record.linkPreviewOptions, 'Telegram ephemeral link preview options');
  const replyMarkup = telegramEphemeralReplyMarkup(record.replyMarkup, 'Telegram ephemeral reply markup');
  return { parseMode, entities, linkPreviewOptions, replyMarkup };
}

export function buildTelegramEphemeralTextEdit(
  chatId: TelegramChatId,
  receiverUserId: string | number,
  ephemeralMessageId: string | number,
  text: string,
  options: TelegramEditEphemeralTextOptions = {},
): TelegramMethodParams['editEphemeralMessageText'] {
  const value = telegramInvoiceText(text, 'Telegram ephemeral message text', 1, 4096);
  const validated = telegramEphemeralEditOptions(options, true);
  return {
    ...telegramEphemeralTarget(chatId, receiverUserId, ephemeralMessageId), text: value,
    ...(validated.parseMode === undefined ? {} : { parse_mode: validated.parseMode }),
    ...(validated.entities === undefined ? {} : { entities: validated.entities }),
    ...(validated.linkPreviewOptions === undefined ? {} : { link_preview_options: validated.linkPreviewOptions }),
    ...(validated.replyMarkup === undefined ? {} : { reply_markup: validated.replyMarkup }),
  };
}

export function buildTelegramEphemeralRichMessageEdit(
  chatId: TelegramChatId,
  receiverUserId: string | number,
  ephemeralMessageId: string | number,
  richMessage: TelegramInputRichMessage,
  options: TelegramEditEphemeralRichMessageOptions = {},
): TelegramMethodParams['editEphemeralMessageText'] {
  const validated = telegramEphemeralEditOptions(options, false);
  return {
    ...telegramEphemeralTarget(chatId, receiverUserId, ephemeralMessageId),
    rich_message: buildTelegramRichMessage(richMessage, 'edit'),
    ...(validated.linkPreviewOptions === undefined ? {} : { link_preview_options: validated.linkPreviewOptions }),
    ...(validated.replyMarkup === undefined ? {} : { reply_markup: validated.replyMarkup }),
  };
}

export function buildTelegramEphemeralMediaEdit(
  chatId: TelegramChatId,
  receiverUserId: string | number,
  ephemeralMessageId: string | number,
  media: TelegramInputMedia,
  replyMarkup?: TelegramInlineKeyboardMarkup,
): TelegramMethodParams['editEphemeralMessageMedia'] {
  const record = telegramRichRecord(media, 'Telegram ephemeral media');
  if (!['animation', 'audio', 'document', 'live_photo', 'photo', 'video'].includes(String(record.type))) {
    throw new Error('Telegram ephemeral media type must be animation, audio, document, live_photo, photo, or video.');
  }
  if (typeof record.media !== 'string' || !record.media.trim()) throw new Error('Telegram ephemeral media requires a file ID, URL, or attachment reference.');
  telegramEphemeralParseMode(record.parse_mode, 'Telegram ephemeral media parse mode');
  const captionEntities = telegramEphemeralEntities(record.caption_entities, 'Telegram ephemeral media caption entities');
  if (record.parse_mode !== undefined && captionEntities !== undefined) throw new Error('Telegram ephemeral media cannot use parse_mode and caption_entities together.');
  if (record.caption !== undefined) telegramInvoiceText(String(record.caption), 'Telegram ephemeral media caption', 0, 1024);
  for (const key of ['show_caption_above_media', 'has_spoiler'] as const) {
    if (record[key] !== undefined && typeof record[key] !== 'boolean') throw new Error(`Telegram ephemeral media ${key} must be boolean.`);
  }
  const markup = telegramEphemeralReplyMarkup(replyMarkup, 'Telegram ephemeral reply markup');
  return {
    ...telegramEphemeralTarget(chatId, receiverUserId, ephemeralMessageId), media: record as TelegramInputMedia,
    ...(markup === undefined ? {} : { reply_markup: markup }),
  };
}

export function buildTelegramEphemeralCaptionEdit(
  chatId: TelegramChatId,
  receiverUserId: string | number,
  ephemeralMessageId: string | number,
  caption = '',
  options: TelegramEditEphemeralCaptionOptions = {},
): TelegramMethodParams['editEphemeralMessageCaption'] {
  const record = telegramRichRecord(options, 'Telegram ephemeral caption edit options');
  const unknown = Object.keys(record).find((key) => !['parseMode', 'captionEntities', 'showCaptionAboveMedia', 'replyMarkup'].includes(key));
  if (unknown) throw new Error(`Unsupported Telegram ephemeral caption edit option: ${unknown}.`);
  const parseMode = telegramEphemeralParseMode(record.parseMode, 'Telegram ephemeral caption parse mode');
  const captionEntities = telegramEphemeralEntities(record.captionEntities, 'Telegram ephemeral caption entities');
  if (parseMode !== undefined && captionEntities !== undefined) throw new Error('Telegram ephemeral captions cannot use parseMode and captionEntities together.');
  if (record.showCaptionAboveMedia !== undefined && typeof record.showCaptionAboveMedia !== 'boolean') {
    throw new Error('Telegram ephemeral showCaptionAboveMedia must be boolean.');
  }
  const markup = telegramEphemeralReplyMarkup(record.replyMarkup, 'Telegram ephemeral reply markup');
  return {
    ...telegramEphemeralTarget(chatId, receiverUserId, ephemeralMessageId),
    caption: telegramInvoiceText(caption, 'Telegram ephemeral caption', 0, 1024),
    ...(parseMode === undefined ? {} : { parse_mode: parseMode }),
    ...(captionEntities === undefined ? {} : { caption_entities: captionEntities }),
    ...(record.showCaptionAboveMedia === undefined ? {} : { show_caption_above_media: record.showCaptionAboveMedia as boolean }),
    ...(markup === undefined ? {} : { reply_markup: markup }),
  };
}

export function buildTelegramEphemeralReplyMarkupEdit(
  chatId: TelegramChatId,
  receiverUserId: string | number,
  ephemeralMessageId: string | number,
  replyMarkup?: TelegramInlineKeyboardMarkup,
): TelegramMethodParams['editEphemeralMessageReplyMarkup'] {
  const markup = telegramEphemeralReplyMarkup(replyMarkup, 'Telegram ephemeral reply markup');
  return {
    ...telegramEphemeralTarget(chatId, receiverUserId, ephemeralMessageId),
    ...(markup === undefined ? {} : { reply_markup: markup }),
  };
}

export function buildTelegramEphemeralDelete(
  chatId: TelegramChatId,
  receiverUserId: string | number,
  ephemeralMessageId: string | number,
): TelegramMethodParams['deleteEphemeralMessage'] {
  return telegramEphemeralTarget(chatId, receiverUserId, ephemeralMessageId);
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

const TELEGRAM_ACCEPTED_GIFT_TYPE_FIELDS = [
  'unlimited_gifts', 'limited_gifts', 'unique_gifts', 'premium_subscription', 'gifts_from_channels',
] as const;
const telegramGiftEntityTypes = new Set([
  'bold', 'italic', 'underline', 'strikethrough', 'spoiler', 'custom_emoji', 'date_time',
]);

function telegramGiftId(value: unknown, label = 'Telegram gift ID') {
  const id = String(value ?? '').trim();
  if (!id) throw new Error(`${label} is required.`);
  return id;
}

function telegramGiftBusinessConnectionId(value: unknown) {
  const id = String(value ?? '').trim();
  if (!id) throw new Error('Telegram Business gift actions require a business connection ID.');
  return id;
}

function telegramGiftChatId(value: unknown, label: string): TelegramChatId {
  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value) || value === 0) throw new Error(`${label} must be a non-zero safe integer or username.`);
    return value;
  }
  const chatId = String(value ?? '').trim();
  if (!chatId) throw new Error(`${label} is required.`);
  return chatId;
}

function telegramGiftTextOptions(value: TelegramGiftTextOptions, label: string) {
  const record = telegramRichRecord(value, `${label} options`);
  const unknown = Object.keys(record).find((key) => !['text', 'parseMode', 'textEntities'].includes(key));
  if (unknown) throw new Error(`Unsupported ${label} option: ${unknown}.`);
  const text = value.text === undefined ? undefined : String(value.text);
  if (text !== undefined && Array.from(text).length > 128) throw new Error(`${label} text must be 0-128 characters.`);
  const parseMode = telegramEphemeralParseMode(value.parseMode, `${label} parse mode`);
  const textEntities = telegramEphemeralEntities(value.textEntities, `${label} text entities`);
  if (parseMode !== undefined && textEntities !== undefined) {
    throw new Error(`${label} parseMode and textEntities are mutually exclusive.`);
  }
  if ((parseMode !== undefined || textEntities !== undefined) && text === undefined) {
    throw new Error(`${label} formatting requires text.`);
  }
  const unsupportedEntity = textEntities?.find((entity) => !telegramGiftEntityTypes.has(entity.type));
  if (unsupportedEntity) throw new Error(`${label} does not support the ${unsupportedEntity.type} entity type.`);
  return {
    ...(text === undefined ? {} : { text }),
    ...(parseMode === undefined ? {} : { text_parse_mode: parseMode }),
    ...(textEntities === undefined ? {} : { text_entities: textEntities }),
  };
}

export function buildTelegramGiftSend(
  giftId: string,
  options: TelegramSendGiftOptions,
): TelegramMethodParams['sendGift'] {
  const record = telegramRichRecord(options, 'Telegram send gift options');
  const unknown = Object.keys(record).find((key) => ![
    'userId', 'chatId', 'payForUpgrade', 'text', 'parseMode', 'textEntities',
  ].includes(key));
  if (unknown) throw new Error(`Unsupported Telegram send gift option: ${unknown}.`);
  const hasUser = options.userId !== undefined;
  const hasChat = options.chatId !== undefined;
  if (Number(hasUser) + Number(hasChat) !== 1) {
    throw new Error('Telegram sendGift requires exactly one of userId or chatId.');
  }
  if (options.payForUpgrade !== undefined && typeof options.payForUpgrade !== 'boolean') {
    throw new Error('Telegram send gift payForUpgrade must be boolean.');
  }
  const recipient = hasUser
    ? { user_id: telegramPositiveInteger(options.userId, 'Telegram gift receiver user ID') }
    : { chat_id: telegramGiftChatId(options.chatId, 'Telegram gift receiver chat ID') };
  return {
    ...recipient,
    gift_id: telegramGiftId(giftId),
    ...(options.payForUpgrade === undefined ? {} : { pay_for_upgrade: options.payForUpgrade }),
    ...telegramGiftTextOptions({ text: options.text, parseMode: options.parseMode, textEntities: options.textEntities }, 'Telegram gift'),
  };
}

export function buildTelegramPremiumSubscriptionGift(
  userId: string | number,
  monthCount: 3 | 6 | 12,
  options: TelegramGiftTextOptions = {},
): TelegramMethodParams['giftPremiumSubscription'] {
  if (![3, 6, 12].includes(monthCount)) throw new Error('Telegram Premium gifts support exactly 3, 6, or 12 months.');
  const starCounts = { 3: 1000, 6: 1500, 12: 2500 } as const;
  return {
    user_id: telegramPositiveInteger(userId, 'Telegram Premium gift receiver user ID'),
    month_count: monthCount,
    star_count: starCounts[monthCount],
    ...telegramGiftTextOptions(options, 'Telegram Premium gift'),
  };
}

function telegramAcceptedGiftTypes(value: TelegramAcceptedGiftTypes) {
  const record = telegramRichRecord(value, 'Telegram accepted gift types');
  const unknown = Object.keys(record).find((key) => !(TELEGRAM_ACCEPTED_GIFT_TYPE_FIELDS as readonly string[]).includes(key));
  if (unknown) throw new Error(`Unsupported Telegram accepted gift type: ${unknown}.`);
  for (const key of TELEGRAM_ACCEPTED_GIFT_TYPE_FIELDS) {
    if (typeof record[key] !== 'boolean') throw new Error(`Telegram accepted gift type ${key} must be boolean.`);
  }
  return Object.fromEntries(TELEGRAM_ACCEPTED_GIFT_TYPE_FIELDS.map((key) => [key, record[key]])) as TelegramAcceptedGiftTypes;
}

export function buildTelegramBusinessGiftSettings(
  businessConnectionId: string,
  showGiftButton: boolean,
  acceptedGiftTypes: TelegramAcceptedGiftTypes,
): TelegramMethodParams['setBusinessAccountGiftSettings'] {
  if (typeof showGiftButton !== 'boolean') throw new Error('Telegram Business showGiftButton must be boolean.');
  return {
    business_connection_id: telegramGiftBusinessConnectionId(businessConnectionId),
    show_gift_button: showGiftButton,
    accepted_gift_types: telegramAcceptedGiftTypes(acceptedGiftTypes),
  };
}

export function buildTelegramBusinessStarBalance(
  businessConnectionId: string,
): TelegramMethodParams['getBusinessAccountStarBalance'] {
  return { business_connection_id: telegramGiftBusinessConnectionId(businessConnectionId) };
}

export function buildTelegramBusinessStarsTransfer(
  businessConnectionId: string,
  starCount: number,
): TelegramMethodParams['transferBusinessAccountStars'] {
  if (!Number.isSafeInteger(starCount) || starCount < 1 || starCount > 10_000) {
    throw new Error('Telegram Business Stars transfer must be an integer from 1 to 10000.');
  }
  return { business_connection_id: telegramGiftBusinessConnectionId(businessConnectionId), star_count: starCount };
}

function telegramOwnedGiftListOptions(value: TelegramOwnedGiftListOptions, allowSavedFilters: boolean) {
  const record = telegramRichRecord(value, 'Telegram owned gift list options');
  const booleanFields = [
    ...(allowSavedFilters ? ['excludeUnsaved', 'excludeSaved'] : []),
    'excludeUnlimited', 'excludeLimitedUpgradable', 'excludeLimitedNonUpgradable', 'excludeUnique',
    'excludeFromBlockchain', 'sortByPrice',
  ];
  const allowed = new Set([...booleanFields, 'offset', 'limit']);
  const unknown = Object.keys(record).find((key) => !allowed.has(key));
  if (unknown) throw new Error(`Unsupported Telegram owned gift list option: ${unknown}.`);
  for (const key of booleanFields) {
    if (record[key] !== undefined && typeof record[key] !== 'boolean') {
      throw new Error(`Telegram owned gift list ${key} must be boolean.`);
    }
  }
  if (record.excludeUnsaved === true && record.excludeSaved === true) {
    throw new Error('Telegram owned gift list cannot exclude both saved and unsaved gifts.');
  }
  if (record.excludeUnlimited === true && record.excludeLimitedUpgradable === true
    && record.excludeLimitedNonUpgradable === true && record.excludeUnique === true) {
    throw new Error('Telegram owned gift list cannot exclude every gift category.');
  }
  if (value.limit !== undefined && (!Number.isSafeInteger(value.limit) || value.limit < 1 || value.limit > 100)) {
    throw new Error('Telegram owned gift list limit must be an integer from 1 to 100.');
  }
  const offset = value.offset === undefined ? undefined : String(value.offset);
  return {
    ...(record.excludeUnsaved === undefined ? {} : { exclude_unsaved: record.excludeUnsaved as boolean }),
    ...(record.excludeSaved === undefined ? {} : { exclude_saved: record.excludeSaved as boolean }),
    ...(record.excludeUnlimited === undefined ? {} : { exclude_unlimited: record.excludeUnlimited as boolean }),
    ...(record.excludeLimitedUpgradable === undefined ? {} : { exclude_limited_upgradable: record.excludeLimitedUpgradable as boolean }),
    ...(record.excludeLimitedNonUpgradable === undefined ? {} : { exclude_limited_non_upgradable: record.excludeLimitedNonUpgradable as boolean }),
    ...(record.excludeUnique === undefined ? {} : { exclude_unique: record.excludeUnique as boolean }),
    ...(record.excludeFromBlockchain === undefined ? {} : { exclude_from_blockchain: record.excludeFromBlockchain as boolean }),
    ...(record.sortByPrice === undefined ? {} : { sort_by_price: record.sortByPrice as boolean }),
    ...(offset === undefined ? {} : { offset }),
    ...(value.limit === undefined ? {} : { limit: value.limit }),
  };
}

export function buildTelegramBusinessGiftsQuery(
  businessConnectionId: string,
  options: TelegramOwnedGiftListOptions = {},
): TelegramMethodParams['getBusinessAccountGifts'] {
  return {
    business_connection_id: telegramGiftBusinessConnectionId(businessConnectionId),
    ...telegramOwnedGiftListOptions(options, true),
  };
}

export function buildTelegramUserGiftsQuery(
  userId: string | number,
  options: TelegramOwnedGiftListOptions = {},
): TelegramMethodParams['getUserGifts'] {
  return {
    user_id: telegramPositiveInteger(userId, 'Telegram owned gifts user ID'),
    ...telegramOwnedGiftListOptions(options, false),
  };
}

export function buildTelegramChatGiftsQuery(
  chatId: TelegramChatId,
  options: TelegramOwnedGiftListOptions = {},
): TelegramMethodParams['getChatGifts'] {
  return {
    chat_id: telegramGiftChatId(chatId, 'Telegram owned gifts chat ID'),
    ...telegramOwnedGiftListOptions(options, true),
  };
}

export function buildTelegramGiftConversion(
  businessConnectionId: string,
  ownedGiftId: string,
): TelegramMethodParams['convertGiftToStars'] {
  return {
    business_connection_id: telegramGiftBusinessConnectionId(businessConnectionId),
    owned_gift_id: telegramGiftId(ownedGiftId, 'Telegram owned gift ID'),
  };
}

function telegramOptionalStarCount(value: unknown, label: string) {
  if (value === undefined) return undefined;
  if (!Number.isSafeInteger(value) || Number(value) < 0) throw new Error(`${label} must be a non-negative safe integer.`);
  return Number(value);
}

export function buildTelegramGiftUpgrade(
  businessConnectionId: string,
  ownedGiftId: string,
  options: TelegramUpgradeGiftOptions = {},
): TelegramMethodParams['upgradeGift'] {
  const record = telegramRichRecord(options, 'Telegram gift upgrade options');
  const unknown = Object.keys(record).find((key) => !['keepOriginalDetails', 'starCount'].includes(key));
  if (unknown) throw new Error(`Unsupported Telegram gift upgrade option: ${unknown}.`);
  if (options.keepOriginalDetails !== undefined && typeof options.keepOriginalDetails !== 'boolean') {
    throw new Error('Telegram gift upgrade keepOriginalDetails must be boolean.');
  }
  const starCount = telegramOptionalStarCount(options.starCount, 'Telegram gift upgrade starCount');
  return {
    business_connection_id: telegramGiftBusinessConnectionId(businessConnectionId),
    owned_gift_id: telegramGiftId(ownedGiftId, 'Telegram owned gift ID'),
    ...(options.keepOriginalDetails === undefined ? {} : { keep_original_details: options.keepOriginalDetails }),
    ...(starCount === undefined ? {} : { star_count: starCount }),
  };
}

export function buildTelegramGiftTransfer(
  businessConnectionId: string,
  ownedGiftId: string,
  newOwnerChatId: string | number,
  starCount?: number,
): TelegramMethodParams['transferGift'] {
  const transferStars = telegramOptionalStarCount(starCount, 'Telegram gift transfer starCount');
  return {
    business_connection_id: telegramGiftBusinessConnectionId(businessConnectionId),
    owned_gift_id: telegramGiftId(ownedGiftId, 'Telegram owned gift ID'),
    new_owner_chat_id: telegramPositiveInteger(newOwnerChatId, 'Telegram gift new owner chat ID'),
    ...(transferStars === undefined ? {} : { star_count: transferStars }),
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
  sendSticker: TelegramSendOptions & { chat_id: TelegramChatId; sticker: TelegramInputFile; emoji?: string };
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
  sendRichMessage: {
    chat_id: TelegramChatId; rich_message: ReturnType<typeof buildTelegramRichMessage>;
    business_connection_id?: string; message_thread_id?: number; direct_messages_topic_id?: number;
    ephemeral_message_parameters?: TelegramEphemeralMessageParameters; disable_notification?: boolean; protect_content?: boolean;
    allow_paid_broadcast?: boolean; message_effect_id?: string; suggested_post_parameters?: Record<string, unknown>;
    reply_parameters?: Record<string, unknown>; reply_markup?: Record<string, unknown>;
  };
  sendRichMessageDraft: { chat_id: number; message_thread_id?: number; draft_id: number; rich_message: ReturnType<typeof buildTelegramRichMessage>; can_stop?: boolean; keep_on_stop?: boolean };
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
  getAvailableGifts: Record<string, never>;
  sendGift: ({ user_id: number; chat_id?: never } | { chat_id: TelegramChatId; user_id?: never }) & {
    gift_id: string; pay_for_upgrade?: boolean; text?: string; text_parse_mode?: TelegramParseMode;
    text_entities?: TelegramMessageEntity[];
  };
  giftPremiumSubscription: {
    user_id: number; month_count: 3 | 6 | 12; star_count: 1000 | 1500 | 2500;
    text?: string; text_parse_mode?: TelegramParseMode; text_entities?: TelegramMessageEntity[];
  };
  setBusinessAccountGiftSettings: {
    business_connection_id: string; show_gift_button: boolean; accepted_gift_types: TelegramAcceptedGiftTypes;
  };
  getBusinessAccountStarBalance: { business_connection_id: string };
  transferBusinessAccountStars: { business_connection_id: string; star_count: number };
  getBusinessAccountGifts: {
    business_connection_id: string; exclude_unsaved?: boolean; exclude_saved?: boolean; exclude_unlimited?: boolean;
    exclude_limited_upgradable?: boolean; exclude_limited_non_upgradable?: boolean; exclude_unique?: boolean;
    exclude_from_blockchain?: boolean; sort_by_price?: boolean; offset?: string; limit?: number;
  };
  getUserGifts: {
    user_id: number; exclude_unlimited?: boolean; exclude_limited_upgradable?: boolean;
    exclude_limited_non_upgradable?: boolean; exclude_unique?: boolean; exclude_from_blockchain?: boolean;
    sort_by_price?: boolean; offset?: string; limit?: number;
  };
  getChatGifts: {
    chat_id: TelegramChatId; exclude_unsaved?: boolean; exclude_saved?: boolean; exclude_unlimited?: boolean;
    exclude_limited_upgradable?: boolean; exclude_limited_non_upgradable?: boolean; exclude_unique?: boolean;
    exclude_from_blockchain?: boolean; sort_by_price?: boolean; offset?: string; limit?: number;
  };
  convertGiftToStars: { business_connection_id: string; owned_gift_id: string };
  upgradeGift: { business_connection_id: string; owned_gift_id: string; keep_original_details?: boolean; star_count?: number };
  transferGift: { business_connection_id: string; owned_gift_id: string; new_owner_chat_id: number; star_count?: number };
  sendChatAction: { chat_id: TelegramChatId; action: TelegramChatAction; message_thread_id?: number; business_connection_id?: string };
  setMessageReaction: { chat_id: TelegramChatId; message_id: number; reaction?: TelegramReaction[]; is_big?: boolean };
  getUserProfilePhotos: { user_id: number; offset?: number; limit?: number };
  getUserProfileAudios: { user_id: number; offset?: number; limit?: number };
  getUserChatBoosts: { chat_id: TelegramChatId; user_id: number };
  getBusinessConnection: { business_connection_id: string };
  forwardMessage: { chat_id: TelegramChatId; from_chat_id: TelegramChatId; message_id: number; disable_notification?: boolean; protect_content?: boolean };
  copyMessage: { chat_id: TelegramChatId; from_chat_id: TelegramChatId; message_id: number; caption?: string; parse_mode?: TelegramParseMode };
  editMessageText: { chat_id?: TelegramChatId; message_id?: number; inline_message_id?: string; text?: string; parse_mode?: TelegramParseMode; rich_message?: ReturnType<typeof buildTelegramRichMessage>; reply_markup?: TelegramInlineKeyboardMarkup };
  editEphemeralMessageText: {
    chat_id: TelegramChatId; receiver_user_id: number; ephemeral_message_id: number; text?: string;
    parse_mode?: TelegramParseMode; entities?: TelegramMessageEntity[];
    rich_message?: ReturnType<typeof buildTelegramRichMessage>; link_preview_options?: Record<string, unknown>;
    reply_markup?: TelegramInlineKeyboardMarkup;
  };
  editEphemeralMessageMedia: {
    chat_id: TelegramChatId; receiver_user_id: number; ephemeral_message_id: number;
    media: TelegramInputMedia; reply_markup?: TelegramInlineKeyboardMarkup;
  };
  editEphemeralMessageCaption: {
    chat_id: TelegramChatId; receiver_user_id: number; ephemeral_message_id: number; caption?: string;
    parse_mode?: TelegramParseMode; caption_entities?: TelegramMessageEntity[]; show_caption_above_media?: boolean;
    reply_markup?: TelegramInlineKeyboardMarkup;
  };
  editEphemeralMessageReplyMarkup: {
    chat_id: TelegramChatId; receiver_user_id: number; ephemeral_message_id: number;
    reply_markup?: TelegramInlineKeyboardMarkup;
  };
  deleteEphemeralMessage: { chat_id: TelegramChatId; receiver_user_id: number; ephemeral_message_id: number };
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

export type TelegramKnownMethodResults = {
  getUpdates: TelegramUpdate[];
  getWebhookInfo: TelegramWebhookInfo;
  getMe: TelegramUser;
  sendMessage: TelegramMessage; forwardMessage: TelegramMessage; sendPhoto: TelegramMessage; sendLivePhoto: TelegramMessage;
  sendAudio: TelegramMessage; sendDocument: TelegramMessage; sendVideo: TelegramMessage; sendAnimation: TelegramMessage;
  sendVoice: TelegramMessage; sendVideoNote: TelegramMessage; sendPaidMedia: TelegramMessage; sendLocation: TelegramMessage;
  sendVenue: TelegramMessage; sendContact: TelegramMessage; sendPoll: TelegramMessage; sendChecklist: TelegramMessage;
  sendDice: TelegramMessage; sendSticker: TelegramMessage; sendRichMessage: TelegramMessage; sendInvoice: TelegramMessage; sendGame: TelegramMessage;
  forwardMessages: TelegramMessageId[]; copyMessage: TelegramMessageId; copyMessages: TelegramMessageId[]; sendMediaGroup: TelegramMessage[];
  getUserProfilePhotos: TelegramUserProfilePhotos; getUserProfileAudios: TelegramUserProfileAudios; getFile: TelegramFile;
  createChatInviteLink: TelegramChatInviteLink; editChatInviteLink: TelegramChatInviteLink;
  createChatSubscriptionInviteLink: TelegramChatInviteLink; editChatSubscriptionInviteLink: TelegramChatInviteLink; revokeChatInviteLink: TelegramChatInviteLink;
  getChat: TelegramChatFullInfo; getChatAdministrators: TelegramChatMember[]; getChatMemberCount: number; getChatMember: TelegramChatMember;
  getUserPersonalChatMessages: TelegramMessage[]; createForumTopic: TelegramForumTopic; getUserChatBoosts: TelegramUserChatBoosts;
  getBusinessConnection: TelegramBusinessConnection; getMyCommands: TelegramBotCommand[]; getMyName: TelegramBotName;
  getMyDescription: TelegramBotDescription; getMyShortDescription: TelegramBotShortDescription;
  getMyDefaultAdministratorRights: TelegramAdministratorRights; getAvailableGifts: TelegramGifts;
  getBusinessAccountStarBalance: TelegramStarAmount; getBusinessAccountGifts: TelegramOwnedGifts; getUserGifts: TelegramOwnedGifts; getChatGifts: TelegramOwnedGifts;
  answerWebAppQuery: TelegramSentWebAppMessage;
  editMessageText: TelegramMessage | boolean; editMessageCaption: TelegramMessage | boolean; editMessageMedia: TelegramMessage | boolean;
  editMessageLiveLocation: TelegramMessage | boolean; stopMessageLiveLocation: TelegramMessage | boolean; editMessageReplyMarkup: TelegramMessage | boolean;
  editMessageChecklist: TelegramMessage; setGameScore: TelegramMessage | boolean;
  getMyStarBalance: TelegramStarAmount;
};

export type TelegramResultFor<M extends TelegramMethod> = M extends keyof TelegramKnownMethodResults
  ? TelegramKnownMethodResults[M]
  : M extends keyof TelegramGeneratedMethodResults
    ? TelegramGeneratedMethodResults[M]
    : never;

export type TelegramParamsFor<M extends TelegramMethod> = M extends keyof TelegramGeneratedMethodParams
  ? M extends keyof TelegramMethodParams
    ? TelegramMethodParams[M] & Omit<TelegramGeneratedMethodParams[M], keyof TelegramMethodParams[M]>
    : TelegramGeneratedMethodParams[M]
  : never;

export interface TelegramApi {
  call<M extends TelegramMethod, T = TelegramResultFor<M>>(method: M, params: TelegramParamsFor<M>): Promise<T>;
  getMe(): Promise<TelegramUser>;
  getChat(chatId?: TelegramChatId): Promise<TelegramChatFullInfo>;
  getChatAdministrators(returnBots?: boolean, chatId?: TelegramChatId): Promise<TelegramChatMember[]>;
  getChatMemberCount(chatId?: TelegramChatId): Promise<number>;
  getChatMember(userId?: string | number, chatId?: TelegramChatId): Promise<TelegramChatMember>;
  getUserProfilePhotos(options?: TelegramProfileListOptions, userId?: string | number): Promise<TelegramUserProfilePhotos>;
  getUserProfileAudios(options?: TelegramProfileListOptions, userId?: string | number): Promise<TelegramUserProfileAudios>;
  getUserChatBoosts(userId?: string | number, chatId?: TelegramChatId): Promise<TelegramUserChatBoosts>;
  getBusinessConnection(businessConnectionId?: string): Promise<TelegramBusinessConnection>;
  sendPhoto(photo: TelegramInputFile, caption?: string): Promise<unknown>;
  sendSticker(sticker: TelegramInputFile, emoji?: string): Promise<unknown>;
  sendDocument(document: TelegramInputFile, caption?: string): Promise<unknown>;
  sendAudio(audio: TelegramInputFile, caption?: string): Promise<unknown>;
  sendVideo(video: TelegramInputFile, caption?: string): Promise<unknown>;
  sendAnimation(animation: TelegramInputFile, caption?: string): Promise<unknown>;
  sendVoice(voice: TelegramInputFile, caption?: string): Promise<unknown>;
  sendVideoNote(videoNote: TelegramInputFile): Promise<unknown>;
  sendLocation(latitude: number, longitude: number): Promise<unknown>;
  sendVenue(latitude: number, longitude: number, title: string, address: string): Promise<unknown>;
  sendContact(phoneNumber: string, firstName: string, lastName?: string): Promise<unknown>;
  sendPoll(question: string, options: string[], anonymous?: boolean): Promise<unknown>;
  sendDice(emoji?: string): Promise<unknown>;
  sendMessageDraft(draftId: number, text?: string, options?: TelegramMessageDraftOptions): Promise<boolean>;
  sendRichMessage(richMessage: TelegramInputRichMessage, options?: TelegramSendRichMessageOptions): Promise<TelegramMessage>;
  sendRichMessageDraft(draftId: number, richMessage: TelegramInputRichMessage, options?: TelegramRichMessageDraftOptions): Promise<boolean>;
  editRichMessage(richMessage: TelegramInputRichMessage, messageId?: string | number): Promise<TelegramMessage | boolean>;
  editEphemeralMessageText(text: string, target?: TelegramEphemeralMessageTarget, options?: TelegramEditEphemeralTextOptions): Promise<boolean>;
  editEphemeralRichMessage(richMessage: TelegramInputRichMessage, target?: TelegramEphemeralMessageTarget, options?: TelegramEditEphemeralRichMessageOptions): Promise<boolean>;
  editEphemeralMessageMedia(media: TelegramInputMedia, target?: TelegramEphemeralMessageTarget, replyMarkup?: TelegramInlineKeyboardMarkup): Promise<boolean>;
  editEphemeralMessageCaption(caption?: string, target?: TelegramEphemeralMessageTarget, options?: TelegramEditEphemeralCaptionOptions): Promise<boolean>;
  editEphemeralMessageReplyMarkup(target?: TelegramEphemeralMessageTarget, replyMarkup?: TelegramInlineKeyboardMarkup): Promise<boolean>;
  deleteEphemeralMessage(target?: TelegramEphemeralMessageTarget): Promise<boolean>;
  sendChecklist(checklist: TelegramInputChecklist, options?: TelegramSendChecklistOptions): Promise<TelegramMessage>;
  editChecklist(checklist: TelegramInputChecklist, options?: TelegramEditChecklistOptions): Promise<TelegramMessage>;
  sendInvoice(invoice: TelegramInvoiceOptions): Promise<unknown>;
  getAvailableGifts(): Promise<TelegramGifts>;
  sendGift(giftId: string, options?: TelegramSendGiftOptions): Promise<boolean>;
  giftPremiumSubscription(monthCount: 3 | 6 | 12, options?: TelegramPremiumGiftOptions): Promise<boolean>;
  setBusinessAccountGiftSettings(showGiftButton: boolean, acceptedGiftTypes: TelegramAcceptedGiftTypes, businessConnectionId?: string): Promise<boolean>;
  getBusinessAccountStarBalance(businessConnectionId?: string): Promise<TelegramStarAmount>;
  transferBusinessAccountStars(starCount: number, businessConnectionId?: string): Promise<boolean>;
  getBusinessAccountGifts(options?: TelegramOwnedGiftListOptions, businessConnectionId?: string): Promise<TelegramOwnedGifts>;
  getUserGifts(options?: TelegramOwnedGiftListOptions, userId?: string | number): Promise<TelegramOwnedGifts>;
  getChatGifts(options?: TelegramOwnedGiftListOptions, chatId?: TelegramChatId): Promise<TelegramOwnedGifts>;
  convertGiftToStars(ownedGiftId: string, businessConnectionId?: string): Promise<boolean>;
  upgradeGift(ownedGiftId: string, options?: TelegramUpgradeGiftOptions, businessConnectionId?: string): Promise<boolean>;
  transferGift(ownedGiftId: string, newOwnerChatId: string | number, starCount?: number, businessConnectionId?: string): Promise<boolean>;
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
