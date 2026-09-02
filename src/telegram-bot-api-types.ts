/** Generated from the official Telegram Bot API 10.3 object tables on 2026-08-29. */
export type TelegramBotApiInputFile = string | Blob;

export type TelegramBotApiUpdate = {
  update_id: number;
  message?: TelegramBotApiMessage;
  edited_message?: TelegramBotApiMessage;
  channel_post?: TelegramBotApiMessage;
  edited_channel_post?: TelegramBotApiMessage;
  business_connection?: TelegramBotApiBusinessConnection;
  business_message?: TelegramBotApiMessage;
  edited_business_message?: TelegramBotApiMessage;
  deleted_business_messages?: TelegramBotApiBusinessMessagesDeleted;
  guest_message?: TelegramBotApiMessage;
  message_reaction?: TelegramBotApiMessageReactionUpdated;
  message_reaction_count?: TelegramBotApiMessageReactionCountUpdated;
  inline_query?: TelegramBotApiInlineQuery;
  chosen_inline_result?: TelegramBotApiChosenInlineResult;
  callback_query?: TelegramBotApiCallbackQuery;
  shipping_query?: TelegramBotApiShippingQuery;
  pre_checkout_query?: TelegramBotApiPreCheckoutQuery;
  purchased_paid_media?: TelegramBotApiPaidMediaPurchased;
  poll?: TelegramBotApiPoll;
  poll_answer?: TelegramBotApiPollAnswer;
  my_chat_member?: TelegramBotApiChatMemberUpdated;
  chat_member?: TelegramBotApiChatMemberUpdated;
  chat_join_request?: TelegramBotApiChatJoinRequest;
  chat_boost?: TelegramBotApiChatBoostUpdated;
  removed_chat_boost?: TelegramBotApiChatBoostRemoved;
  managed_bot?: TelegramBotApiManagedBotUpdated;
  subscription?: TelegramBotApiBotSubscriptionUpdated;
  stopped_message_generation?: TelegramBotApiMessageGenerationStopped;
};

export type TelegramBotApiWebhookInfo = {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
  ip_address?: string;
  last_error_date?: number;
  last_error_message?: string;
  last_synchronization_error_date?: number;
  max_connections?: number;
  allowed_updates?: Array<string>;
};

export type TelegramBotApiUser = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: true;
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

export type TelegramBotApiChat = {
  id: number;
  type: string;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_forum?: true;
  is_direct_messages?: true;
};

export type TelegramBotApiChatFullInfo = {
  id: number;
  type: string;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_forum?: true;
  is_direct_messages?: true;
  accent_color_id: number;
  max_reaction_count: number;
  photo?: TelegramBotApiChatPhoto;
  active_usernames?: Array<string>;
  birthdate?: TelegramBotApiBirthdate;
  business_intro?: TelegramBotApiBusinessIntro;
  business_location?: TelegramBotApiBusinessLocation;
  business_opening_hours?: TelegramBotApiBusinessOpeningHours;
  personal_chat?: TelegramBotApiChat;
  parent_chat?: TelegramBotApiChat;
  available_reactions?: Array<TelegramBotApiReactionType>;
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
  pinned_message?: TelegramBotApiMessage;
  permissions?: TelegramBotApiChatPermissions;
  accepted_gift_types: TelegramBotApiAcceptedGiftTypes;
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
  location?: TelegramBotApiChatLocation;
  rating?: TelegramBotApiUserRating;
  first_profile_audio?: TelegramBotApiAudio;
  unique_gift_colors?: TelegramBotApiUniqueGiftColors;
  paid_message_star_count?: number;
  guard_bot?: TelegramBotApiUser;
  community?: TelegramBotApiCommunity;
};

export type TelegramBotApiMessage = {
  message_id: number;
  message_thread_id?: number;
  direct_messages_topic?: TelegramBotApiDirectMessagesTopic;
  from?: TelegramBotApiUser;
  sender_chat?: TelegramBotApiChat;
  sender_boost_count?: number;
  sender_business_bot?: TelegramBotApiUser;
  sender_tag?: string;
  receiver_user?: TelegramBotApiUser;
  ephemeral_message_id?: number;
  date: number;
  guest_query_id?: string;
  business_connection_id?: string;
  chat: TelegramBotApiChat;
  forward_origin?: TelegramBotApiMessageOrigin;
  is_topic_message?: true;
  is_automatic_forward?: true;
  reply_to_message?: TelegramBotApiMessage;
  external_reply?: TelegramBotApiExternalReplyInfo;
  quote?: TelegramBotApiTextQuote;
  reply_to_story?: TelegramBotApiStory;
  reply_to_checklist_task_id?: number;
  reply_to_poll_option_id?: string;
  via_bot?: TelegramBotApiUser;
  guest_bot_caller_user?: TelegramBotApiUser;
  guest_bot_caller_chat?: TelegramBotApiChat;
  edit_date?: number;
  has_protected_content?: true;
  is_from_offline?: true;
  is_paid_post?: true;
  media_group_id?: string;
  author_signature?: string;
  paid_star_count?: number;
  text?: string;
  entities?: Array<TelegramBotApiMessageEntity>;
  link_preview_options?: TelegramBotApiLinkPreviewOptions;
  suggested_post_info?: TelegramBotApiSuggestedPostInfo;
  effect_id?: string;
  rich_message?: TelegramBotApiRichMessage;
  animation?: TelegramBotApiAnimation;
  audio?: TelegramBotApiAudio;
  document?: TelegramBotApiDocument;
  live_photo?: TelegramBotApiLivePhoto;
  paid_media?: TelegramBotApiPaidMediaInfo;
  photo?: Array<TelegramBotApiPhotoSize>;
  sticker?: TelegramBotApiSticker;
  story?: TelegramBotApiStory;
  video?: TelegramBotApiVideo;
  video_note?: TelegramBotApiVideoNote;
  voice?: TelegramBotApiVoice;
  caption?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: true;
  has_media_spoiler?: true;
  checklist?: TelegramBotApiChecklist;
  contact?: TelegramBotApiContact;
  dice?: TelegramBotApiDice;
  game?: TelegramBotApiGame;
  poll?: TelegramBotApiPoll;
  venue?: TelegramBotApiVenue;
  location?: TelegramBotApiLocation;
  new_chat_members?: Array<TelegramBotApiUser>;
  left_chat_member?: TelegramBotApiUser;
  chat_owner_left?: TelegramBotApiChatOwnerLeft;
  chat_owner_changed?: TelegramBotApiChatOwnerChanged;
  new_chat_title?: string;
  new_chat_photo?: Array<TelegramBotApiPhotoSize>;
  delete_chat_photo?: true;
  group_chat_created?: true;
  supergroup_chat_created?: true;
  channel_chat_created?: true;
  message_auto_delete_timer_changed?: TelegramBotApiMessageAutoDeleteTimerChanged;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: TelegramBotApiMaybeInaccessibleMessage;
  invoice?: TelegramBotApiInvoice;
  successful_payment?: TelegramBotApiSuccessfulPayment;
  refunded_payment?: TelegramBotApiRefundedPayment;
  users_shared?: TelegramBotApiUsersShared;
  chat_shared?: TelegramBotApiChatShared;
  gift?: TelegramBotApiGiftInfo;
  unique_gift?: TelegramBotApiUniqueGiftInfo;
  gift_upgrade_sent?: TelegramBotApiGiftInfo;
  connected_website?: string;
  write_access_allowed?: TelegramBotApiWriteAccessAllowed;
  passport_data?: TelegramBotApiPassportData;
  proximity_alert_triggered?: TelegramBotApiProximityAlertTriggered;
  boost_added?: TelegramBotApiChatBoostAdded;
  chat_background_set?: TelegramBotApiChatBackground;
  checklist_tasks_done?: TelegramBotApiChecklistTasksDone;
  checklist_tasks_added?: TelegramBotApiChecklistTasksAdded;
  community_chat_added?: TelegramBotApiCommunityChatAdded;
  community_chat_joined?: TelegramBotApiCommunityChatJoined;
  community_chat_removed?: TelegramBotApiCommunityChatRemoved;
  direct_message_price_changed?: TelegramBotApiDirectMessagePriceChanged;
  forum_topic_created?: TelegramBotApiForumTopicCreated;
  forum_topic_edited?: TelegramBotApiForumTopicEdited;
  forum_topic_closed?: TelegramBotApiForumTopicClosed;
  forum_topic_reopened?: TelegramBotApiForumTopicReopened;
  general_forum_topic_hidden?: TelegramBotApiGeneralForumTopicHidden;
  general_forum_topic_unhidden?: TelegramBotApiGeneralForumTopicUnhidden;
  giveaway_created?: TelegramBotApiGiveawayCreated;
  giveaway?: TelegramBotApiGiveaway;
  giveaway_winners?: TelegramBotApiGiveawayWinners;
  giveaway_completed?: TelegramBotApiGiveawayCompleted;
  managed_bot_created?: TelegramBotApiManagedBotCreated;
  paid_message_price_changed?: TelegramBotApiPaidMessagePriceChanged;
  poll_option_added?: TelegramBotApiPollOptionAdded;
  poll_option_deleted?: TelegramBotApiPollOptionDeleted;
  suggested_post_approved?: TelegramBotApiSuggestedPostApproved;
  suggested_post_approval_failed?: TelegramBotApiSuggestedPostApprovalFailed;
  suggested_post_declined?: TelegramBotApiSuggestedPostDeclined;
  suggested_post_paid?: TelegramBotApiSuggestedPostPaid;
  suggested_post_refunded?: TelegramBotApiSuggestedPostRefunded;
  video_chat_scheduled?: TelegramBotApiVideoChatScheduled;
  video_chat_started?: TelegramBotApiVideoChatStarted;
  video_chat_ended?: TelegramBotApiVideoChatEnded;
  video_chat_participants_invited?: TelegramBotApiVideoChatParticipantsInvited;
  web_app_data?: TelegramBotApiWebAppData;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
};

export type TelegramBotApiMessageId = {
  message_id: number;
};

export type TelegramBotApiInaccessibleMessage = {
  chat: TelegramBotApiChat;
  message_id: number;
  date: number;
};

export type TelegramBotApiMessageEntity = {
  type: string;
  offset: number;
  length: number;
  url?: string;
  user?: TelegramBotApiUser;
  language?: string;
  custom_emoji_id?: string;
  unix_time?: number;
  date_time_format?: string;
};

export type TelegramBotApiTextQuote = {
  text: string;
  entities?: Array<TelegramBotApiMessageEntity>;
  position: number;
  is_manual?: true;
};

export type TelegramBotApiExternalReplyInfo = {
  origin: TelegramBotApiMessageOrigin;
  chat?: TelegramBotApiChat;
  message_id?: number;
  link_preview_options?: TelegramBotApiLinkPreviewOptions;
  animation?: TelegramBotApiAnimation;
  audio?: TelegramBotApiAudio;
  document?: TelegramBotApiDocument;
  live_photo?: TelegramBotApiLivePhoto;
  paid_media?: TelegramBotApiPaidMediaInfo;
  photo?: Array<TelegramBotApiPhotoSize>;
  sticker?: TelegramBotApiSticker;
  story?: TelegramBotApiStory;
  video?: TelegramBotApiVideo;
  video_note?: TelegramBotApiVideoNote;
  voice?: TelegramBotApiVoice;
  has_media_spoiler?: true;
  checklist?: TelegramBotApiChecklist;
  contact?: TelegramBotApiContact;
  dice?: TelegramBotApiDice;
  game?: TelegramBotApiGame;
  giveaway?: TelegramBotApiGiveaway;
  giveaway_winners?: TelegramBotApiGiveawayWinners;
  invoice?: TelegramBotApiInvoice;
  location?: TelegramBotApiLocation;
  poll?: TelegramBotApiPoll;
  venue?: TelegramBotApiVenue;
};

export type TelegramBotApiReplyParameters = {
  message_id?: number;
  chat_id?: number | string;
  ephemeral_message_id?: number;
  allow_sending_without_reply?: boolean;
  quote?: string;
  quote_parse_mode?: string;
  quote_entities?: Array<TelegramBotApiMessageEntity>;
  quote_position?: number;
  checklist_task_id?: number;
  poll_option_id?: string;
};

export type TelegramBotApiEphemeralMessageParameters = {
  receiver_user_id: number;
  callback_query_id?: string;
  replace_callback_query_message?: boolean;
};

export type TelegramBotApiMessageOriginUser = {
  type: string;
  date: number;
  sender_user: TelegramBotApiUser;
};

export type TelegramBotApiMessageOriginHiddenUser = {
  type: string;
  date: number;
  sender_user_name: string;
};

export type TelegramBotApiMessageOriginChat = {
  type: string;
  date: number;
  sender_chat: TelegramBotApiChat;
  author_signature?: string;
};

export type TelegramBotApiMessageOriginChannel = {
  type: string;
  date: number;
  chat: TelegramBotApiChat;
  message_id: number;
  author_signature?: string;
};

export type TelegramBotApiPhotoSize = {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
};

export type TelegramBotApiAnimation = {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumbnail?: TelegramBotApiPhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
};

export type TelegramBotApiAudio = {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
  thumbnail?: TelegramBotApiPhotoSize;
};

export type TelegramBotApiDocument = {
  file_id: string;
  file_unique_id: string;
  thumbnail?: TelegramBotApiPhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
};

export type TelegramBotApiLivePhoto = {
  photo?: Array<TelegramBotApiPhotoSize>;
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  mime_type?: string;
  file_size?: number;
};

export type TelegramBotApiStory = {
  chat: TelegramBotApiChat;
  id: number;
};

export type TelegramBotApiVideoQuality = {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  codec: string;
  file_size?: number;
};

export type TelegramBotApiVideo = {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumbnail?: TelegramBotApiPhotoSize;
  cover?: Array<TelegramBotApiPhotoSize>;
  start_timestamp?: number;
  qualities?: Array<TelegramBotApiVideoQuality>;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
};

