import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as liveStreamApi from "@api/live-stream";

export const useNewComment = (liveStreamId) => {
  const queryClient = useQueryClient();

  const newCommentMutation = useMutation({
    mutationFn: async (data) => liveStreamApi.addComment(data),
    onError: (e) => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries(["live-stream-comments", liveStreamId]);
    },
  });

  return newCommentMutation;
};

export const useComments = (liveStreamId, showComments) => {
  const commentsQuery = useQuery({
    queryKey: ["live-stream-comments", liveStreamId],
    queryFn: () => liveStreamApi.getComments(liveStreamId),
    select: (data) => data.data,
    enabled: !!showComments,
  });

  return commentsQuery;
};
