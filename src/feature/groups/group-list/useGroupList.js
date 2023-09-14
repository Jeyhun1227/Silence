import { useEffect, useState } from "react";
import * as postApi from "@api/post";
import { useUser } from "feature/auth/context";

export const useGroupList = () => {
  const [groups, setGroups] = useState([]);
  const user = useUser();

  const handleJoin = async (groupId) => {
    const { data, error } = await postApi.acceptGroupInvitation(user.id, groupId);

    if (!error) {
      setGroups(groups.map((group) => (group.id === groupId ? { ...group, isAccepted: true } : group)));
    }
  };

  const handleDecline = async (groupId) => {
    const { data, error } = await postApi.declineGroupInvitation(user.id, groupId);
    if (!error) {
      setGroups(groups.filter((group) => group.id !== groupId));
    }
  };

  useEffect(() => {
    const get = async () => {
      const { data, error } = await postApi.getGroupsByUserId(user?.id);

      setGroups(
        data.map((item) => ({
          name: item.name,
          id: item.id,
          isAccepted: item?.userPostGroup[0]?.isAccepted,
          postCount: item.postCount[0]?.count || 0,
          userCount: item.userCount[0]?.count || 0,
          users: item.users.map((user) => ({
            firstName: user.user.firstName,
            image: user.user.image,
            avatar: user.user.avatar,
          })),
          categoryName: item.category.name,
        }))
      );
    };

    get();
  }, []);

  return { groups, handleJoin, handleDecline };
};
