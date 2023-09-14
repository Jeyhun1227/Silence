import { useQuery } from "@tanstack/react-query";
import * as postApi from "@api/post";

const formatComments = (data) => {
  const t = {};
  data.forEach((item) =>
    ((t[item.parentCommentId] ??= {}).replies ??= []).push(Object.assign((t[item.id] ??= {}), item))
  );
  return t[null]?.replies;
};

export const useComments = (postId, showComments) => {
  const commentsQuery = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => postApi.getCommentsByPost(postId),
    select: (data) => formatComments(data.data),
    enabled: true,
  });

  return commentsQuery;
};
