import { useQuery } from "@tanstack/react-query";
import apiClient from "services/api-client";

export const useUser = (id, open) => {
  const userQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => apiClient.get(`/users/${id}/summery`),
    select: (data) => data.data,
    enabled: !!open,
  });

  return userQuery;
};
