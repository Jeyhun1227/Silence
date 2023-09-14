import ApiError from "backend/utils/api-error";
import { supabase } from "backend/utils/superbase-admin-client";

const deleteFiles = async (bucket, files) => {
  const { data, error } = await supabase.storage.from(bucket).remove(files);
  console.log(data, error,files);
  if (error) throw new ApiError("Failed to delete files");
  return data;
};

export default {
  deleteFiles,
};
