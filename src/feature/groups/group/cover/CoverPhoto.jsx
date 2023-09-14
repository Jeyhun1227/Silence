import { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { CoverPhotoContainer, EditAvatarButton } from "./styled";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import config from "@config/index";
import { useUpdateCover } from "../hooks/use-cover";
import { useSnackbar } from "notistack";

const sizeLimit = 5 * 1024 * 1024;

const CoverPhoto = ({ groupId, cover }) => {
  const [file, setFile] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const updateCoverMutation = useUpdateCover(groupId, cover);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: { "image/*": [] },
    onDropAccepted: (acceptedFiles) => {
      const acceptedFile = acceptedFiles[0];
      if (acceptedFile.size > sizeLimit) {
        enqueueSnackbar(`The image size must be less than 5MB!`, { variant: "warning" });
      }
      else {
        Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        });
        setFile(acceptedFile);
        updateCoverMutation.mutate(acceptedFile);
      }
    }
  });

  const image = file?.preview || (cover && `${config.groupBaseUrl}${cover}`)?.replaceAll(' ', '%20') || null;

  return (
    <CoverPhotoContainer>
      <EditAvatarButton
        disabled={updateCoverMutation.isLoading}
        color="inherit"
        startIcon={<AddAPhotoIcon />}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {updateCoverMutation.isLoading ? "Uploading" : "Edit"}
      </EditAvatarButton>
      {image && <Image loader={() => image} src={image} alt="cover" fill style={{ objectFit: "cover" }} />}
    </CoverPhotoContainer>
  );
};

export default CoverPhoto;