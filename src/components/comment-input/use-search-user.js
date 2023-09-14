import { useQuery } from "@tanstack/react-query";
import * as userApi from "@api/user";

export const useSearchUser = (searchText) => {
  const searchUserQuery = useQuery({
    queryKey: ["users-search", searchText],
    enabled: !!searchText,
    queryFn: () => userApi.searchUserByName(searchText),
    select: (data) => data.data.map((user) => ({ name: `${user.firstName} ${user.lastName}`, id: user.id })),
    initialData: () => ({ data: [] }),
  });

  return searchUserQuery;
};
