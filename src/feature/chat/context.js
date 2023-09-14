import { createContext, useContext } from "react";
const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const chat = useChatProvider();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    throw new Error("chatContext has to be used within <ChatContext.Provider>");
  }
  return chatContext;
};

export const useChatProvider = () => {
  // const chatGroups = useQuery({
  //   queryKey: ["chat-groups"],
  //   queryFn: () => chatApi.getUserChatGroups(),
  //   select: (data) => data.data,
  //   refetchOnWindowFocus: false,
  // });

  // return { chatGroups };
};

export default ChatProvider;
