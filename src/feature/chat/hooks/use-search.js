import { useQuery } from "@tanstack/react-query";
import * as chatApi from "@api/chat";
import { useUser } from "feature/auth/context";
import useDebounce from "hooks/useDebounce";
export const useSearch = (searchText) => {
  const user = useUser();
  const debounceSearchText = useDebounce(searchText, 300);

  const searchQuery = useQuery({
    queryKey: ["chat-search", debounceSearchText],
    queryFn: () => chatApi.searchChat(user.id, debounceSearchText),
    refetchOnWindowFocus: false,
  });

  return searchQuery;
};
