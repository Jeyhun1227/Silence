import { supabase } from "../utils/superbase-client";

export const login = async (email, password) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signup = async (email, password) => {
  return await supabase.auth.signUp({
    email,
    password,
    data: {
      confirmation_sent_at: Date.now(),
    },
  });
};

export const logout = async () => {
  return supabase.auth.signOut();
};

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/change-password`,
  });
  console.log("Data: ", data);
  console.log("Err: ", error);
  if (error) return error;
  return data;
};
export const changePassword = async (password) => {
  const { error, data } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  else return data;
};

export const getSession = async () => {
  return supabase.rpc("get_session");
};
