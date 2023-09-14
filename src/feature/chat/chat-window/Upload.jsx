import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { CircularProgress, Dialog, DialogContent, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";
import { ImageContainer } from "./styled";
import { useSendMessage } from "../hooks/use-message-actions";
import { useSnackbar } from "notistack";

const sizeLimit = 5 * 1024 * 1024;

const Upload = ({ userId, chatGroupId }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": [] },
    onDropAccepted: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > sizeLimit) {
        enqueueSnackbar(`The image size must be less than 5MB!`, { variant: "warning" });
      } else {
        Object.assign(file, { preview: URL.createObjectURL(file) });
        setFile(file);
      }
    },
  });

  const sendMessageMutation = useSendMessage(userId, chatGroupId);

  const handleSend = () => {
    sendMessageMutation.mutate({ message, file }, { onSuccess: () => handleClose() });
  };

  const handleClose = () => {
    setFile(null);
    setMessage(null);
  };

  return (
    <div>
      <IconButton color="primary" disabled={sendMessageMutation.isLoading} {...getRootProps()}>
        <AddPhotoAlternateIcon />
        <input {...getInputProps()} />
      </IconButton>
      <Dialog open={file} fullWidth maxWidth="sm">
        <DialogContent sx={{ p: 4 }}>
          <IconButton sx={{ position: "absolute", top: "0", right: "0" }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <ImageContainer>
            <Image src={file?.preview} fill style={{ objectFit: "cover" }} alt="message-media" />
          </ImageContainer>
          <Stack direction="row" spacing={2}>
            <TextField size="small" fullWidth onChange={(e) => setMessage(e.target.value)} value={message} />
            <IconButton onClick={handleSend} disabled={sendMessageMutation.isLoading}>
              {sendMessageMutation.isLoading ? <CircularProgress size={24} /> : <SendIcon color="primary" />}
            </IconButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Upload;
