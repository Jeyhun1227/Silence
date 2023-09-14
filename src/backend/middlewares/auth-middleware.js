import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import ApiError from "backend/utils/api-error";
import httpStatus from "http-status";

const authMiddleware = async (req, res, next) => {
  const supabaseServerClient = createServerSupabaseClient({ req, res });
  const { data } = await supabaseServerClient.rpc("get_session");
  if (!data) throw new ApiError("unauthorized", httpStatus.UNAUTHORIZED);
  req.user = data;
  next();
};
export default authMiddleware;
