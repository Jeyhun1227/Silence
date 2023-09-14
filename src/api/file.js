import { supabase } from "utils/superbase-client";

export const uploadPostImage = (userId, file) => {
  return supabase.storage.from("users").upload(`${userId}/post/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};

export const uploadChatImage = (userId, file) => {
  return supabase.storage.from("users").upload(`${userId}/chat/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};

export const uploadUserAvatar = (userId, file) => {
  return supabase.storage.from("users").upload(`${userId}/avatar/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};

export const uploadCommentImage = (userId, postId, file, filename) => {
  return supabase.storage.from("users").upload(`${userId}/post/${postId}/${postId}-${filename}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};

export const deleteUserAvatar = (file) => {
  return supabase.storage.from("users").remove(file);
};

export const deleteGroupCover = (file) => {
  return supabase.storage.from("groups").remove(file);
};

export const uploadGroupCover = (groupId, file) => {
  return supabase.storage.from("groups").upload(`${groupId}/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};
