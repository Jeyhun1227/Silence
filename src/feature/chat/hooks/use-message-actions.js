import { useMutation } from "@tanstack/react-query";
import * as fileApi from "@api/file";
import * as chatApi from "@api/chat";
import { useSnackbar } from "notistack";

export const useSendMessage = (userId, chatGroupId) => {
  const { enqueueSnackbar } = useSnackbar();

  const sendMessageMutation = useMutation({
    mutationFn: async (data) => {
      let file = null;
      if (data.file) {
        const { data: response, error } = await fileApi.uploadChatImage(userId, data.file);
        if (error) throw error;
        file = response.path;
      }
      await chatApi.sendMessage(data.message, file, userId, chatGroupId);
    },
    onError: () => enqueueSnackbar("Failed to send message", { variant: "error" }),
  });

  return sendMessageMutation;
};
