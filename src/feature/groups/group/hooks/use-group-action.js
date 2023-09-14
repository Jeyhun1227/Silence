import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as postApi from "@api/post";

export const useDeleteComment = (id, media) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => postApi.deleteComment(id, media),
    onSuccess: () => queryClient.invalidateQueries(["comments", id]),
  });
  return deleteMutation;
};

export const useDeletePost = (id, groupId) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => postApi.deletePost(postId, media),
    // optimize this by deleting local data instead of refetching again
    onSuccess: () => queryClient.invalidateQueries(["posts", groupId.toString()]),
  });

  return deleteMutation;
};
