import ApiError from "backend/utils/api-error";
import { supabase } from "backend/utils/superbase-admin-client";
import { head } from "lodash";
import commentService from "backend/services/comment-service";
import fileService from "backend/services/file-service";

const getPost = async (id) => {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id);
  if (error) throw error;
  if (!head(data)) throw new ApiError("Post not found", httpStatus.NOT_FOUND);
  return head(data);
};

const deletePost = async (id) => {
  const post = await getPost(id);
  await commentService.deleteCommentsByPostId(id);
  if (post.media.length > 0) {
    await fileService.deleteFiles("users", post.media);
  }

  const { data, error } = await supabase.from("posts").delete().eq("id", id).select();
  if (error) throw error;
  if (!head(data)) throw new ApiError("Post not found", httpStatus.NOT_FOUND);
  return null;
};


const createPost = () => {
  
}


export default { deletePost, getPost };
