import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as postApi from "@api/post";
import { useUser } from "feature/auth/context";

export const useGroup = () => {
  const router = useRouter();
  const { id: groupId } = router.query;

  const group = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => postApi.getGroupById(groupId),
    select: (data) => data.data,
  });

  return group;
};

export const useMembers = () => {
  const router = useRouter();
  const { id: groupId } = router.query;

  const user = useUser();

  const membersQuery = useQuery({
    queryKey: ["group-members", groupId],
    queryFn: () => postApi.getGroupMember(groupId, user.id),
    select: (data) => data.data.map((item) => ({ ...item.user, groupRole: item.role })),
  });

  return membersQuery;
};
