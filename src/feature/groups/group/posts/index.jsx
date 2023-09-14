import { Box, Grid, Stack } from "@mui/material";
import Button from "components/Button";
import React from "react";
import Post from "../post";
import { usePosts } from "../hooks/use-post-action";
import dynamic from "next/dynamic";

const NewPost = dynamic(() => import("../new-post"), {
  ssr: false,
});

const Posts = () => {
  const posts = usePosts();
  const handleNextPage = () => {
    posts.fetchNextPage();
  };

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <NewPost />
        <Stack spacing={3}>
          {posts?.data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  user={post.user}
                  groupId={post.postGroupId}
                  text={post.text}
                  content={post.content}
                  commentCount={post.commentCount}
                  time={post.time}
                  media={post.media}
                />
              ))}
            </React.Fragment>
          ))}
          <Box display="flex" py={2} justifyContent="center">
            {posts.hasNextPage && (
              <Button variant="text" onClick={handleNextPage} loading={posts.isFetchingNextPage}>
                Load more
              </Button>
            )}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Posts;
