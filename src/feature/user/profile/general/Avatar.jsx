import { Paper, Avatar as MuiAvatar, Typography } from "@mui/material";
import { useState } from "react";
import { Content, UploadContainer } from "./styled";
import { useDropzone } from "react-dropzone";
import config from "@config/index";
import { useUpdateAvatar } from "../hooks/use-profile-action";
import { useSnackbar } from "notistack";
import { Icon } from "@iconify/react";
const sizeLimit = 5 * 1024 * 1024;

const Avatar = ({ avatar }) => {
  const [file, setFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const updateAvatarMutation = useUpdateAvatar(avatar);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxFiles: 1,
    accept: { "image/*": [] },
    onDropAccepted: (acceptedFiles) => {
      const acceptedFile = acceptedFiles[0];
      if (acceptedFile.size > sizeLimit) {
        enqueueSnackbar(`The image size must be less than 5MB!`, { variant: "warning" });
      } else {
        Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        });
        setFile(acceptedFile);
        updateAvatarMutation.mutate(acceptedFile);
      }
    },
  });

  const image = file?.preview || `${config.avatarBaseUrl}/${avatar}`;

  return (
    <Paper elevation={3}>
      <Content>
        <UploadContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <MuiAvatar src={image} sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
            <Icon icon="ic:round-add-a-photo" />
            <Typography variant="caption" sx={{ zIndex: "100" }}>{file ? "Update photo" : "Upload photo"}</Typography>
          </MuiAvatar>
        </UploadContainer>
        {updateAvatarMutation.isLoading && (
          <Typography variant="caption" mt={2}>
            Uploading...
          </Typography>
        )}
      </Content>
    </Paper>
  );
};

export default Avatar;