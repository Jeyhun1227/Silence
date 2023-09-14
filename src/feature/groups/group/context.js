import { useUser } from "feature/auth/context";
import { createContext, useContext, useState } from "react";
import * as postApi from "@api/posts";
import { useRouter } from "next/router";

const GroupContext = createContext(null);

const GroupProvider = ({ children }) => {
  const group = useGroupProvider();
  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>;
};

export const useChat = () => {
  const groupContext = useContext(GroupContext);
  if (!groupContext) {
    throw new Error("groupContext has to be used within <GroupContext.Provider>");
  }
  return groupContext;
};

export const useGroupProvider = () => {
  const [posts, setPosts] = useState([]);
  const user = useUser();
  const router = useRouter();
  const { id: groupId } = router.query;

  const getPosts = async (page = 1) => {
    const { data, error } = await postApi.getPostsByGroup(groupId, page);
  };
};

export default GroupProvider;
