export default {
  supabaseStorageUrl: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
  supabasePublicStorageUrl: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_STORAGE_URL,
  avatarBaseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_STORAGE_URL}/users/`,
  postImageBaseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_STORAGE_URL}/users/post/`,
  chatImagBaseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_STORAGE_URL}/users/chat/`,
  groupBaseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_STORAGE_URL}/groups/`,
};

export const NAV = {
  W_DASHBOARD: 250,
  W_DASHBOARD_MINI: 88,
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};
