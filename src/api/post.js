import { supabase } from "utils/superbase-client";
import { getPagination } from "utils/pagination";

export const getGroupsByUserId = (userId) => {
  return supabase
    .from("post_groups")
    .select(
      "id, name,category: post_group_categories(id, name), userPostGroup: user_post_groups!inner(*,isAccepted), users:user_post_groups(user: users(firstName, avatar)), userCount: user_post_groups(count), postCount: posts(count)"
    )
    .eq("user_post_groups.userId", userId)
    .limit(3, { foreignTable: "user_post_groups" });
};

export const getGroupById = (groupId) => {
  return supabase
    .from("post_groups")
    .select("id, name, avatar, cover, category: post_group_categories(id, name)")
    .eq("id", groupId)
    .limit(1)
    .throwOnError()
    .single();
};

export const getGroupMember = (groupId, userId) => {
  return supabase
    .from("user_post_groups")
    .select("role, user:users(id, firstName, lastName, role, avatar)")
    .eq("postGroupId", groupId)

    .throwOnError();
};

export const getGroupCategories = () => {
  return supabase.from("post_group_categories").select("id, name").throwOnError();
};

export const createGroup = ({ name, description, createdBy, allowInvitation }) => {
  return supabase
    .from("post_groups")
    .insert({
      name,
      description,
      createdBy,
      allowInvitation,
      categoryId: process.env.NEXT_PUBLIC_DEFAULT_POST_GROUP_CATEGORY_ID,
    })
    .select()
    .single();
};

export const updateGroup = (id, { cover }) => {
  return supabase.from("post_groups").update({ cover }).eq("id", id);
};

export const addUsersToGroup = (users) => {
  return supabase.from("user_post_groups").upsert(users);
};

export const acceptGroupInvitation = (userId, groupId) => {
  return supabase.from("user_post_groups").update({ isAccepted: true }).match({ userId, postGroupId: groupId });
};

export const declineGroupInvitation = (userId, groupId) => {
  return supabase.from("user_post_groups").delete().match({ userId, postGroupId: groupId });
};

export const createPost = ({ userId, groupId, content, media = [] }) => {
  return supabase.from("posts").insert({ userId: userId, media: media, text: "", postGroupId: groupId, content }).throwOnError();
};

export const deletePost = (id) => {
  return supabase.from("posts").delete().eq("id", id).throwOnError();
};

export const deleteComment = async (id, media) => {
  if (media?.length > 0){
    const {data, error} = await supabase.storage.from('users').remove(media);
  }
  return supabase.from("post_comments").delete().eq("id", id).throwOnError();
}

export const getPostsByGroup = async (groupId, page = 1) => {
  const { from, to } = getPagination(page, 5);
  const { data, count } = await supabase
    .from("posts")
    .select(
      "id, postGroupId, text,content, media, createdAt, user:users(id, firstName, lastName, avatar), comments: post_comments(count)",
      {
        count: "exact",
      }
    )
    .eq("postGroupId", groupId)
    .order("createdAt", { ascending: false })
    .range(from, to)
    .throwOnError();

  const totalPages = Math.ceil(count / 5);
  const nextCursor = totalPages > page && page + 1;
  return { data, nextCursor };
};

export const addComment = ({ userId, postId, parentCommentId, content, media = [] }) => {
  return supabase.from("post_comments").insert({ userId: userId, postId: postId, parentCommentId: parentCommentId, content: content, media }).throwOnError();
};

export const getCommentsByPost = (postId) => {
  return supabase
    .from("post_comments")
    .select("id, parentCommentId, text, media, content, createdAt, user: users(id, firstName, lastName, avatar)")
    .eq("postId", postId)
    .order("createdAt", { ascending: true })
    .throwOnError();
};