export type TelegramBotApiVideoNote = {
  file_id: string;
  file_unique_id: string;
  length: number;
  duration: number;
  thumbnail?: TelegramBotApiPhotoSize;
  file_size?: number;
};

export type TelegramBotApiVoice = {
  file_id: string;
  file_unique_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
};

export type TelegramBotApiPaidMediaInfo = {
  star_count: number;
  paid_media: Array<TelegramBotApiPaidMedia>;
};

export type TelegramBotApiPaidMediaLivePhoto = {
  type: string;
  live_photo: TelegramBotApiLivePhoto;
};

export type TelegramBotApiPaidMediaPhoto = {
  type: string;
  photo: Array<TelegramBotApiPhotoSize>;
};

export type TelegramBotApiPaidMediaPreview = {
  type: string;
  width?: number;
  height?: number;
  duration?: number;
};

export type TelegramBotApiPaidMediaVideo = {
  type: string;
  video: TelegramBotApiVideo;
};

export type TelegramBotApiContact = {
  phone_number: string;
  first_name: string;
  last_name?: string;
  user_id?: number;
  vcard?: string;
};

export type TelegramBotApiDice = {
  emoji: string;
  value: number;
};

export type TelegramBotApiLink = {
  url: string;
};

export type TelegramBotApiPollMedia = {
  animation?: TelegramBotApiAnimation;
  audio?: TelegramBotApiAudio;
  document?: TelegramBotApiDocument;
  link?: TelegramBotApiLink;
  live_photo?: TelegramBotApiLivePhoto;
  location?: TelegramBotApiLocation;
  photo?: Array<TelegramBotApiPhotoSize>;
  sticker?: TelegramBotApiSticker;
  venue?: TelegramBotApiVenue;
  video?: TelegramBotApiVideo;
};

export type TelegramBotApiPollOption = {
  persistent_id: string;
  text: string;
  text_entities?: Array<TelegramBotApiMessageEntity>;
  media?: TelegramBotApiPollMedia;
  voter_count: number;
  added_by_user?: TelegramBotApiUser;
  added_by_chat?: TelegramBotApiChat;
  addition_date?: number;
};

export type TelegramBotApiInputPollOption = {
  text: string;
  text_parse_mode?: string;
  text_entities?: Array<TelegramBotApiMessageEntity>;
  media?: TelegramBotApiInputPollOptionMedia;
};

export type TelegramBotApiPollAnswer = {
  poll_id: string;
  voter_chat?: TelegramBotApiChat;
  user?: TelegramBotApiUser;
  option_ids: Array<number>;
  option_persistent_ids: Array<string>;
};

export type TelegramBotApiPoll = {
  id: string;
  question: string;
  question_entities?: Array<TelegramBotApiMessageEntity>;
  options: Array<TelegramBotApiPollOption>;
  total_voter_count: number;
  is_closed: boolean;
  is_anonymous: boolean;
  type: string;
  allows_multiple_answers: boolean;
  allows_revoting: boolean;
  members_only: boolean;
  country_codes?: Array<string>;
  correct_option_ids?: Array<number>;
  explanation?: string;
  explanation_entities?: Array<TelegramBotApiMessageEntity>;
  explanation_media?: TelegramBotApiPollMedia;
  open_period?: number;
  close_date?: number;
  description?: string;
  description_entities?: Array<TelegramBotApiMessageEntity>;
  media?: TelegramBotApiPollMedia;
};

export type TelegramBotApiChecklistTask = {
  id: number;
  text: string;
  text_entities?: Array<TelegramBotApiMessageEntity>;
  completed_by_user?: TelegramBotApiUser;
  completed_by_chat?: TelegramBotApiChat;
  completion_date?: number;
};

export type TelegramBotApiChecklist = {
  title: string;
  title_entities?: Array<TelegramBotApiMessageEntity>;
  tasks: Array<TelegramBotApiChecklistTask>;
  others_can_add_tasks?: true;
  others_can_mark_tasks_as_done?: true;
};

export type TelegramBotApiInputChecklistTask = {
  id: number;
  text: string;
  parse_mode?: string;
  text_entities?: Array<TelegramBotApiMessageEntity>;
};

export type TelegramBotApiInputChecklist = {
  title: string;
  parse_mode?: string;
  title_entities?: Array<TelegramBotApiMessageEntity>;
  tasks: Array<TelegramBotApiInputChecklistTask>;
  others_can_add_tasks?: boolean;
  others_can_mark_tasks_as_done?: boolean;
};

export type TelegramBotApiLocation = {
  latitude: number;
  longitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
};

export type TelegramBotApiVenue = {
  location: TelegramBotApiLocation;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
};

export type TelegramBotApiWebAppData = {
  data: string;
  button_text: string;
};

export type TelegramBotApiProximityAlertTriggered = {
  traveler: TelegramBotApiUser;
  watcher: TelegramBotApiUser;
  distance: number;
};

export type TelegramBotApiMessageAutoDeleteTimerChanged = {
  message_auto_delete_time: number;
};

export type TelegramBotApiManagedBotCreated = {
  bot: TelegramBotApiUser;
};

export type TelegramBotApiManagedBotUpdated = {
  user: TelegramBotApiUser;
  bot: TelegramBotApiUser;
};

export type TelegramBotApiBotSubscriptionUpdated = {
  user: TelegramBotApiUser;
  invoice_payload: string;
  state: string;
};

export type TelegramBotApiMessageGenerationStopped = {
  chat: TelegramBotApiChat;
  message_thread_id?: number;
  draft_id: number;
};

export type TelegramBotApiPollOptionAdded = {
  poll_message?: TelegramBotApiMaybeInaccessibleMessage;
  option_persistent_id: string;
  option_text: string;
  option_text_entities?: Array<TelegramBotApiMessageEntity>;
};

export type TelegramBotApiPollOptionDeleted = {
  poll_message?: TelegramBotApiMaybeInaccessibleMessage;
  option_persistent_id: string;
  option_text: string;
  option_text_entities?: Array<TelegramBotApiMessageEntity>;
};

export type TelegramBotApiChatBoostAdded = {
  boost_count: number;
};

export type TelegramBotApiBackgroundFillSolid = {
  type: string;
  color: number;
};

export type TelegramBotApiBackgroundFillGradient = {
  type: string;
  top_color: number;
  bottom_color: number;
  rotation_angle: number;
};

export type TelegramBotApiBackgroundFillFreeformGradient = {
  type: string;
  colors: Array<number>;
};

export type TelegramBotApiBackgroundTypeFill = {
  type: string;
  fill: TelegramBotApiBackgroundFill;
  dark_theme_dimming: number;
};

export type TelegramBotApiBackgroundTypeWallpaper = {
  type: string;
  document: TelegramBotApiDocument;
  dark_theme_dimming: number;
  is_blurred?: true;
  is_moving?: true;
};

export type TelegramBotApiBackgroundTypePattern = {
  type: string;
  document: TelegramBotApiDocument;
  fill: TelegramBotApiBackgroundFill;
  intensity: number;
  is_inverted?: true;
  is_moving?: true;
};

export type TelegramBotApiBackgroundTypeChatTheme = {
  type: string;
  theme_name: string;
};

export type TelegramBotApiChatBackground = {
  type: TelegramBotApiBackgroundType;
};

export type TelegramBotApiChecklistTasksDone = {
  checklist_message?: TelegramBotApiMessage;
  marked_as_done_task_ids?: Array<number>;
  marked_as_not_done_task_ids?: Array<number>;
};

export type TelegramBotApiChecklistTasksAdded = {
  checklist_message?: TelegramBotApiMessage;
  tasks: Array<TelegramBotApiChecklistTask>;
};

export type TelegramBotApiCommunityChatAdded = {
  community: TelegramBotApiCommunity;
};

export type TelegramBotApiCommunityChatJoined = {
  community: TelegramBotApiCommunity;
};

export type TelegramBotApiForumTopicCreated = {
  name: string;
  icon_color: number;
  icon_custom_emoji_id?: string;
  is_name_implicit?: true;
};

export type TelegramBotApiForumTopicEdited = {
  name?: string;
  icon_custom_emoji_id?: string;
};

export type TelegramBotApiSharedUser = {
  user_id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo?: Array<TelegramBotApiPhotoSize>;
};

export type TelegramBotApiUsersShared = {
  request_id: number;
  users: Array<TelegramBotApiSharedUser>;
};

export type TelegramBotApiChatShared = {
  request_id: number;
  chat_id: number;
  title?: string;
  username?: string;
  photo?: Array<TelegramBotApiPhotoSize>;
};

export type TelegramBotApiWriteAccessAllowed = {
  from_request?: boolean;
  web_app_name?: string;
  from_attachment_menu?: boolean;
};

export type TelegramBotApiVideoChatScheduled = {
  start_date: number;
};

export type TelegramBotApiVideoChatEnded = {
  duration: number;
};

export type TelegramBotApiVideoChatParticipantsInvited = {
  users: Array<TelegramBotApiUser>;
};

export type TelegramBotApiPaidMessagePriceChanged = {
  paid_message_star_count: number;
};

export type TelegramBotApiDirectMessagePriceChanged = {
  are_direct_messages_enabled: boolean;
  direct_message_star_count?: number;
};

export type TelegramBotApiSuggestedPostApproved = {
  suggested_post_message?: TelegramBotApiMessage;
  price?: TelegramBotApiSuggestedPostPrice;
  send_date: number;
};

export type TelegramBotApiSuggestedPostApprovalFailed = {
  suggested_post_message?: TelegramBotApiMessage;
  price: TelegramBotApiSuggestedPostPrice;
};

export type TelegramBotApiSuggestedPostDeclined = {
  suggested_post_message?: TelegramBotApiMessage;
  comment?: string;
};

export type TelegramBotApiSuggestedPostPaid = {
  suggested_post_message?: TelegramBotApiMessage;
  currency: string;
  amount?: number;
  star_amount?: TelegramBotApiStarAmount;
};

export type TelegramBotApiSuggestedPostRefunded = {
  suggested_post_message?: TelegramBotApiMessage;
  reason: string;
};

export type TelegramBotApiGiveawayCreated = {
  prize_star_count?: number;
};

export type TelegramBotApiGiveaway = {
  chats: Array<TelegramBotApiChat>;
  winners_selection_date: number;
  winner_count: number;
  only_new_members?: true;
  has_public_winners?: true;
  prize_description?: string;
  country_codes?: Array<string>;
  prize_star_count?: number;
  premium_subscription_month_count?: number;
};

export type TelegramBotApiGiveawayWinners = {
  chat: TelegramBotApiChat;
  giveaway_message_id: number;
  winners_selection_date: number;
  winner_count: number;
  winners: Array<TelegramBotApiUser>;
  additional_chat_count?: number;
  prize_star_count?: number;
  premium_subscription_month_count?: number;
  unclaimed_prize_count?: number;
  only_new_members?: true;
  was_refunded?: true;
  prize_description?: string;
};

export type TelegramBotApiGiveawayCompleted = {
  winner_count: number;
  unclaimed_prize_count?: number;
  giveaway_message?: TelegramBotApiMessage;
  is_star_giveaway?: true;
};

export type TelegramBotApiLinkPreviewOptions = {
  is_disabled?: boolean;
  url?: string;
  prefer_small_media?: boolean;
  prefer_large_media?: boolean;
  show_above_text?: boolean;
};

export type TelegramBotApiSuggestedPostPrice = {
  currency: string;
  amount: number;
};

export type TelegramBotApiSuggestedPostInfo = {
  state: string;
  price?: TelegramBotApiSuggestedPostPrice;
  send_date?: number;
};

export type TelegramBotApiSuggestedPostParameters = {
  price?: TelegramBotApiSuggestedPostPrice;
  send_date?: number;
};

export type TelegramBotApiDirectMessagesTopic = {
  topic_id: number;
  user?: TelegramBotApiUser;
};

export type TelegramBotApiUserProfilePhotos = {
  total_count: number;
  photos: Array<Array<TelegramBotApiPhotoSize>>;
};

export type TelegramBotApiUserProfileAudios = {
  total_count: number;
  audios: Array<TelegramBotApiAudio>;
};

export type TelegramBotApiFile = {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  file_path?: string;
};

export type TelegramBotApiWebAppInfo = {
  url: string;
};

export type TelegramBotApiReplyKeyboardMarkup = {
  keyboard: Array<Array<TelegramBotApiKeyboardButton>>;
  is_persistent?: boolean;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
  force_reply?: boolean;
};

export type TelegramBotApiKeyboardButton = {
  text: string;
  icon_custom_emoji_id?: string;
  style?: string;
  request_users?: TelegramBotApiKeyboardButtonRequestUsers;
  request_chat?: TelegramBotApiKeyboardButtonRequestChat;
  request_managed_bot?: TelegramBotApiKeyboardButtonRequestManagedBot;
  request_contact?: boolean;
  request_location?: boolean;
  request_poll?: TelegramBotApiKeyboardButtonPollType;
  web_app?: TelegramBotApiWebAppInfo;
};

export type TelegramBotApiKeyboardButtonRequestUsers = {
  request_id: number;
  user_is_bot?: boolean;
  user_is_premium?: boolean;
  max_quantity?: number;
  request_name?: boolean;
  request_username?: boolean;
  request_photo?: boolean;
};

export type TelegramBotApiKeyboardButtonRequestChat = {
  request_id: number;
  chat_is_channel: boolean;
  chat_is_forum?: boolean;
  chat_has_username?: boolean;
  chat_is_created?: boolean;
  user_administrator_rights?: TelegramBotApiChatAdministratorRights;
  bot_administrator_rights?: TelegramBotApiChatAdministratorRights;
  bot_is_member?: boolean;
  request_title?: boolean;
  request_username?: boolean;
  request_photo?: boolean;
};

export type TelegramBotApiKeyboardButtonRequestManagedBot = {
  request_id: number;
  suggested_name?: string;
  suggested_username?: string;
};

export type TelegramBotApiKeyboardButtonPollType = {
  type?: string;
};

