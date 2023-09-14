import ApiError from "backend/utils/api-error";
import { supabase } from "backend/utils/superbase-admin-client";
import httpStatus from "http-status";
import { head } from "lodash";

const deleteCommentsByPostId = async (postId) => {
  const { error } = await supabase.from("post_comments").delete().eq("postId", postId);
  if (error) throw error;
  return null;
};

const deleteComment = async (id) => {
  const { data, error } = await supabase.from("post_comments").delete().eq("id", id).select();
  if (error) throw error;
  if (!head(data)) throw new ApiError("Post not found", httpStatus.NOT_FOUND);
  return null;
};

export default { deleteCommentsByPostId, deleteComment };
