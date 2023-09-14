import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import Button from "components/Button";
import RHFTextField from "components/hook-forms/RHFTextField";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { useAddLiveStream } from "../hooks/use-live-streams";

const New = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) });

  const addLiveStreamMutation = useAddLiveStream();

  const submit = handleSubmit((data) =>
    addLiveStreamMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    })
  );

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Add live stream</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <RHFTextField control={control} name="title" label="Title" />
          <RHFTextField control={control} name="description" label="Description" />
          <RHFTextField control={control} name="dateTime" label="Date" type="datetime-local" />
          <RHFTextField control={control} name="link" label="Link" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submit} loading={addLiveStreamMutation.isLoading}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default New;
