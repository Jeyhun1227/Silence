import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as postApi from "@api/post";
import * as fileApi from "@api/file";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export const usePosts = () => {
  const router = useRouter();
  const { id: groupId } = router.query;

  const post = useInfiniteQuery({
    queryKey: ["posts", groupId],
    queryFn: ({ pageParam }) => postApi.getPostsByGroup(groupId, pageParam),
    select: (data) => ({
      pages: data.pages.map((item) => ({
        posts: item.data.map((post) => ({
          ...post,
          commentCount: post.comments[0].count,
          time: formatDistanceToNow(new Date(post.createdAt)),
        })),
      })),
    }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return post;
};

export const useCreatePost = (groupId) => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (data) => {
      const media = [];
      for (let i = 0; i < data.files.length; i++) {
        const file = data.files[i];
        const { data: response, error } = await fileApi.uploadPostImage(data.userId, file);
        if (error) throw error;
        media.push(`${response.path}`);
      }
      delete data.files;
      
      await postApi.createPost({ userId: data.userId, groupId, content: data.content, media: media });
    },
    onError: (e) => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", groupId]);
    },
  });

  return createPostMutation;
};