export type TelegramBotApiReplyKeyboardRemove = {
  remove_keyboard: true;
  selective?: boolean;
};

export type TelegramBotApiInlineKeyboardMarkup = {
  inline_keyboard: Array<Array<TelegramBotApiInlineKeyboardButton>>;
  force_reply?: boolean;
};

export type TelegramBotApiInlineKeyboardButton = {
  text: string;
  icon_custom_emoji_id?: string;
  style?: string;
  url?: string;
  callback_data?: string;
  web_app?: TelegramBotApiWebAppInfo;
  login_url?: TelegramBotApiLoginUrl;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  switch_inline_query_chosen_chat?: TelegramBotApiSwitchInlineQueryChosenChat;
  copy_text?: TelegramBotApiCopyTextButton;
  callback_game?: TelegramBotApiCallbackGame;
  pay?: boolean;
  disabled?: TelegramBotApiDisabledButton;
};

export type TelegramBotApiLoginUrl = {
  url: string;
  forward_text?: string;
  bot_username?: string;
  request_write_access?: boolean;
};

export type TelegramBotApiSwitchInlineQueryChosenChat = {
  query?: string;
  allow_user_chats?: boolean;
  allow_bot_chats?: boolean;
  allow_group_chats?: boolean;
  allow_channel_chats?: boolean;
};

export type TelegramBotApiCopyTextButton = {
  text: string;
};

export type TelegramBotApiCallbackQuery = {
  id: string;
  from: TelegramBotApiUser;
  message?: TelegramBotApiMaybeInaccessibleMessage;
  inline_message_id?: string;
  chat_instance: string;
  data?: string;
  game_short_name?: string;
};

export type TelegramBotApiForceReply = {
  force_reply: true;
  input_field_placeholder?: string;
  selective?: boolean;
};

export type TelegramBotApiCommunity = {
  id: number;
  name: string;
};

export type TelegramBotApiChatPhoto = {
  small_file_id: string;
  small_file_unique_id: string;
  big_file_id: string;
  big_file_unique_id: string;
};

export type TelegramBotApiChatInviteLink = {
  invite_link: string;
  creator: TelegramBotApiUser;
  creates_join_request: boolean;
  is_primary: boolean;
  is_revoked: boolean;
  name?: string;
  expire_date?: number;
  member_limit?: number;
  pending_join_request_count?: number;
  subscription_period?: number;
  subscription_price?: number;
};

export type TelegramBotApiChatAdministratorRights = {
  is_anonymous: boolean;
  can_manage_chat: boolean;
  can_delete_messages: boolean;
  can_manage_video_chats: boolean;
  can_restrict_members: boolean;
  can_promote_members: boolean;
  can_change_info: boolean;
  can_invite_users: boolean;
  can_post_stories: boolean;
  can_edit_stories: boolean;
  can_delete_stories: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_pin_messages?: boolean;
  can_manage_topics?: boolean;
  can_manage_direct_messages?: boolean;
  can_manage_tags?: boolean;
  can_send_welcome_messages: boolean;
};

export type TelegramBotApiChatMemberUpdated = {
  chat: TelegramBotApiChat;
  from: TelegramBotApiUser;
  date: number;
  old_chat_member: TelegramBotApiChatMember;
  new_chat_member: TelegramBotApiChatMember;
  invite_link?: TelegramBotApiChatInviteLink;
  via_join_request?: boolean;
  via_chat_folder_invite_link?: boolean;
};

export type TelegramBotApiChatMemberOwner = {
  status: string;
  user: TelegramBotApiUser;
  is_anonymous: boolean;
  custom_title?: string;
};

export type TelegramBotApiChatMemberAdministrator = {
  status: string;
  user: TelegramBotApiUser;
  can_be_edited: boolean;
  is_anonymous: boolean;
  can_manage_chat: boolean;
  can_delete_messages: boolean;
  can_manage_video_chats: boolean;
  can_restrict_members: boolean;
  can_promote_members: boolean;
  can_change_info: boolean;
  can_invite_users: boolean;
  can_post_stories: boolean;
  can_edit_stories: boolean;
  can_delete_stories: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_pin_messages?: boolean;
  can_manage_topics?: boolean;
  can_manage_direct_messages?: boolean;
  can_manage_tags?: boolean;
  can_send_welcome_messages: boolean;
  custom_title?: string;
};

export type TelegramBotApiChatMemberMember = {
  status: string;
  tag?: string;
  user: TelegramBotApiUser;
  until_date?: number;
};

export type TelegramBotApiChatMemberRestricted = {
  status: string;
  tag?: string;
  user: TelegramBotApiUser;
  is_member: boolean;
  can_send_messages: boolean;
  can_send_audios: boolean;
  can_send_documents: boolean;
  can_send_photos: boolean;
  can_send_videos: boolean;
  can_send_video_notes: boolean;
  can_send_voice_notes: boolean;
  can_send_polls: boolean;
  can_send_other_messages: boolean;
  can_add_web_page_previews: boolean;
  can_react_to_messages: boolean;
  can_edit_tag: boolean;
  can_change_info: boolean;
  can_invite_users: boolean;
  can_pin_messages: boolean;
  can_manage_topics: boolean;
  until_date: number;
};

export type TelegramBotApiChatMemberLeft = {
  status: string;
  user: TelegramBotApiUser;
};

export type TelegramBotApiChatMemberBanned = {
  status: string;
  user: TelegramBotApiUser;
  until_date: number;
};

export type TelegramBotApiChatJoinRequest = {
  chat: TelegramBotApiChat;
  from: TelegramBotApiUser;
  user_chat_id: number;
  date: number;
  bio?: string;
  invite_link?: TelegramBotApiChatInviteLink;
  query_id?: string;
};

export type TelegramBotApiChatPermissions = {
  can_send_messages?: boolean;
  can_send_audios?: boolean;
  can_send_documents?: boolean;
  can_send_photos?: boolean;
  can_send_videos?: boolean;
  can_send_video_notes?: boolean;
  can_send_voice_notes?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_react_to_messages?: boolean;
  can_edit_tag?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
  can_manage_topics?: boolean;
};

export type TelegramBotApiBirthdate = {
  day: number;
  month: number;
  year?: number;
};

export type TelegramBotApiBusinessIntro = {
  title?: string;
  message?: string;
  sticker?: TelegramBotApiSticker;
};

export type TelegramBotApiBusinessLocation = {
  address: string;
  location?: TelegramBotApiLocation;
};

export type TelegramBotApiBusinessOpeningHoursInterval = {
  opening_minute: number;
  closing_minute: number;
};

export type TelegramBotApiBusinessOpeningHours = {
  time_zone_name: string;
  opening_hours: Array<TelegramBotApiBusinessOpeningHoursInterval>;
};

export type TelegramBotApiUserRating = {
  level: number;
  rating: number;
  current_level_rating: number;
  next_level_rating?: number;
};

export type TelegramBotApiStoryAreaPosition = {
  x_percentage: number;
  y_percentage: number;
  width_percentage: number;
  height_percentage: number;
  rotation_angle: number;
  corner_radius_percentage: number;
};

export type TelegramBotApiLocationAddress = {
  country_code: string;
  state?: string;
  city?: string;
  street?: string;
};

export type TelegramBotApiStoryAreaTypeLocation = {
  type: string;
  latitude: number;
  longitude: number;
  address?: TelegramBotApiLocationAddress;
};

export type TelegramBotApiStoryAreaTypeSuggestedReaction = {
  type: string;
  reaction_type: TelegramBotApiReactionType;
  is_dark?: boolean;
  is_flipped?: boolean;
};

export type TelegramBotApiStoryAreaTypeLink = {
  type: string;
  url: string;
};

export type TelegramBotApiStoryAreaTypeWeather = {
  type: string;
  temperature: number;
  emoji: string;
  background_color: number;
};

export type TelegramBotApiStoryAreaTypeUniqueGift = {
  type: string;
  name: string;
};

export type TelegramBotApiStoryArea = {
  position: TelegramBotApiStoryAreaPosition;
  type: TelegramBotApiStoryAreaType;
};

export type TelegramBotApiChatLocation = {
  location: TelegramBotApiLocation;
  address: string;
};

export type TelegramBotApiReactionTypeEmoji = {
  type: string;
  emoji: string;
};

export type TelegramBotApiReactionTypeCustomEmoji = {
  type: string;
  custom_emoji_id: string;
};

export type TelegramBotApiReactionTypePaid = {
  type: string;
};

export type TelegramBotApiReactionCount = {
  type: TelegramBotApiReactionType;
  total_count: number;
};

export type TelegramBotApiMessageReactionUpdated = {
  chat: TelegramBotApiChat;
  message_id: number;
  user?: TelegramBotApiUser;
  actor_chat?: TelegramBotApiChat;
  date: number;
  old_reaction: Array<TelegramBotApiReactionType>;
  new_reaction: Array<TelegramBotApiReactionType>;
};

export type TelegramBotApiMessageReactionCountUpdated = {
  chat: TelegramBotApiChat;
  message_id: number;
  date: number;
  reactions: Array<TelegramBotApiReactionCount>;
};

export type TelegramBotApiForumTopic = {
  message_thread_id: number;
  name: string;
  icon_color: number;
  icon_custom_emoji_id?: string;
  is_name_implicit?: true;
};

export type TelegramBotApiGiftBackground = {
  center_color: number;
  edge_color: number;
  text_color: number;
};

export type TelegramBotApiGift = {
  id: string;
  sticker: TelegramBotApiSticker;
  star_count: number;
  upgrade_star_count?: number;
  is_premium?: true;
  has_colors?: true;
  total_count?: number;
  remaining_count?: number;
  personal_total_count?: number;
  personal_remaining_count?: number;
  background?: TelegramBotApiGiftBackground;
  unique_gift_variant_count?: number;
  publisher_chat?: TelegramBotApiChat;
};

export type TelegramBotApiGifts = {
  gifts: Array<TelegramBotApiGift>;
};

export type TelegramBotApiUniqueGiftModel = {
  name: string;
  sticker: TelegramBotApiSticker;
  rarity_per_mille: number;
  rarity?: string;
};

export type TelegramBotApiUniqueGiftSymbol = {
  name: string;
  sticker: TelegramBotApiSticker;
  rarity_per_mille: number;
};

export type TelegramBotApiUniqueGiftBackdropColors = {
  center_color: number;
  edge_color: number;
  symbol_color: number;
  text_color: number;
};

export type TelegramBotApiUniqueGiftBackdrop = {
  name: string;
  colors: TelegramBotApiUniqueGiftBackdropColors;
  rarity_per_mille: number;
};

export type TelegramBotApiUniqueGiftColors = {
  model_custom_emoji_id: string;
  symbol_custom_emoji_id: string;
  light_theme_main_color: number;
  light_theme_other_colors: Array<number>;
  dark_theme_main_color: number;
  dark_theme_other_colors: Array<number>;
};

export type TelegramBotApiUniqueGift = {
  gift_id: string;
  base_name: string;
  name: string;
  number: number;
  model: TelegramBotApiUniqueGiftModel;
  symbol: TelegramBotApiUniqueGiftSymbol;
  backdrop: TelegramBotApiUniqueGiftBackdrop;
  is_premium?: true;
  is_burned?: true;
  is_from_blockchain?: true;
  colors?: TelegramBotApiUniqueGiftColors;
  publisher_chat?: TelegramBotApiChat;
};

export type TelegramBotApiGiftInfo = {
  gift: TelegramBotApiGift;
  owned_gift_id?: string;
  convert_star_count?: number;
  prepaid_upgrade_star_count?: number;
  is_upgrade_separate?: true;
  can_be_upgraded?: true;
  text?: string;
  entities?: Array<TelegramBotApiMessageEntity>;
  is_private?: true;
  unique_gift_number?: number;
};

export type TelegramBotApiUniqueGiftInfo = {
  gift: TelegramBotApiUniqueGift;
  origin: string;
  text?: string;
  entities?: Array<TelegramBotApiMessageEntity>;
  is_private?: true;
  last_resale_currency?: string;
  last_resale_amount?: number;
  owned_gift_id?: string;
  transfer_star_count?: number;
  next_transfer_date?: number;
};

export type TelegramBotApiOwnedGiftRegular = {
  type: string;
  gift: TelegramBotApiGift;
  owned_gift_id?: string;
  sender_user?: TelegramBotApiUser;
  send_date: number;
  text?: string;
  entities?: Array<TelegramBotApiMessageEntity>;
  is_private?: true;
  is_saved?: true;
  can_be_upgraded?: true;
  was_refunded?: true;
  convert_star_count?: number;
  prepaid_upgrade_star_count?: number;
  is_upgrade_separate?: true;
  unique_gift_number?: number;
};

export type TelegramBotApiOwnedGiftUnique = {
  type: string;
  gift: TelegramBotApiUniqueGift;
  owned_gift_id?: string;
  sender_user?: TelegramBotApiUser;
  send_date: number;
  is_saved?: true;
  can_be_transferred?: true;
  transfer_star_count?: number;
  next_transfer_date?: number;
};

export type TelegramBotApiOwnedGifts = {
  total_count: number;
  gifts: Array<TelegramBotApiOwnedGift>;
  next_offset?: string;
};

export type TelegramBotApiBotAccessSettings = {
  is_access_restricted: boolean;
  added_users?: Array<TelegramBotApiUser>;
};

export type TelegramBotApiAcceptedGiftTypes = {
  unlimited_gifts: boolean;
  limited_gifts: boolean;
  unique_gifts: boolean;
  premium_subscription: boolean;
  gifts_from_channels: boolean;
};

export type TelegramBotApiStarAmount = {
  amount: number;
  nanostar_amount?: number;
};

export type TelegramBotApiBotCommand = {
  command: string;
  description: string;
  is_ephemeral?: boolean;
};

export type TelegramBotApiBotCommandScopeDefault = {
  type: string;
};

export type TelegramBotApiBotCommandScopeAllPrivateChats = {
  type: string;
};

export type TelegramBotApiBotCommandScopeAllGroupChats = {
  type: string;
};

