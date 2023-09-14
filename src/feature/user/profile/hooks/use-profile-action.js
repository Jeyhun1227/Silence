import { useMutation } from "@tanstack/react-query";
import * as userApi from "@api/user";
import * as fileApi from "@api/file";
import { useSnackbar } from "notistack";

import { useUser } from "feature/auth/context";

export const useUpdateProfile = () => {
  const { enqueueSnackbar } = useSnackbar();

  const updateMutation = useMutation({
    mutationFn: (data) => userApi.updateUserBasicInfo(data.id, data),
    onSuccess: () => enqueueSnackbar("Update success", { variant: "success" }),
    onError: () => enqueueSnackbar("Update failed", { variant: "error" }),
  });

  return updateMutation;
};

export const useUpdateAvatar = (currentAvatar) => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useUser();
  const updateAvatarMutation = useMutation({
    mutationFn: async (data) => {
      const { data: response, error } = await fileApi.uploadUserAvatar(user.id, data);
      if (error) throw error;
      await userApi.updateUserBasicInfo(user.id, { avatar: response.path });
      if (currentAvatar) {
        await fileApi.deleteUserAvatar(currentAvatar);
      }
    },
    onSuccess: () => enqueueSnackbar("Update success", { variant: "success" }),
    onError: () => enqueueSnackbar("Update failed", { variant: "error" }),
  });

  return updateAvatarMutation;
};
