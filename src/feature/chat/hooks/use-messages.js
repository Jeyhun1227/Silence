import { useEffect, useState } from 'react';
import * as chatApi from '@api/chat';
import { useQuery } from '@tanstack/react-query';
import { useUser } from 'feature/auth/context';

export const useMessages = (type, id) => {
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });

  const user = useUser();

  const chatGroup = useQuery({
    queryKey: ['chat-group', id],
    queryFn: () => chatApi.getPrivateChatGroupByReceiver(id),
    select: (data) => data.data,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const chatGroupId = chatGroup.data?.id;

  const getMessages = async (page = 1) => {
    const { data, count, error } = await chatApi.getMessages(chatGroupId, page);
    if (error) console.log(error);
    else {
      setPagination({ totalPages: Math.ceil(count / 10), currentPage: page });
      if (page === 1) setMessages(data);
      else setMessages([...messages, ...data]);
    }
  };

  const loadNext = () => {
    getMessages(pagination.currentPage + 1);
  };

  const handleUpdateMessages = (data) => {
    setMessages((state) => [{ ...data.new, user: { id: data.new.userId } }, ...state]);
  };

  useEffect(() => {
    const init = async () => {
      if (chatGroupId) {
        getMessages();
        await chatApi.markAsRead(chatGroupId, user.id);
      }
      chatApi.subscribeToChatGroupMessages(chatGroupId, handleUpdateMessages);
    };
    init();

    // return () => chatApi.unsubscribeToMessages();
  }, [chatGroupId]);

  return { messages, pagination, loadNext, chatGroup };
};