export type TelegramBotApiBotCommandScopeAllChatAdministrators = {
  type: string;
};

export type TelegramBotApiBotCommandScopeChat = {
  type: string;
  chat_id: number | string;
};

export type TelegramBotApiBotCommandScopeChatAdministrators = {
  type: string;
  chat_id: number | string;
};

export type TelegramBotApiBotCommandScopeChatMember = {
  type: string;
  chat_id: number | string;
  user_id: number;
};

export type TelegramBotApiBotName = {
  name: string;
};

export type TelegramBotApiBotDescription = {
  description: string;
};

export type TelegramBotApiBotShortDescription = {
  short_description: string;
};

export type TelegramBotApiMenuButtonCommands = {
  type: string;
};

export type TelegramBotApiMenuButtonWebApp = {
  type: string;
  text: string;
  web_app: TelegramBotApiWebAppInfo;
};

export type TelegramBotApiMenuButtonDefault = {
  type: string;
};

export type TelegramBotApiChatBoostSourcePremium = {
  source: string;
  user: TelegramBotApiUser;
};

export type TelegramBotApiChatBoostSourceGiftCode = {
  source: string;
  user: TelegramBotApiUser;
};

export type TelegramBotApiChatBoostSourceGiveaway = {
  source: string;
  giveaway_message_id: number;
  user?: TelegramBotApiUser;
  prize_star_count?: number;
  is_unclaimed?: true;
};

export type TelegramBotApiChatBoost = {
  boost_id: string;
  add_date: number;
  expiration_date: number;
  source: TelegramBotApiChatBoostSource;
};

export type TelegramBotApiChatBoostUpdated = {
  chat: TelegramBotApiChat;
  boost: TelegramBotApiChatBoost;
};

export type TelegramBotApiChatBoostRemoved = {
  chat: TelegramBotApiChat;
  boost_id: string;
  remove_date: number;
  source: TelegramBotApiChatBoostSource;
};

export type TelegramBotApiChatOwnerLeft = {
  new_owner?: TelegramBotApiUser;
};

export type TelegramBotApiChatOwnerChanged = {
  new_owner: TelegramBotApiUser;
};

export type TelegramBotApiUserChatBoosts = {
  boosts: Array<TelegramBotApiChatBoost>;
};

export type TelegramBotApiBusinessBotRights = {
  can_reply?: true;
  can_read_messages?: true;
  can_delete_sent_messages?: true;
  can_delete_all_messages?: true;
  can_edit_name?: true;
  can_edit_bio?: true;
  can_edit_profile_photo?: true;
  can_edit_username?: true;
  can_change_gift_settings?: true;
  can_view_gifts_and_stars?: true;
  can_convert_gifts_to_stars?: true;
  can_transfer_and_upgrade_gifts?: true;
  can_transfer_stars?: true;
  can_manage_stories?: true;
};

export type TelegramBotApiBusinessConnection = {
  id: string;
  user: TelegramBotApiUser;
  user_chat_id: number;
  date: number;
  rights?: TelegramBotApiBusinessBotRights;
  is_enabled: boolean;
};

export type TelegramBotApiBusinessMessagesDeleted = {
  business_connection_id: string;
  chat: TelegramBotApiChat;
  message_ids: Array<number>;
};

export type TelegramBotApiSentWebAppMessage = {
  inline_message_id?: string;
};

export type TelegramBotApiSentGuestMessage = {
  inline_message_id: string;
};

export type TelegramBotApiPreparedInlineMessage = {
  id: string;
  expiration_date: number;
};

export type TelegramBotApiPreparedKeyboardButton = {
  id: string;
};

export type TelegramBotApiResponseParameters = {
  migrate_to_chat_id?: number;
  retry_after?: number;
};

export type TelegramBotApiInputMediaAnimation = {
  type: string;
  media: TelegramBotApiInputFile;
  thumbnail?: TelegramBotApiInputFile;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  width?: number;
  height?: number;
  duration?: number;
  has_spoiler?: boolean;
};

export type TelegramBotApiInputMediaAudio = {
  type: string;
  media: TelegramBotApiInputFile;
  thumbnail?: TelegramBotApiInputFile;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  duration?: number;
  performer?: string;
  title?: string;
};

export type TelegramBotApiInputMediaDocument = {
  type: string;
  media: TelegramBotApiInputFile;
  thumbnail?: TelegramBotApiInputFile;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  disable_content_type_detection?: boolean;
};

export type TelegramBotApiInputMediaLink = {
  type: string;
  url: string;
};

export type TelegramBotApiInputMediaLivePhoto = {
  type: string;
  media: TelegramBotApiInputFile;
  photo: TelegramBotApiInputFile;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  has_spoiler?: boolean;
};

export type TelegramBotApiInputMediaLocation = {
  type: string;
  latitude: number;
  longitude: number;
  horizontal_accuracy?: number;
};

export type TelegramBotApiInputMediaPhoto = {
  type: string;
  media: TelegramBotApiInputFile;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  has_spoiler?: boolean;
};

export type TelegramBotApiInputMediaSticker = {
  type: string;
  media: TelegramBotApiInputFile;
  emoji?: string;
};

export type TelegramBotApiInputMediaVenue = {
  type: string;
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
};

export type TelegramBotApiInputMediaVideo = {
  type: string;
  media: TelegramBotApiInputFile;
  thumbnail?: TelegramBotApiInputFile;
  cover?: TelegramBotApiInputFile;
  start_timestamp?: number;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  width?: number;
  height?: number;
  duration?: number;
  supports_streaming?: boolean;
  has_spoiler?: boolean;
};

export type TelegramBotApiInputMediaVoiceNote = {
  type: string;
  media: TelegramBotApiInputFile;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  duration?: number;
};

export type TelegramBotApiInputPaidMediaLivePhoto = {
  type: string;
  media: TelegramBotApiInputFile;
  photo: TelegramBotApiInputFile;
};

export type TelegramBotApiInputPaidMediaPhoto = {
  type: string;
  media: TelegramBotApiInputFile;
};

export type TelegramBotApiInputPaidMediaVideo = {
  type: string;
  media: TelegramBotApiInputFile;
  thumbnail?: TelegramBotApiInputFile;
  cover?: TelegramBotApiInputFile;
  start_timestamp?: number;
  width?: number;
  height?: number;
  duration?: number;
  supports_streaming?: boolean;
};

export type TelegramBotApiInputProfilePhotoStatic = {
  type: string;
  photo: TelegramBotApiInputFile;
};

export type TelegramBotApiInputProfilePhotoAnimated = {
  type: string;
  animation: TelegramBotApiInputFile;
  main_frame_timestamp?: number;
};

export type TelegramBotApiInputStoryContentPhoto = {
  type: string;
  photo: TelegramBotApiInputFile;
};

export type TelegramBotApiInputStoryContentVideo = {
  type: string;
  video: TelegramBotApiInputFile;
  duration?: number;
  cover_frame_timestamp?: number;
  is_animation?: boolean;
};

export type TelegramBotApiSticker = {
  file_id: string;
  file_unique_id: string;
  type: string;
  width: number;
  height: number;
  is_animated: boolean;
  is_video: boolean;
  thumbnail?: TelegramBotApiPhotoSize;
  emoji?: string;
  set_name?: string;
  premium_animation?: TelegramBotApiFile;
  mask_position?: TelegramBotApiMaskPosition;
  custom_emoji_id?: string;
  needs_repainting?: true;
  file_size?: number;
};

export type TelegramBotApiStickerSet = {
  name: string;
  title: string;
  sticker_type: string;
  stickers: Array<TelegramBotApiSticker>;
  thumbnail?: TelegramBotApiPhotoSize;
};

export type TelegramBotApiMaskPosition = {
  point: string;
  x_shift: number;
  y_shift: number;
  scale: number;
};

export type TelegramBotApiInputSticker = {
  sticker: TelegramBotApiInputFile;
  format: string;
  emoji_list: Array<string>;
  mask_position?: TelegramBotApiMaskPosition;
  keywords?: Array<string>;
};

export type TelegramBotApiRichMessage = {
  blocks: Array<TelegramBotApiRichBlock>;
  is_rtl?: boolean;
};

export type TelegramBotApiInputRichMessage = {
  blocks?: Array<TelegramBotApiInputRichBlock>;
  html?: string;
  markdown?: string;
  media?: Array<TelegramBotApiInputRichMessageMedia>;
  is_rtl?: boolean;
  skip_entity_detection?: boolean;
};

export type TelegramBotApiInputRichMessageMedia = {
  id: string;
  media: TelegramBotApiInputMediaAnimation | TelegramBotApiInputMediaAudio | TelegramBotApiInputMediaDocument | TelegramBotApiInputMediaPhoto | TelegramBotApiInputMediaVideo | TelegramBotApiInputMediaVoiceNote;
};

export type TelegramBotApiRichMessageButton = {
  text: TelegramBotApiRichText;
  style?: string;
  url?: string;
  callback_data?: string;
  web_app?: TelegramBotApiWebAppInfo;
  login_url?: TelegramBotApiLoginUrl;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  switch_inline_query_chosen_chat?: TelegramBotApiSwitchInlineQueryChosenChat;
  copy_text?: TelegramBotApiCopyTextButton;
  disabled?: TelegramBotApiDisabledButton;
};

export type TelegramBotApiRichTextBold = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichTextItalic = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichTextUnderline = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichTextStrikethrough = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichTextSpoiler = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichTextDateTime = {
  type: string;
  text: TelegramBotApiRichText;
  unix_time: number;
  date_time_format: string;
};

export type TelegramBotApiRichTextTextMention = {
  type: string;
  text: TelegramBotApiRichText;
  user: TelegramBotApiUser;
};

export type TelegramBotApiRichTextSubscript = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichTextSuperscript = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichTextMarked = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichTextCode = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichTextCustomEmoji = {
  type: string;
  custom_emoji_id: string;
  alternative_text: string;
};

export type TelegramBotApiRichTextMathematicalExpression = {
  type: string;
  expression: string;
};

export type TelegramBotApiRichTextUrl = {
  type: string;
  text: TelegramBotApiRichText;
  url: string;
};

export type TelegramBotApiRichTextEmailAddress = {
  type: string;
  text: TelegramBotApiRichText;
  email_address: string;
};

export type TelegramBotApiRichTextPhoneNumber = {
  type: string;
  text: TelegramBotApiRichText;
  phone_number: string;
};

export type TelegramBotApiRichTextBankCardNumber = {
  type: string;
  text: TelegramBotApiRichText;
  bank_card_number: string;
};

export type TelegramBotApiRichTextMention = {
  type: string;
  text: TelegramBotApiRichText;
  username: string;
};

export type TelegramBotApiRichTextHashtag = {
  type: string;
  text: TelegramBotApiRichText;
  hashtag: string;
};

export type TelegramBotApiRichTextCashtag = {
  type: string;
  text: TelegramBotApiRichText;
  cashtag: string;
};

export type TelegramBotApiRichTextBotCommand = {
  type: string;
  text: TelegramBotApiRichText;
  bot_command: string;
};

export type TelegramBotApiRichTextButton = {
  type: string;
  button: TelegramBotApiRichMessageButton;
};

export type TelegramBotApiRichTextAnchor = {
  type: string;
  name: string;
};

export type TelegramBotApiRichTextAnchorLink = {
  type: string;
  text: TelegramBotApiRichText;
  anchor_name: string;
};

export type TelegramBotApiRichTextReference = {
  type: string;
  text: TelegramBotApiRichText;
  name: string;
};

export type TelegramBotApiRichTextReferenceLink = {
  type: string;
  text: TelegramBotApiRichText;
  reference_name: string;
};

export type TelegramBotApiRichBlockCaption = {
  text: TelegramBotApiRichText;
  credit?: TelegramBotApiRichText;
};

export type TelegramBotApiRichBlockTableCell = {
  text?: TelegramBotApiRichText;
  is_header?: true;
  colspan?: number;
  rowspan?: number;
  align: string;
  valign: string;
};

export type TelegramBotApiRichBlockListItem = {
  label: string;
  blocks: Array<TelegramBotApiRichBlock>;
  has_checkbox?: true;
  is_checked?: true;
  value?: number;
  type?: string;
};

export type TelegramBotApiRichBlockParagraph = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichBlockSectionHeading = {
  type: string;
  text: TelegramBotApiRichText;
  size: number;
};

export type TelegramBotApiRichBlockPreformatted = {
  type: string;
  text: TelegramBotApiRichText;
  language?: string;
};

export type TelegramBotApiRichBlockFooter = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiRichBlockDivider = {
  type: string;
};

export type TelegramBotApiRichBlockMathematicalExpression = {
  type: string;
  expression: string;
};

export type TelegramBotApiRichBlockAnchor = {
  type: string;
  name: string;
};

export type TelegramBotApiRichBlockList = {
  type: string;
  items: Array<TelegramBotApiRichBlockListItem>;
};

export type TelegramBotApiRichBlockBlockQuotation = {
  type: string;
  blocks: Array<TelegramBotApiRichBlock>;
  credit?: TelegramBotApiRichText;
};

export type TelegramBotApiRichBlockExpandableBlockQuotation = {
  type: string;
  text: TelegramBotApiRichText;
  credit?: TelegramBotApiRichText;
};

export type TelegramBotApiRichBlockPullQuotation = {
  type: string;
  text: TelegramBotApiRichText;
  credit?: TelegramBotApiRichText;
};

