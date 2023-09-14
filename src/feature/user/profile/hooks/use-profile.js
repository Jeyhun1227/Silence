import * as userApi from "@api/user";
import { useUser } from "feature/auth/context";
import { useQuery } from "@tanstack/react-query";
export const useProfile = () => {
  const user = useUser();

  const profileQuery = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => userApi.getUserById(user.id),
    select: (data) => data.data,
  });

  return { profileQuery };
};
