import { useState, useEffect } from 'react';
import * as chatApi from '@api/chat';
import { useUser } from 'feature/auth/context';

export const useChatMessages = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useUser();

  const getUnreadChatGroups = async () => {
    const { data } = await chatApi.getUnreadChatGroups();
    setUnreadCount(data.length || 0);
  };

  useEffect(() => {
    chatApi.subscribeToUserChatMessages(user.id, () => {
      getUnreadChatGroups();
    });
  }, []);

  useEffect(() => {
    getUnreadChatGroups();
  }, []);

  return { unreadCount };
};
