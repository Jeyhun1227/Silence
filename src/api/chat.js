import { supabase } from 'utils/superbase-client';
import { getPagination } from 'utils/pagination';

export const getMessages = (chatGroupId, page = 1) => {
  const { from, to } = getPagination(page, 10);
  return supabase
    .from('chat_messages')
    .select('*, user:users(firstName, id, avatar)', { count: 'exact' })
    .eq('chatGroupId', chatGroupId)
    .order('createdAt', { ascending: false })
    .range(from, to);
};

export const getMessagesByUserId = (chatGroupId, page = 1) => {
  const { from, to } = getPagination(page, 10);
  return supabase
    .from('chat_messages')
    .select('*, user:users(firstName,id), userGroup: user_group()', { count: 'exact' })
    .eq('chatGroupId', chatGroupId)
    .order('createdAt', { ascending: false })
    .range(from, to);
};

export const getChatGroupById = (id) => {
  return supabase
    .from('chat_groups')
    .select(
      'name,id,private, userChatGroups: user_chat_groups(user: users(id, firstName, lastName))'
    )
    .eq('id', id)
    .limit(2, { foreignTable: 'userChatGroups' });
};

export const sendMessage = (content, media, userId, chatGroupId) => {
  return supabase
    .from('chat_messages')
    .insert({
      content,
      media,
      userId,
      chatGroupId,
    })
    .throwOnError();
};

export const markAsRead = async (chatGroupId, userId) => {
  return supabase
    .from('chat_messages')
    .update({
      read: true,
    })
    .eq('chatGroupId', chatGroupId)
    .neq('userId', userId);
};

export const searchChat = async (userId, searchText) => {
  const groupSearchResponse = await supabase.rpc('search_chat_groups', {
    search_text: `%${searchText}%`,
  });

  if (groupSearchResponse.error) throw groupSearchResponse.error;

  let usersResponse;

  if (searchText) {
    const receiverIds = groupSearchResponse.data.map((group) => group.receiverId);
    receiverIds.push(userId);
    usersResponse = await supabase
      .from('users')
      .select('id, firstName, lastName, image')
      .or(
        `firstName.ilike.%${searchText}%, lastName.ilike.%${searchText}%, email.ilike.%${searchText}%`
      )
      .not('id', 'in', `(${receiverIds.join(',')})`);
  }

  return { groups: groupSearchResponse?.data || [], users: usersResponse?.data || [] };
};

export const getPrivateChatGroupByReceiver = (receiverId) => {
  return supabase.rpc('get_or_create_private_chat_group_by_receiver', { receiver_id: receiverId });
};

export const subscribeToChatGroupMessages = (chatGroupId, handleUpdateMessages) => {
  supabase
    .channel('public:chat_messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `chatGroupId=eq.${chatGroupId}`,
      },
      handleUpdateMessages
    )
    .subscribe();
};

export const subscribeToUserChatMessages = async (userId, handleUpdateMessages) => {
  const { data, error } = await supabase
    .from('user_chat_groups')
    .select('chatGroupId')
    .eq('userId', userId);

  const groups = data.map((item) => item.chatGroupId).join(',');

  supabase
    .channel('user-chat-messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `chatGroupId=in.(${groups})`,
      },
      handleUpdateMessages
    )
    .subscribe();
};

export const unsubscribeToMessages = () => {
  supabase.removeChannel('public:chat_messages');
};

export const getUnreadChatGroups = () => {
  return supabase.rpc('get_unread_chat_groups');
};
