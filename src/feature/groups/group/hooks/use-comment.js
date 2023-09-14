import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as postApi from "@api/post";
import * as fileApi from "@api/file";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import generateUniqueTimeString from "constants/random";

export const useComment = async (postId) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // const mentions = data.content.root.children[0].children.filter((item) => item.type === "mention");
  // if (mentions.length > 0) {
  //   const mentionIds = mentions.map((mention) => mention.mention.id);
  //   await notificationApi.sendCommentNotification(user.id, mentionIds);
  // }

  const comment = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => postApi.getCommentsByPost(postId, pageParam),
    select: (data) => ({
      pages: data.pages.map((item) => ({
        comments: item.data.map((comment) => ({
          ...comment,
          replyCount: comment.count,
          time: formatDistanceToNow(new Date(comment.createdAt))
        }))
      }))
    }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export const useCreateComment = (postId) => {
  const queryClient = useQueryClient();
  const createCommentMutation = useMutation({
    mutationFn: async (data) => {
      const media = [];
      for (let i = 0; i < data?.media?.length; i++) {
        const file = data.media[i];
        const fileName = generateUniqueTimeString(16);
        const { data: response, err } = await fileApi.uploadCommentImage(data.userId, data.postId, file, fileName);
        if (err) throw err;
        media.push(`${response.path}`);
      }
      delete data.files;
      await postApi.addComment({ userId: data.userId, postId: postId, parentCommentId: data.parentCommentId, content: data.content, media });
    },
    onError: (e) => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    }
  });
  return createCommentMutation;
}