import { useCallback, useState } from "react";
import { Box, Typography, Stack, Grid, Card} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import Users from "./Users";
import Button from "components/Button";
import * as postApi from "@api/post";
import { useUser } from "feature/auth/context";
import { useRouter } from "next/router";
import RHFSwitch from "components/hook-forms/RHFSwitch";
import groupRoles from "constants/groupRoles";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFUploadAvatar } from "components/hook-forms/RHFUpload";
import { schema } from "./schema";
import * as notificationApi from '@api/notification';

const NewGroup = () => {
  const user = useUser();
  const [submitting, setSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { users: [], searchText: "", name: "", description: "", allowInvitation: false },
    resolver: yupResolver(schema),
  });

  const handleCancel = () => router.push("/groups");

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const submit = handleSubmit(async (data) => {

    setSubmitting(true);
    const createGroupResponse = await postApi.createGroup({
      name: data.name,
      description: data.description,
      createdBy: user.id,
      allowInvitation: data.allowInvitation,
    });

    if (createGroupResponse.error) {
      enqueueSnackbar("Create the group failed", { variant: "error" });
    } else if (createGroupResponse.data) {
      const users = [...data.users, user].map((userItem) => ({
        userId: userItem.id,
        postGroupId: createGroupResponse.data.id,
        isAccepted: userItem.id === user.id,
        role: userItem.id === user.id ? groupRoles.OWNER : groupRoles.MEMBER,
      }));

      data?.users.map(async (value) => {
        await notificationApi.sendInviteNotification(
          value.id,
          user.id
        )
      });

      const addUserResponse = await postApi.addUsersToGroup(users);
      if (addUserResponse.error) enqueueSnackbar("Add users to the group failed", { variant: "error" });
      router.push("/groups");
    }

    setSubmitting(false);
  });

  return (
    <Box width="100%">
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 5 }}>
        <div>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Create Group
          </Typography>
          <Typography variant="body2" color="text.secondary" maxWidth={500}>
            *This is a private group, once created, only you and those you invite will be able to see and access this
            group
          </Typography>
        </div>
      </Stack>

      <Grid container spacing={5}>
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFUploadAvatar name="avatar" control={control} onDrop={handleDrop} />
              <RHFTextField control={control} name="name" label="Name" />
              <RHFTextField control={control} name="description" label="Description" multiline minRows={3} />

              <RHFSwitch
                name="allowInvitation"
                control={control}
                label="Can members send invite to other people?"
                labelPlacement="start"
                sx={{ mx: 0, width: "100%", justifyContent: "space-between" }}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Controller
            name="users"
            control={control}
            render={({ field: { value, onChange } }) => <Users onChange={onChange} value={value} />}
          />
        </Grid>
      </Grid>
      <Stack justifyContent="flex-end" mt={5} direction="row" spacing={2}>
        <Button size="large" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button size="large" onClick={submit} loading={submitting}>
          Create Group
        </Button>
      </Stack>
    </Box>
  );
};

export default NewGroup;