export type TelegramBotApiRichBlockCollage = {
  type: string;
  blocks: Array<TelegramBotApiRichBlock>;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiRichBlockSlideshow = {
  type: string;
  blocks: Array<TelegramBotApiRichBlock>;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiRichBlockTable = {
  type: string;
  cells: Array<Array<TelegramBotApiRichBlockTableCell>>;
  is_bordered?: true;
  is_striped?: true;
  is_compact?: true;
  caption?: TelegramBotApiRichText;
};

export type TelegramBotApiRichBlockDetails = {
  type: string;
  summary: TelegramBotApiRichText;
  blocks: Array<TelegramBotApiRichBlock>;
  is_open?: true;
};

export type TelegramBotApiRichBlockMap = {
  type: string;
  location: TelegramBotApiLocation;
  zoom: number;
  width: number;
  height: number;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiRichBlockButtons = {
  type: string;
  buttons: Array<TelegramBotApiRichMessageButton>;
  align?: string;
};

export type TelegramBotApiRichBlockAnimation = {
  type: string;
  animation: TelegramBotApiAnimation;
  has_spoiler?: true;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiRichBlockAudio = {
  type: string;
  audio: TelegramBotApiAudio;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiRichBlockDocument = {
  type: string;
  document: TelegramBotApiDocument;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiRichBlockPhoto = {
  type: string;
  photo: Array<TelegramBotApiPhotoSize>;
  has_spoiler?: true;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiRichBlockVideo = {
  type: string;
  video: TelegramBotApiVideo;
  has_spoiler?: true;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiRichBlockVoiceNote = {
  type: string;
  voice_note: TelegramBotApiVoice;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiRichBlockThinking = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiInputRichBlockListItem = {
  blocks: Array<TelegramBotApiInputRichBlock>;
  has_checkbox?: true;
  is_checked?: true;
  value?: number;
  type?: string;
};

export type TelegramBotApiInputRichBlockParagraph = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiInputRichBlockSectionHeading = {
  type: string;
  text: TelegramBotApiRichText;
  size: number;
};

export type TelegramBotApiInputRichBlockPreformatted = {
  type: string;
  text: TelegramBotApiRichText;
  language?: string;
};

export type TelegramBotApiInputRichBlockFooter = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiInputRichBlockDivider = {
  type: string;
};

export type TelegramBotApiInputRichBlockMathematicalExpression = {
  type: string;
  expression: string;
};

export type TelegramBotApiInputRichBlockAnchor = {
  type: string;
  name: string;
};

export type TelegramBotApiInputRichBlockList = {
  type: string;
  items: Array<TelegramBotApiInputRichBlockListItem>;
};

export type TelegramBotApiInputRichBlockBlockQuotation = {
  type: string;
  blocks: Array<TelegramBotApiInputRichBlock>;
  credit?: TelegramBotApiRichText;
};

export type TelegramBotApiInputRichBlockExpandableBlockQuotation = {
  type: string;
  text: TelegramBotApiRichText;
  credit?: TelegramBotApiRichText;
};

export type TelegramBotApiInputRichBlockPullQuotation = {
  type: string;
  text: TelegramBotApiRichText;
  credit?: TelegramBotApiRichText;
};

export type TelegramBotApiInputRichBlockCollage = {
  type: string;
  blocks: Array<TelegramBotApiInputRichBlock>;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiInputRichBlockSlideshow = {
  type: string;
  blocks: Array<TelegramBotApiInputRichBlock>;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiInputRichBlockTable = {
  type: string;
  cells: Array<Array<TelegramBotApiRichBlockTableCell>>;
  is_bordered?: true;
  is_striped?: true;
  is_compact?: true;
  caption?: TelegramBotApiRichText;
};

export type TelegramBotApiInputRichBlockDetails = {
  type: string;
  summary: TelegramBotApiRichText;
  blocks: Array<TelegramBotApiInputRichBlock>;
  is_open?: true;
};

export type TelegramBotApiInputRichBlockMap = {
  type: string;
  location: TelegramBotApiLocation;
  zoom?: number;
  width?: number;
  height?: number;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiInputRichBlockButtons = {
  type: string;
  buttons: Array<TelegramBotApiRichMessageButton>;
  align?: string;
};

export type TelegramBotApiInputRichBlockAnimation = {
  type: string;
  animation: TelegramBotApiInputMediaAnimation;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiInputRichBlockAudio = {
  type: string;
  audio: TelegramBotApiInputMediaAudio;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiInputRichBlockDocument = {
  type: string;
  document: TelegramBotApiInputMediaDocument;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiInputRichBlockPhoto = {
  type: string;
  photo: TelegramBotApiInputMediaPhoto;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiInputRichBlockVideo = {
  type: string;
  video: TelegramBotApiInputMediaVideo;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiInputRichBlockVoiceNote = {
  type: string;
  voice_note: TelegramBotApiInputMediaVoiceNote;
  caption?: TelegramBotApiRichBlockCaption;
};

export type TelegramBotApiInputRichBlockThinking = {
  type: string;
  text: TelegramBotApiRichText;
};

export type TelegramBotApiInlineQuery = {
  id: string;
  from: TelegramBotApiUser;
  query: string;
  offset: string;
  chat_type?: string;
  location?: TelegramBotApiLocation;
};

export type TelegramBotApiInlineQueryResultsButton = {
  text: string;
  web_app?: TelegramBotApiWebAppInfo;
  start_parameter?: string;
};

export type TelegramBotApiInlineQueryResultArticle = {
  type: string;
  id: string;
  title: string;
  input_message_content: TelegramBotApiInputMessageContent;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  url?: string;
  description?: string;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
};

export type TelegramBotApiInlineQueryResultPhoto = {
  type: string;
  id: string;
  photo_url: string;
  thumbnail_url: string;
  photo_width?: number;
  photo_height?: number;
  title?: string;
  description?: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultGif = {
  type: string;
  id: string;
  gif_url: string;
  gif_width?: number;
  gif_height?: number;
  gif_duration?: number;
  thumbnail_url: string;
  thumbnail_mime_type?: string;
  title?: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultMpeg4Gif = {
  type: string;
  id: string;
  mpeg4_url: string;
  mpeg4_width?: number;
  mpeg4_height?: number;
  mpeg4_duration?: number;
  thumbnail_url: string;
  thumbnail_mime_type?: string;
  title?: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultVideo = {
  type: string;
  id: string;
  video_url: string;
  mime_type: string;
  thumbnail_url: string;
  title: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  video_width?: number;
  video_height?: number;
  video_duration?: number;
  description?: string;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultAudio = {
  type: string;
  id: string;
  audio_url: string;
  title: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  performer?: string;
  audio_duration?: number;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultVoice = {
  type: string;
  id: string;
  voice_url: string;
  title: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  voice_duration?: number;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultDocument = {
  type: string;
  id: string;
  title: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  document_url: string;
  mime_type: string;
  description?: string;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
};

export type TelegramBotApiInlineQueryResultLocation = {
  type: string;
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
};

export type TelegramBotApiInlineQueryResultVenue = {
  type: string;
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
};

export type TelegramBotApiInlineQueryResultContact = {
  type: string;
  id: string;
  phone_number: string;
  first_name: string;
  last_name?: string;
  vcard?: string;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
};

export type TelegramBotApiInlineQueryResultGame = {
  type: string;
  id: string;
  game_short_name: string;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
};

export type TelegramBotApiInlineQueryResultCachedPhoto = {
  type: string;
  id: string;
  photo_file_id: string;
  title?: string;
  description?: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultCachedGif = {
  type: string;
  id: string;
  gif_file_id: string;
  title?: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultCachedMpeg4Gif = {
  type: string;
  id: string;
  mpeg4_file_id: string;
  title?: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultCachedSticker = {
  type: string;
  id: string;
  sticker_file_id: string;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultCachedDocument = {
  type: string;
  id: string;
  title: string;
  document_file_id: string;
  description?: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultCachedVideo = {
  type: string;
  id: string;
  video_file_id: string;
  title: string;
  description?: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  show_caption_above_media?: boolean;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultCachedVoice = {
  type: string;
  id: string;
  voice_file_id: string;
  title: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInlineQueryResultCachedAudio = {
  type: string;
  id: string;
  audio_file_id: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<TelegramBotApiMessageEntity>;
  reply_markup?: TelegramBotApiInlineKeyboardMarkup;
  input_message_content?: TelegramBotApiInputMessageContent;
};

export type TelegramBotApiInputTextMessageContent = {
  message_text: string;
  parse_mode?: string;
  entities?: Array<TelegramBotApiMessageEntity>;
  link_preview_options?: TelegramBotApiLinkPreviewOptions;
};

export type TelegramBotApiInputRichMessageContent = {
  rich_message: TelegramBotApiInputRichMessage;
};

export type TelegramBotApiInputLocationMessageContent = {
  latitude: number;
  longitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
};

export type TelegramBotApiInputVenueMessageContent = {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
};

export type TelegramBotApiInputContactMessageContent = {
  phone_number: string;
  first_name: string;
  last_name?: string;
  vcard?: string;
};

export type TelegramBotApiInputInvoiceMessageContent = {
  title: string;
  description: string;
  payload: string;
  provider_token?: string;
  currency: string;
  prices: Array<TelegramBotApiLabeledPrice>;
  max_tip_amount?: number;
  suggested_tip_amounts?: Array<number>;
  provider_data?: string;
  photo_url?: string;
  photo_size?: number;
  photo_width?: number;
  photo_height?: number;
  need_name?: boolean;
  need_phone_number?: boolean;
  need_email?: boolean;
  need_shipping_address?: boolean;
  send_phone_number_to_provider?: boolean;
  send_email_to_provider?: boolean;
  is_flexible?: boolean;
};

export type TelegramBotApiChosenInlineResult = {
  result_id: string;
  from: TelegramBotApiUser;
  location?: TelegramBotApiLocation;
  inline_message_id?: string;
  query: string;
};

export type TelegramBotApiLabeledPrice = {
  label: string;
  amount: number;
};

export type TelegramBotApiInvoice = {
  title: string;
  description: string;
  start_parameter: string;
  currency: string;
  total_amount: number;
};

export type TelegramBotApiShippingAddress = {
  country_code: string;
  state: string;
  city: string;
  street_line1: string;
  street_line2: string;
  post_code: string;
};

export type TelegramBotApiOrderInfo = {
  name?: string;
  phone_number?: string;
  email?: string;
  shipping_address?: TelegramBotApiShippingAddress;
};

export type TelegramBotApiShippingOption = {
  id: string;
  title: string;
  prices: Array<TelegramBotApiLabeledPrice>;
};

export type TelegramBotApiSuccessfulPayment = {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  subscription_expiration_date?: number;
  is_recurring?: true;
  is_first_recurring?: true;
  shipping_option_id?: string;
  order_info?: TelegramBotApiOrderInfo;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
};

export type TelegramBotApiRefundedPayment = {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  telegram_payment_charge_id: string;
  provider_payment_charge_id?: string;
};

export type TelegramBotApiShippingQuery = {
  id: string;
  from: TelegramBotApiUser;
  invoice_payload: string;
  shipping_address: TelegramBotApiShippingAddress;
};

export type TelegramBotApiPreCheckoutQuery = {
  id: string;
  from: TelegramBotApiUser;
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: TelegramBotApiOrderInfo;
};

export type TelegramBotApiPaidMediaPurchased = {
  from: TelegramBotApiUser;
  paid_media_payload: string;
};

export type TelegramBotApiRevenueWithdrawalStatePending = {
  type: string;
};

export type TelegramBotApiRevenueWithdrawalStateSucceeded = {
  type: string;
  date: number;
  url: string;
};

export type TelegramBotApiRevenueWithdrawalStateFailed = {
  type: string;
};

export type TelegramBotApiAffiliateInfo = {
  affiliate_user?: TelegramBotApiUser;
  affiliate_chat?: TelegramBotApiChat;
  commission_per_mille: number;
  amount: number;
  nanostar_amount?: number;
};

export type TelegramBotApiTransactionPartnerUser = {
  type: string;
  transaction_type: string;
  user: TelegramBotApiUser;
  affiliate?: TelegramBotApiAffiliateInfo;
  invoice_payload?: string;
  subscription_period?: number;
  paid_media?: Array<TelegramBotApiPaidMedia>;
  paid_media_payload?: string;
  gift?: TelegramBotApiGift;
  premium_subscription_duration?: number;
};

export type TelegramBotApiTransactionPartnerChat = {
  type: string;
  chat: TelegramBotApiChat;
  gift?: TelegramBotApiGift;
};

export type TelegramBotApiTransactionPartnerAffiliateProgram = {
  type: string;
  sponsor_user?: TelegramBotApiUser;
  commission_per_mille: number;
};

export type TelegramBotApiTransactionPartnerFragment = {
  type: string;
  withdrawal_state?: TelegramBotApiRevenueWithdrawalState;
};

export type TelegramBotApiTransactionPartnerTelegramAds = {
  type: string;
};

export type TelegramBotApiTransactionPartnerTelegramApi = {
  type: string;
  request_count: number;
};

export type TelegramBotApiTransactionPartnerOther = {
  type: string;
};

export type TelegramBotApiStarTransaction = {
  id: string;
  amount: number;
  nanostar_amount?: number;
  date: number;
  source?: TelegramBotApiTransactionPartner;
  receiver?: TelegramBotApiTransactionPartner;
};

export type TelegramBotApiStarTransactions = {
  transactions: Array<TelegramBotApiStarTransaction>;
};

export type TelegramBotApiPassportData = {
  data: Array<TelegramBotApiEncryptedPassportElement>;
  credentials: TelegramBotApiEncryptedCredentials;
};

export type TelegramBotApiPassportFile = {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  file_date: number;
};

export type TelegramBotApiEncryptedPassportElement = {
  type: string;
  data?: string;
  phone_number?: string;
  email?: string;
  files?: Array<TelegramBotApiPassportFile>;
  front_side?: TelegramBotApiPassportFile;
  reverse_side?: TelegramBotApiPassportFile;
  selfie?: TelegramBotApiPassportFile;
  translation?: Array<TelegramBotApiPassportFile>;
  hash: string;
};

export type TelegramBotApiEncryptedCredentials = {
  data: string;
  hash: string;
  secret: string;
};

export type TelegramBotApiPassportElementErrorDataField = {
  source: string;
  type: string;
  field_name: string;
  data_hash: string;
  message: string;
};

export type TelegramBotApiPassportElementErrorFrontSide = {
  source: string;
  type: string;
  file_hash: string;
  message: string;
};

export type TelegramBotApiPassportElementErrorReverseSide = {
  source: string;
  type: string;
  file_hash: string;
  message: string;
};

export type TelegramBotApiPassportElementErrorSelfie = {
  source: string;
  type: string;
  file_hash: string;
  message: string;
};

export type TelegramBotApiPassportElementErrorFile = {
  source: string;
  type: string;
  file_hash: string;
  message: string;
};

export type TelegramBotApiPassportElementErrorFiles = {
  source: string;
  type: string;
  file_hashes: Array<string>;
  message: string;
};

export type TelegramBotApiPassportElementErrorTranslationFile = {
  source: string;
  type: string;
  file_hash: string;
  message: string;
};

export type TelegramBotApiPassportElementErrorTranslationFiles = {
  source: string;
  type: string;
  file_hashes: Array<string>;
  message: string;
};

export type TelegramBotApiPassportElementErrorUnspecified = {
  source: string;
  type: string;
  element_hash: string;
  message: string;
};

export type TelegramBotApiGame = {
  title: string;
  description: string;
  photo: Array<TelegramBotApiPhotoSize>;
  text?: string;
  text_entities?: Array<TelegramBotApiMessageEntity>;
  animation?: TelegramBotApiAnimation;
};

export type TelegramBotApiGameHighScore = {
  position: number;
  user: TelegramBotApiUser;
  score: number;
};

export type TelegramBotApiBackgroundFill = TelegramBotApiBackgroundFillSolid | TelegramBotApiBackgroundFillGradient | TelegramBotApiBackgroundFillFreeformGradient;
export type TelegramBotApiBackgroundType = TelegramBotApiBackgroundTypeFill | TelegramBotApiBackgroundTypeWallpaper | TelegramBotApiBackgroundTypePattern | TelegramBotApiBackgroundTypeChatTheme;
export type TelegramBotApiChatBoostSource = TelegramBotApiChatBoostSourcePremium | TelegramBotApiChatBoostSourceGiftCode | TelegramBotApiChatBoostSourceGiveaway;
export type TelegramBotApiChatMember = TelegramBotApiChatMemberOwner | TelegramBotApiChatMemberAdministrator | TelegramBotApiChatMemberMember | TelegramBotApiChatMemberRestricted | TelegramBotApiChatMemberLeft | TelegramBotApiChatMemberBanned;
export type TelegramBotApiInputMessageContent = TelegramBotApiInputTextMessageContent | TelegramBotApiInputRichMessageContent | TelegramBotApiInputLocationMessageContent | TelegramBotApiInputVenueMessageContent | TelegramBotApiInputContactMessageContent | TelegramBotApiInputInvoiceMessageContent;
export type TelegramBotApiInputPollOptionMedia = TelegramBotApiInputMediaAnimation | TelegramBotApiInputMediaLink | TelegramBotApiInputMediaLivePhoto | TelegramBotApiInputMediaLocation | TelegramBotApiInputMediaPhoto | TelegramBotApiInputMediaSticker | TelegramBotApiInputMediaVenue | TelegramBotApiInputMediaVideo;
export type TelegramBotApiInputRichBlock = TelegramBotApiInputRichBlockParagraph | TelegramBotApiInputRichBlockSectionHeading | TelegramBotApiInputRichBlockPreformatted | TelegramBotApiInputRichBlockFooter | TelegramBotApiInputRichBlockDivider | TelegramBotApiInputRichBlockMathematicalExpression | TelegramBotApiInputRichBlockAnchor | TelegramBotApiInputRichBlockList | TelegramBotApiInputRichBlockBlockQuotation | TelegramBotApiInputRichBlockExpandableBlockQuotation | TelegramBotApiInputRichBlockPullQuotation | TelegramBotApiInputRichBlockCollage | TelegramBotApiInputRichBlockSlideshow | TelegramBotApiInputRichBlockTable | TelegramBotApiInputRichBlockDetails | TelegramBotApiInputRichBlockMap | TelegramBotApiInputRichBlockButtons | TelegramBotApiInputRichBlockAnimation | TelegramBotApiInputRichBlockAudio | TelegramBotApiInputRichBlockDocument | TelegramBotApiInputRichBlockPhoto | TelegramBotApiInputRichBlockVideo | TelegramBotApiInputRichBlockVoiceNote | TelegramBotApiInputRichBlockThinking;
export type TelegramBotApiMaybeInaccessibleMessage = TelegramBotApiMessage | TelegramBotApiInaccessibleMessage;
export type TelegramBotApiMessageOrigin = TelegramBotApiMessageOriginUser | TelegramBotApiMessageOriginHiddenUser | TelegramBotApiMessageOriginChat | TelegramBotApiMessageOriginChannel;
export type TelegramBotApiOwnedGift = TelegramBotApiOwnedGiftRegular | TelegramBotApiOwnedGiftUnique;
export type TelegramBotApiPaidMedia = TelegramBotApiPaidMediaLivePhoto | TelegramBotApiPaidMediaPhoto | TelegramBotApiPaidMediaPreview | TelegramBotApiPaidMediaVideo;
export type TelegramBotApiReactionType = TelegramBotApiReactionTypeEmoji | TelegramBotApiReactionTypeCustomEmoji | TelegramBotApiReactionTypePaid;
export type TelegramBotApiRevenueWithdrawalState = TelegramBotApiRevenueWithdrawalStatePending | TelegramBotApiRevenueWithdrawalStateSucceeded | TelegramBotApiRevenueWithdrawalStateFailed;
export type TelegramBotApiRichBlock = TelegramBotApiRichBlockParagraph | TelegramBotApiRichBlockSectionHeading | TelegramBotApiRichBlockPreformatted | TelegramBotApiRichBlockFooter | TelegramBotApiRichBlockDivider | TelegramBotApiRichBlockMathematicalExpression | TelegramBotApiRichBlockAnchor | TelegramBotApiRichBlockList | TelegramBotApiRichBlockBlockQuotation | TelegramBotApiRichBlockExpandableBlockQuotation | TelegramBotApiRichBlockPullQuotation | TelegramBotApiRichBlockCollage | TelegramBotApiRichBlockSlideshow | TelegramBotApiRichBlockTable | TelegramBotApiRichBlockDetails | TelegramBotApiRichBlockMap | TelegramBotApiRichBlockButtons | TelegramBotApiRichBlockAnimation | TelegramBotApiRichBlockAudio | TelegramBotApiRichBlockDocument | TelegramBotApiRichBlockPhoto | TelegramBotApiRichBlockVideo | TelegramBotApiRichBlockVoiceNote | TelegramBotApiRichBlockThinking;
export type TelegramBotApiStoryAreaType = TelegramBotApiStoryAreaTypeLocation | TelegramBotApiStoryAreaTypeSuggestedReaction | TelegramBotApiStoryAreaTypeLink | TelegramBotApiStoryAreaTypeWeather | TelegramBotApiStoryAreaTypeUniqueGift;
export type TelegramBotApiTransactionPartner = TelegramBotApiTransactionPartnerUser | TelegramBotApiTransactionPartnerChat | TelegramBotApiTransactionPartnerAffiliateProgram | TelegramBotApiTransactionPartnerFragment | TelegramBotApiTransactionPartnerTelegramAds | TelegramBotApiTransactionPartnerTelegramApi | TelegramBotApiTransactionPartnerOther;
export type TelegramBotApiCallbackGame = Record<string, never>;
export type TelegramBotApiCommunityChatRemoved = Record<string, never>;
export type TelegramBotApiDisabledButton = Record<string, never>;
export type TelegramBotApiForumTopicClosed = Record<string, never>;
export type TelegramBotApiForumTopicReopened = Record<string, never>;
export type TelegramBotApiGeneralForumTopicHidden = Record<string, never>;
export type TelegramBotApiGeneralForumTopicUnhidden = Record<string, never>;
export type TelegramBotApiVideoChatStarted = Record<string, never>;
export type TelegramBotApiRichText = string | TelegramBotApiRichText[] | TelegramBotApiRichTextBold | TelegramBotApiRichTextItalic | TelegramBotApiRichTextUnderline | TelegramBotApiRichTextStrikethrough | TelegramBotApiRichTextSpoiler | TelegramBotApiRichTextDateTime | TelegramBotApiRichTextTextMention | TelegramBotApiRichTextSubscript | TelegramBotApiRichTextSuperscript | TelegramBotApiRichTextMarked | TelegramBotApiRichTextCode | TelegramBotApiRichTextCustomEmoji | TelegramBotApiRichTextMathematicalExpression | TelegramBotApiRichTextUrl | TelegramBotApiRichTextEmailAddress | TelegramBotApiRichTextPhoneNumber | TelegramBotApiRichTextBankCardNumber | TelegramBotApiRichTextMention | TelegramBotApiRichTextHashtag | TelegramBotApiRichTextCashtag | TelegramBotApiRichTextBotCommand | TelegramBotApiRichTextButton | TelegramBotApiRichTextAnchor | TelegramBotApiRichTextAnchorLink | TelegramBotApiRichTextReference | TelegramBotApiRichTextReferenceLink;

export type TelegramBotApiBotCommandScope = TelegramBotApiBotCommandScopeDefault | TelegramBotApiBotCommandScopeAllPrivateChats | TelegramBotApiBotCommandScopeAllGroupChats | TelegramBotApiBotCommandScopeAllChatAdministrators | TelegramBotApiBotCommandScopeChat | TelegramBotApiBotCommandScopeChatAdministrators | TelegramBotApiBotCommandScopeChatMember;
export type TelegramBotApiInlineQueryResult = TelegramBotApiInlineQueryResultCachedAudio | TelegramBotApiInlineQueryResultCachedDocument | TelegramBotApiInlineQueryResultCachedGif | TelegramBotApiInlineQueryResultCachedMpeg4Gif | TelegramBotApiInlineQueryResultCachedPhoto | TelegramBotApiInlineQueryResultCachedSticker | TelegramBotApiInlineQueryResultCachedVideo | TelegramBotApiInlineQueryResultCachedVoice | TelegramBotApiInlineQueryResultArticle | TelegramBotApiInlineQueryResultAudio | TelegramBotApiInlineQueryResultContact | TelegramBotApiInlineQueryResultGame | TelegramBotApiInlineQueryResultDocument | TelegramBotApiInlineQueryResultGif | TelegramBotApiInlineQueryResultLocation | TelegramBotApiInlineQueryResultMpeg4Gif | TelegramBotApiInlineQueryResultPhoto | TelegramBotApiInlineQueryResultVenue | TelegramBotApiInlineQueryResultVideo | TelegramBotApiInlineQueryResultVoice;
export type TelegramBotApiInputMedia = TelegramBotApiInputMediaAnimation | TelegramBotApiInputMediaAudio | TelegramBotApiInputMediaDocument | TelegramBotApiInputMediaLivePhoto | TelegramBotApiInputMediaPhoto | TelegramBotApiInputMediaVideo;
export type TelegramBotApiInputPaidMedia = TelegramBotApiInputPaidMediaLivePhoto | TelegramBotApiInputPaidMediaPhoto | TelegramBotApiInputPaidMediaVideo;
export type TelegramBotApiInputPollMedia = TelegramBotApiInputMediaAnimation | TelegramBotApiInputMediaAudio | TelegramBotApiInputMediaDocument | TelegramBotApiInputMediaLivePhoto | TelegramBotApiInputMediaLocation | TelegramBotApiInputMediaPhoto | TelegramBotApiInputMediaVenue | TelegramBotApiInputMediaVideo;
export type TelegramBotApiInputProfilePhoto = TelegramBotApiInputProfilePhotoStatic | TelegramBotApiInputProfilePhotoAnimated;
export type TelegramBotApiInputStoryContent = TelegramBotApiInputStoryContentPhoto | TelegramBotApiInputStoryContentVideo;
export type TelegramBotApiMenuButton = TelegramBotApiMenuButtonCommands | TelegramBotApiMenuButtonWebApp | TelegramBotApiMenuButtonDefault;
export type TelegramBotApiPassportElementError = TelegramBotApiPassportElementErrorDataField | TelegramBotApiPassportElementErrorFrontSide | TelegramBotApiPassportElementErrorReverseSide | TelegramBotApiPassportElementErrorSelfie | TelegramBotApiPassportElementErrorFile | TelegramBotApiPassportElementErrorFiles | TelegramBotApiPassportElementErrorTranslationFile | TelegramBotApiPassportElementErrorTranslationFiles | TelegramBotApiPassportElementErrorUnspecified;

export interface TelegramBotApiTypeMap {
  Update: TelegramBotApiUpdate;
  WebhookInfo: TelegramBotApiWebhookInfo;
  User: TelegramBotApiUser;
  Chat: TelegramBotApiChat;
  ChatFullInfo: TelegramBotApiChatFullInfo;
  Message: TelegramBotApiMessage;
  MessageId: TelegramBotApiMessageId;
  InaccessibleMessage: TelegramBotApiInaccessibleMessage;
  MessageEntity: TelegramBotApiMessageEntity;
  TextQuote: TelegramBotApiTextQuote;
  ExternalReplyInfo: TelegramBotApiExternalReplyInfo;
  ReplyParameters: TelegramBotApiReplyParameters;
  EphemeralMessageParameters: TelegramBotApiEphemeralMessageParameters;
  MessageOriginUser: TelegramBotApiMessageOriginUser;
  MessageOriginHiddenUser: TelegramBotApiMessageOriginHiddenUser;
  MessageOriginChat: TelegramBotApiMessageOriginChat;
  MessageOriginChannel: TelegramBotApiMessageOriginChannel;
  PhotoSize: TelegramBotApiPhotoSize;
  Animation: TelegramBotApiAnimation;
  Audio: TelegramBotApiAudio;
  Document: TelegramBotApiDocument;
  LivePhoto: TelegramBotApiLivePhoto;
  Story: TelegramBotApiStory;
  VideoQuality: TelegramBotApiVideoQuality;
  Video: TelegramBotApiVideo;
  VideoNote: TelegramBotApiVideoNote;
  Voice: TelegramBotApiVoice;
  PaidMediaInfo: TelegramBotApiPaidMediaInfo;
  PaidMediaLivePhoto: TelegramBotApiPaidMediaLivePhoto;
  PaidMediaPhoto: TelegramBotApiPaidMediaPhoto;
  PaidMediaPreview: TelegramBotApiPaidMediaPreview;
  PaidMediaVideo: TelegramBotApiPaidMediaVideo;
  Contact: TelegramBotApiContact;
  Dice: TelegramBotApiDice;
  Link: TelegramBotApiLink;
  PollMedia: TelegramBotApiPollMedia;
  PollOption: TelegramBotApiPollOption;
  InputPollOption: TelegramBotApiInputPollOption;
  PollAnswer: TelegramBotApiPollAnswer;
  Poll: TelegramBotApiPoll;
  ChecklistTask: TelegramBotApiChecklistTask;
  Checklist: TelegramBotApiChecklist;
  InputChecklistTask: TelegramBotApiInputChecklistTask;
  InputChecklist: TelegramBotApiInputChecklist;
  Location: TelegramBotApiLocation;
  Venue: TelegramBotApiVenue;
  WebAppData: TelegramBotApiWebAppData;
  ProximityAlertTriggered: TelegramBotApiProximityAlertTriggered;
  MessageAutoDeleteTimerChanged: TelegramBotApiMessageAutoDeleteTimerChanged;
  ManagedBotCreated: TelegramBotApiManagedBotCreated;
  ManagedBotUpdated: TelegramBotApiManagedBotUpdated;
  BotSubscriptionUpdated: TelegramBotApiBotSubscriptionUpdated;
  MessageGenerationStopped: TelegramBotApiMessageGenerationStopped;
  PollOptionAdded: TelegramBotApiPollOptionAdded;
  PollOptionDeleted: TelegramBotApiPollOptionDeleted;
  ChatBoostAdded: TelegramBotApiChatBoostAdded;
  BackgroundFillSolid: TelegramBotApiBackgroundFillSolid;
  BackgroundFillGradient: TelegramBotApiBackgroundFillGradient;
  BackgroundFillFreeformGradient: TelegramBotApiBackgroundFillFreeformGradient;
  BackgroundTypeFill: TelegramBotApiBackgroundTypeFill;
  BackgroundTypeWallpaper: TelegramBotApiBackgroundTypeWallpaper;
  BackgroundTypePattern: TelegramBotApiBackgroundTypePattern;
  BackgroundTypeChatTheme: TelegramBotApiBackgroundTypeChatTheme;
  ChatBackground: TelegramBotApiChatBackground;
  ChecklistTasksDone: TelegramBotApiChecklistTasksDone;
  ChecklistTasksAdded: TelegramBotApiChecklistTasksAdded;
  CommunityChatAdded: TelegramBotApiCommunityChatAdded;
  CommunityChatJoined: TelegramBotApiCommunityChatJoined;
  ForumTopicCreated: TelegramBotApiForumTopicCreated;
  ForumTopicEdited: TelegramBotApiForumTopicEdited;
  SharedUser: TelegramBotApiSharedUser;
  UsersShared: TelegramBotApiUsersShared;
  ChatShared: TelegramBotApiChatShared;
  WriteAccessAllowed: TelegramBotApiWriteAccessAllowed;
  VideoChatScheduled: TelegramBotApiVideoChatScheduled;
  VideoChatEnded: TelegramBotApiVideoChatEnded;
  VideoChatParticipantsInvited: TelegramBotApiVideoChatParticipantsInvited;
  PaidMessagePriceChanged: TelegramBotApiPaidMessagePriceChanged;
  DirectMessagePriceChanged: TelegramBotApiDirectMessagePriceChanged;
  SuggestedPostApproved: TelegramBotApiSuggestedPostApproved;
  SuggestedPostApprovalFailed: TelegramBotApiSuggestedPostApprovalFailed;
  SuggestedPostDeclined: TelegramBotApiSuggestedPostDeclined;
  SuggestedPostPaid: TelegramBotApiSuggestedPostPaid;
  SuggestedPostRefunded: TelegramBotApiSuggestedPostRefunded;
  GiveawayCreated: TelegramBotApiGiveawayCreated;
  Giveaway: TelegramBotApiGiveaway;
  GiveawayWinners: TelegramBotApiGiveawayWinners;
  GiveawayCompleted: TelegramBotApiGiveawayCompleted;
  LinkPreviewOptions: TelegramBotApiLinkPreviewOptions;
  SuggestedPostPrice: TelegramBotApiSuggestedPostPrice;
  SuggestedPostInfo: TelegramBotApiSuggestedPostInfo;
  SuggestedPostParameters: TelegramBotApiSuggestedPostParameters;
  DirectMessagesTopic: TelegramBotApiDirectMessagesTopic;
  UserProfilePhotos: TelegramBotApiUserProfilePhotos;
  UserProfileAudios: TelegramBotApiUserProfileAudios;
  File: TelegramBotApiFile;
  WebAppInfo: TelegramBotApiWebAppInfo;
  ReplyKeyboardMarkup: TelegramBotApiReplyKeyboardMarkup;
  KeyboardButton: TelegramBotApiKeyboardButton;
  KeyboardButtonRequestUsers: TelegramBotApiKeyboardButtonRequestUsers;
  KeyboardButtonRequestChat: TelegramBotApiKeyboardButtonRequestChat;
  KeyboardButtonRequestManagedBot: TelegramBotApiKeyboardButtonRequestManagedBot;
  KeyboardButtonPollType: TelegramBotApiKeyboardButtonPollType;
  ReplyKeyboardRemove: TelegramBotApiReplyKeyboardRemove;
  InlineKeyboardMarkup: TelegramBotApiInlineKeyboardMarkup;
  InlineKeyboardButton: TelegramBotApiInlineKeyboardButton;
  LoginUrl: TelegramBotApiLoginUrl;
  SwitchInlineQueryChosenChat: TelegramBotApiSwitchInlineQueryChosenChat;
  CopyTextButton: TelegramBotApiCopyTextButton;
  CallbackQuery: TelegramBotApiCallbackQuery;
  ForceReply: TelegramBotApiForceReply;
  Community: TelegramBotApiCommunity;
  ChatPhoto: TelegramBotApiChatPhoto;
  ChatInviteLink: TelegramBotApiChatInviteLink;
  ChatAdministratorRights: TelegramBotApiChatAdministratorRights;
  ChatMemberUpdated: TelegramBotApiChatMemberUpdated;
  ChatMemberOwner: TelegramBotApiChatMemberOwner;
  ChatMemberAdministrator: TelegramBotApiChatMemberAdministrator;
  ChatMemberMember: TelegramBotApiChatMemberMember;
  ChatMemberRestricted: TelegramBotApiChatMemberRestricted;
  ChatMemberLeft: TelegramBotApiChatMemberLeft;
  ChatMemberBanned: TelegramBotApiChatMemberBanned;
  ChatJoinRequest: TelegramBotApiChatJoinRequest;
  ChatPermissions: TelegramBotApiChatPermissions;
  Birthdate: TelegramBotApiBirthdate;
  BusinessIntro: TelegramBotApiBusinessIntro;
  BusinessLocation: TelegramBotApiBusinessLocation;
  BusinessOpeningHoursInterval: TelegramBotApiBusinessOpeningHoursInterval;
  BusinessOpeningHours: TelegramBotApiBusinessOpeningHours;
  UserRating: TelegramBotApiUserRating;
  StoryAreaPosition: TelegramBotApiStoryAreaPosition;
  LocationAddress: TelegramBotApiLocationAddress;
  StoryAreaTypeLocation: TelegramBotApiStoryAreaTypeLocation;
  StoryAreaTypeSuggestedReaction: TelegramBotApiStoryAreaTypeSuggestedReaction;
  StoryAreaTypeLink: TelegramBotApiStoryAreaTypeLink;
  StoryAreaTypeWeather: TelegramBotApiStoryAreaTypeWeather;
  StoryAreaTypeUniqueGift: TelegramBotApiStoryAreaTypeUniqueGift;
  StoryArea: TelegramBotApiStoryArea;
  ChatLocation: TelegramBotApiChatLocation;
  ReactionTypeEmoji: TelegramBotApiReactionTypeEmoji;
  ReactionTypeCustomEmoji: TelegramBotApiReactionTypeCustomEmoji;
  ReactionTypePaid: TelegramBotApiReactionTypePaid;
  ReactionCount: TelegramBotApiReactionCount;
  MessageReactionUpdated: TelegramBotApiMessageReactionUpdated;
  MessageReactionCountUpdated: TelegramBotApiMessageReactionCountUpdated;
  ForumTopic: TelegramBotApiForumTopic;
  GiftBackground: TelegramBotApiGiftBackground;
  Gift: TelegramBotApiGift;
  Gifts: TelegramBotApiGifts;
  UniqueGiftModel: TelegramBotApiUniqueGiftModel;
  UniqueGiftSymbol: TelegramBotApiUniqueGiftSymbol;
  UniqueGiftBackdropColors: TelegramBotApiUniqueGiftBackdropColors;
  UniqueGiftBackdrop: TelegramBotApiUniqueGiftBackdrop;
  UniqueGiftColors: TelegramBotApiUniqueGiftColors;
  UniqueGift: TelegramBotApiUniqueGift;
  GiftInfo: TelegramBotApiGiftInfo;
  UniqueGiftInfo: TelegramBotApiUniqueGiftInfo;
  OwnedGiftRegular: TelegramBotApiOwnedGiftRegular;
  OwnedGiftUnique: TelegramBotApiOwnedGiftUnique;
  OwnedGifts: TelegramBotApiOwnedGifts;
  BotAccessSettings: TelegramBotApiBotAccessSettings;
  AcceptedGiftTypes: TelegramBotApiAcceptedGiftTypes;
  StarAmount: TelegramBotApiStarAmount;
  BotCommand: TelegramBotApiBotCommand;
  BotCommandScopeDefault: TelegramBotApiBotCommandScopeDefault;
  BotCommandScopeAllPrivateChats: TelegramBotApiBotCommandScopeAllPrivateChats;
  BotCommandScopeAllGroupChats: TelegramBotApiBotCommandScopeAllGroupChats;
  BotCommandScopeAllChatAdministrators: TelegramBotApiBotCommandScopeAllChatAdministrators;
  BotCommandScopeChat: TelegramBotApiBotCommandScopeChat;
  BotCommandScopeChatAdministrators: TelegramBotApiBotCommandScopeChatAdministrators;
  BotCommandScopeChatMember: TelegramBotApiBotCommandScopeChatMember;
  BotName: TelegramBotApiBotName;
  BotDescription: TelegramBotApiBotDescription;
  BotShortDescription: TelegramBotApiBotShortDescription;
  MenuButtonCommands: TelegramBotApiMenuButtonCommands;
  MenuButtonWebApp: TelegramBotApiMenuButtonWebApp;
  MenuButtonDefault: TelegramBotApiMenuButtonDefault;
  ChatBoostSourcePremium: TelegramBotApiChatBoostSourcePremium;
  ChatBoostSourceGiftCode: TelegramBotApiChatBoostSourceGiftCode;
  ChatBoostSourceGiveaway: TelegramBotApiChatBoostSourceGiveaway;
  ChatBoost: TelegramBotApiChatBoost;
  ChatBoostUpdated: TelegramBotApiChatBoostUpdated;
  ChatBoostRemoved: TelegramBotApiChatBoostRemoved;
  ChatOwnerLeft: TelegramBotApiChatOwnerLeft;
  ChatOwnerChanged: TelegramBotApiChatOwnerChanged;
  UserChatBoosts: TelegramBotApiUserChatBoosts;
  BusinessBotRights: TelegramBotApiBusinessBotRights;
  BusinessConnection: TelegramBotApiBusinessConnection;
  BusinessMessagesDeleted: TelegramBotApiBusinessMessagesDeleted;
  SentWebAppMessage: TelegramBotApiSentWebAppMessage;
  SentGuestMessage: TelegramBotApiSentGuestMessage;
  PreparedInlineMessage: TelegramBotApiPreparedInlineMessage;
  PreparedKeyboardButton: TelegramBotApiPreparedKeyboardButton;
  ResponseParameters: TelegramBotApiResponseParameters;
  InputMediaAnimation: TelegramBotApiInputMediaAnimation;
  InputMediaAudio: TelegramBotApiInputMediaAudio;
  InputMediaDocument: TelegramBotApiInputMediaDocument;
  InputMediaLink: TelegramBotApiInputMediaLink;
  InputMediaLivePhoto: TelegramBotApiInputMediaLivePhoto;
  InputMediaLocation: TelegramBotApiInputMediaLocation;
  InputMediaPhoto: TelegramBotApiInputMediaPhoto;
  InputMediaSticker: TelegramBotApiInputMediaSticker;
  InputMediaVenue: TelegramBotApiInputMediaVenue;
  InputMediaVideo: TelegramBotApiInputMediaVideo;
  InputMediaVoiceNote: TelegramBotApiInputMediaVoiceNote;
  InputPaidMediaLivePhoto: TelegramBotApiInputPaidMediaLivePhoto;
  InputPaidMediaPhoto: TelegramBotApiInputPaidMediaPhoto;
  InputPaidMediaVideo: TelegramBotApiInputPaidMediaVideo;
  InputProfilePhotoStatic: TelegramBotApiInputProfilePhotoStatic;
  InputProfilePhotoAnimated: TelegramBotApiInputProfilePhotoAnimated;
  InputStoryContentPhoto: TelegramBotApiInputStoryContentPhoto;
  InputStoryContentVideo: TelegramBotApiInputStoryContentVideo;
  Sticker: TelegramBotApiSticker;
  StickerSet: TelegramBotApiStickerSet;
  MaskPosition: TelegramBotApiMaskPosition;
  InputSticker: TelegramBotApiInputSticker;
  RichMessage: TelegramBotApiRichMessage;
  InputRichMessage: TelegramBotApiInputRichMessage;
  InputRichMessageMedia: TelegramBotApiInputRichMessageMedia;
  RichMessageButton: TelegramBotApiRichMessageButton;
  RichTextBold: TelegramBotApiRichTextBold;
  RichTextItalic: TelegramBotApiRichTextItalic;
  RichTextUnderline: TelegramBotApiRichTextUnderline;
  RichTextStrikethrough: TelegramBotApiRichTextStrikethrough;
  RichTextSpoiler: TelegramBotApiRichTextSpoiler;
  RichTextDateTime: TelegramBotApiRichTextDateTime;
  RichTextTextMention: TelegramBotApiRichTextTextMention;
  RichTextSubscript: TelegramBotApiRichTextSubscript;
  RichTextSuperscript: TelegramBotApiRichTextSuperscript;
  RichTextMarked: TelegramBotApiRichTextMarked;
  RichTextCode: TelegramBotApiRichTextCode;
  RichTextCustomEmoji: TelegramBotApiRichTextCustomEmoji;
  RichTextMathematicalExpression: TelegramBotApiRichTextMathematicalExpression;
  RichTextUrl: TelegramBotApiRichTextUrl;
  RichTextEmailAddress: TelegramBotApiRichTextEmailAddress;
  RichTextPhoneNumber: TelegramBotApiRichTextPhoneNumber;
  RichTextBankCardNumber: TelegramBotApiRichTextBankCardNumber;
  RichTextMention: TelegramBotApiRichTextMention;
  RichTextHashtag: TelegramBotApiRichTextHashtag;
  RichTextCashtag: TelegramBotApiRichTextCashtag;
  RichTextBotCommand: TelegramBotApiRichTextBotCommand;
  RichTextButton: TelegramBotApiRichTextButton;
  RichTextAnchor: TelegramBotApiRichTextAnchor;
  RichTextAnchorLink: TelegramBotApiRichTextAnchorLink;
  RichTextReference: TelegramBotApiRichTextReference;
  RichTextReferenceLink: TelegramBotApiRichTextReferenceLink;
  RichBlockCaption: TelegramBotApiRichBlockCaption;
  RichBlockTableCell: TelegramBotApiRichBlockTableCell;
  RichBlockListItem: TelegramBotApiRichBlockListItem;
  RichBlockParagraph: TelegramBotApiRichBlockParagraph;
  RichBlockSectionHeading: TelegramBotApiRichBlockSectionHeading;
  RichBlockPreformatted: TelegramBotApiRichBlockPreformatted;
  RichBlockFooter: TelegramBotApiRichBlockFooter;
  RichBlockDivider: TelegramBotApiRichBlockDivider;
  RichBlockMathematicalExpression: TelegramBotApiRichBlockMathematicalExpression;
  RichBlockAnchor: TelegramBotApiRichBlockAnchor;
  RichBlockList: TelegramBotApiRichBlockList;
  RichBlockBlockQuotation: TelegramBotApiRichBlockBlockQuotation;
  RichBlockExpandableBlockQuotation: TelegramBotApiRichBlockExpandableBlockQuotation;
  RichBlockPullQuotation: TelegramBotApiRichBlockPullQuotation;
  RichBlockCollage: TelegramBotApiRichBlockCollage;
  RichBlockSlideshow: TelegramBotApiRichBlockSlideshow;
  RichBlockTable: TelegramBotApiRichBlockTable;
  RichBlockDetails: TelegramBotApiRichBlockDetails;
  RichBlockMap: TelegramBotApiRichBlockMap;
  RichBlockButtons: TelegramBotApiRichBlockButtons;
  RichBlockAnimation: TelegramBotApiRichBlockAnimation;
  RichBlockAudio: TelegramBotApiRichBlockAudio;
  RichBlockDocument: TelegramBotApiRichBlockDocument;
  RichBlockPhoto: TelegramBotApiRichBlockPhoto;
  RichBlockVideo: TelegramBotApiRichBlockVideo;
  RichBlockVoiceNote: TelegramBotApiRichBlockVoiceNote;
  RichBlockThinking: TelegramBotApiRichBlockThinking;
  InputRichBlockListItem: TelegramBotApiInputRichBlockListItem;
  InputRichBlockParagraph: TelegramBotApiInputRichBlockParagraph;
  InputRichBlockSectionHeading: TelegramBotApiInputRichBlockSectionHeading;
  InputRichBlockPreformatted: TelegramBotApiInputRichBlockPreformatted;
  InputRichBlockFooter: TelegramBotApiInputRichBlockFooter;
  InputRichBlockDivider: TelegramBotApiInputRichBlockDivider;
  InputRichBlockMathematicalExpression: TelegramBotApiInputRichBlockMathematicalExpression;
  InputRichBlockAnchor: TelegramBotApiInputRichBlockAnchor;
  InputRichBlockList: TelegramBotApiInputRichBlockList;
  InputRichBlockBlockQuotation: TelegramBotApiInputRichBlockBlockQuotation;
  InputRichBlockExpandableBlockQuotation: TelegramBotApiInputRichBlockExpandableBlockQuotation;
  InputRichBlockPullQuotation: TelegramBotApiInputRichBlockPullQuotation;
  InputRichBlockCollage: TelegramBotApiInputRichBlockCollage;
  InputRichBlockSlideshow: TelegramBotApiInputRichBlockSlideshow;
  InputRichBlockTable: TelegramBotApiInputRichBlockTable;
  InputRichBlockDetails: TelegramBotApiInputRichBlockDetails;
  InputRichBlockMap: TelegramBotApiInputRichBlockMap;
  InputRichBlockButtons: TelegramBotApiInputRichBlockButtons;
  InputRichBlockAnimation: TelegramBotApiInputRichBlockAnimation;
  InputRichBlockAudio: TelegramBotApiInputRichBlockAudio;
  InputRichBlockDocument: TelegramBotApiInputRichBlockDocument;
  InputRichBlockPhoto: TelegramBotApiInputRichBlockPhoto;
  InputRichBlockVideo: TelegramBotApiInputRichBlockVideo;
  InputRichBlockVoiceNote: TelegramBotApiInputRichBlockVoiceNote;
  InputRichBlockThinking: TelegramBotApiInputRichBlockThinking;
  InlineQuery: TelegramBotApiInlineQuery;
  InlineQueryResultsButton: TelegramBotApiInlineQueryResultsButton;
  InlineQueryResultArticle: TelegramBotApiInlineQueryResultArticle;
  InlineQueryResultPhoto: TelegramBotApiInlineQueryResultPhoto;
  InlineQueryResultGif: TelegramBotApiInlineQueryResultGif;
  InlineQueryResultMpeg4Gif: TelegramBotApiInlineQueryResultMpeg4Gif;
  InlineQueryResultVideo: TelegramBotApiInlineQueryResultVideo;
  InlineQueryResultAudio: TelegramBotApiInlineQueryResultAudio;
  InlineQueryResultVoice: TelegramBotApiInlineQueryResultVoice;
  InlineQueryResultDocument: TelegramBotApiInlineQueryResultDocument;
  InlineQueryResultLocation: TelegramBotApiInlineQueryResultLocation;
  InlineQueryResultVenue: TelegramBotApiInlineQueryResultVenue;
  InlineQueryResultContact: TelegramBotApiInlineQueryResultContact;
  InlineQueryResultGame: TelegramBotApiInlineQueryResultGame;
  InlineQueryResultCachedPhoto: TelegramBotApiInlineQueryResultCachedPhoto;
  InlineQueryResultCachedGif: TelegramBotApiInlineQueryResultCachedGif;
  InlineQueryResultCachedMpeg4Gif: TelegramBotApiInlineQueryResultCachedMpeg4Gif;
  InlineQueryResultCachedSticker: TelegramBotApiInlineQueryResultCachedSticker;
  InlineQueryResultCachedDocument: TelegramBotApiInlineQueryResultCachedDocument;
  InlineQueryResultCachedVideo: TelegramBotApiInlineQueryResultCachedVideo;
  InlineQueryResultCachedVoice: TelegramBotApiInlineQueryResultCachedVoice;
  InlineQueryResultCachedAudio: TelegramBotApiInlineQueryResultCachedAudio;
  InputTextMessageContent: TelegramBotApiInputTextMessageContent;
  InputRichMessageContent: TelegramBotApiInputRichMessageContent;
  InputLocationMessageContent: TelegramBotApiInputLocationMessageContent;
  InputVenueMessageContent: TelegramBotApiInputVenueMessageContent;
  InputContactMessageContent: TelegramBotApiInputContactMessageContent;
  InputInvoiceMessageContent: TelegramBotApiInputInvoiceMessageContent;
  ChosenInlineResult: TelegramBotApiChosenInlineResult;
  LabeledPrice: TelegramBotApiLabeledPrice;
  Invoice: TelegramBotApiInvoice;
  ShippingAddress: TelegramBotApiShippingAddress;
  OrderInfo: TelegramBotApiOrderInfo;
  ShippingOption: TelegramBotApiShippingOption;
  SuccessfulPayment: TelegramBotApiSuccessfulPayment;
  RefundedPayment: TelegramBotApiRefundedPayment;
  ShippingQuery: TelegramBotApiShippingQuery;
  PreCheckoutQuery: TelegramBotApiPreCheckoutQuery;
  PaidMediaPurchased: TelegramBotApiPaidMediaPurchased;
  RevenueWithdrawalStatePending: TelegramBotApiRevenueWithdrawalStatePending;
  RevenueWithdrawalStateSucceeded: TelegramBotApiRevenueWithdrawalStateSucceeded;
  RevenueWithdrawalStateFailed: TelegramBotApiRevenueWithdrawalStateFailed;
  AffiliateInfo: TelegramBotApiAffiliateInfo;
  TransactionPartnerUser: TelegramBotApiTransactionPartnerUser;
  TransactionPartnerChat: TelegramBotApiTransactionPartnerChat;
  TransactionPartnerAffiliateProgram: TelegramBotApiTransactionPartnerAffiliateProgram;
  TransactionPartnerFragment: TelegramBotApiTransactionPartnerFragment;
  TransactionPartnerTelegramAds: TelegramBotApiTransactionPartnerTelegramAds;
  TransactionPartnerTelegramApi: TelegramBotApiTransactionPartnerTelegramApi;
  TransactionPartnerOther: TelegramBotApiTransactionPartnerOther;
  StarTransaction: TelegramBotApiStarTransaction;
  StarTransactions: TelegramBotApiStarTransactions;
  PassportData: TelegramBotApiPassportData;
  PassportFile: TelegramBotApiPassportFile;
  EncryptedPassportElement: TelegramBotApiEncryptedPassportElement;
  EncryptedCredentials: TelegramBotApiEncryptedCredentials;
  PassportElementErrorDataField: TelegramBotApiPassportElementErrorDataField;
  PassportElementErrorFrontSide: TelegramBotApiPassportElementErrorFrontSide;
  PassportElementErrorReverseSide: TelegramBotApiPassportElementErrorReverseSide;
  PassportElementErrorSelfie: TelegramBotApiPassportElementErrorSelfie;
  PassportElementErrorFile: TelegramBotApiPassportElementErrorFile;
  PassportElementErrorFiles: TelegramBotApiPassportElementErrorFiles;
  PassportElementErrorTranslationFile: TelegramBotApiPassportElementErrorTranslationFile;
  PassportElementErrorTranslationFiles: TelegramBotApiPassportElementErrorTranslationFiles;
  PassportElementErrorUnspecified: TelegramBotApiPassportElementErrorUnspecified;
  Game: TelegramBotApiGame;
  GameHighScore: TelegramBotApiGameHighScore;
  BackgroundFill: TelegramBotApiBackgroundFill;
  BackgroundType: TelegramBotApiBackgroundType;
  ChatBoostSource: TelegramBotApiChatBoostSource;
  ChatMember: TelegramBotApiChatMember;
  InputMessageContent: TelegramBotApiInputMessageContent;
  InputPollOptionMedia: TelegramBotApiInputPollOptionMedia;
  InputRichBlock: TelegramBotApiInputRichBlock;
  MaybeInaccessibleMessage: TelegramBotApiMaybeInaccessibleMessage;
  MessageOrigin: TelegramBotApiMessageOrigin;
  OwnedGift: TelegramBotApiOwnedGift;
  PaidMedia: TelegramBotApiPaidMedia;
  ReactionType: TelegramBotApiReactionType;
  RevenueWithdrawalState: TelegramBotApiRevenueWithdrawalState;
  RichBlock: TelegramBotApiRichBlock;
  StoryAreaType: TelegramBotApiStoryAreaType;
  TransactionPartner: TelegramBotApiTransactionPartner;
  CallbackGame: TelegramBotApiCallbackGame;
  CommunityChatRemoved: TelegramBotApiCommunityChatRemoved;
  DisabledButton: TelegramBotApiDisabledButton;
  ForumTopicClosed: TelegramBotApiForumTopicClosed;
  ForumTopicReopened: TelegramBotApiForumTopicReopened;
  GeneralForumTopicHidden: TelegramBotApiGeneralForumTopicHidden;
  GeneralForumTopicUnhidden: TelegramBotApiGeneralForumTopicUnhidden;
  VideoChatStarted: TelegramBotApiVideoChatStarted;
  RichText: TelegramBotApiRichText;
  BotCommandScope: TelegramBotApiBotCommandScope;
  InlineQueryResult: TelegramBotApiInlineQueryResult;
  InputMedia: TelegramBotApiInputMedia;
  InputPaidMedia: TelegramBotApiInputPaidMedia;
  InputPollMedia: TelegramBotApiInputPollMedia;
  InputProfilePhoto: TelegramBotApiInputProfilePhoto;
  InputStoryContent: TelegramBotApiInputStoryContent;
  MenuButton: TelegramBotApiMenuButton;
  PassportElementError: TelegramBotApiPassportElementError;
}

export type TelegramBotApiType<Name extends string> = Name extends keyof TelegramBotApiTypeMap ? TelegramBotApiTypeMap[Name] : Record<string, unknown>;
