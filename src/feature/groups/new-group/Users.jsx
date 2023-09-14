import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useData } from "./useData";
import { Controller, useForm } from "react-hook-form";
import Button from "components/Button";
import map from "lodash/map";
import causes from "constants/causes";
import { CustomAvatar } from "components/custom-avatar";
import xor from "lodash/xor";
import some from "lodash/some";

import { RemoveButton, UserContainer } from "./styled";
import { Close } from "@mui/icons-material";
import RHFTextField from "components/hook-forms/RHFTextField";

const Users = ({ onChange, value }) => {
  const { symptoms, users, loadingSymptoms, loadingUser, getUsers } = useData();

  const { control, handleSubmit } = useForm({ defaultValues: { symptoms: [], causes: [] } });

  const handleRemoveUser = (id) => onChange(value?.filter((item) => item.id !== id));

  const submit = handleSubmit((data) => getUsers(data.searchText, data.symptoms, data.causes));

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6">Find people to invite</Typography>
      <Typography variant="body2" color="text.secondary">
        Use this section to find other members by searching their names, and/or group invite members based on their
        symptoms and causes
      </Typography>

      <Stack direction="row" sx={{ mt: 2, mb: 6 }} display="flex" flexWrap="wrap" gap={2}>
        {value.map((user) => (
          <Box position="relative">
            <RemoveButton size="small" onClick={() => handleRemoveUser(user.id)}>
              <Close fontSize="small" />
            </RemoveButton>
            <CustomAvatar name={user.firstName} />
          </Box>
        ))}
      </Stack>
      <Stack spacing={2}>
        <RHFTextField control={control} name="searchText" label="Search by name" placeholder="" />
        <div>
          <FormLabel>Symptoms</FormLabel>
          <FormGroup row>
            {symptoms.map((symptom) => (
              <FormControlLabel
                key={symptom.id}
                label={symptom.name}
                control={
                  <Controller
                    control={control}
                    name="symptoms"
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value?.includes[symptom.id]}
                        onChange={(e) => {
                          e.target.checked ? onChange([symptom.id, ...value]) : onChange(xor(value, [symptom.id]));
                        }}
                      />
                    )}
                  />
                }
              />
            ))}
          </FormGroup>
        </div>
        <div>
          <FormLabel>Causes</FormLabel>
          <FormGroup row>
            {map(causes, (cause, key) => (
              <FormControlLabel
                key={key}
                label={cause}
                control={
                  <Controller
                    control={control}
                    name="causes"
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value?.includes[cause]}
                        onChange={(e) => {
                          e.target.checked ? onChange([cause, ...value]) : onChange(xor(value, [cause]));
                        }}
                      />
                    )}
                  />
                }
              />
            ))}
          </FormGroup>
        </div>

        <Box display="flex" justifyContent="flex-end">
          <Button onClick={submit} loading={loadingUser}>
            Generate Users
          </Button>
        </Box>

        {users.length > 0 && (
          <UserContainer>
            {users?.map((user) => {
              const selected = some(value, user);
              return (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  key={user.id}
                  spacing={1}
                  sx={{ py: 1, px: 2 }}
                >
                  <Stack spacing={2} direction="row" alignItems="center">
                    <CustomAvatar name={user.firstName + user.lastName} src={user.image} />
                    <Typography variant="subtitle2">{`${user.firstName} ${user.lastName || ""}`}</Typography>
                  </Stack>
                  <Button
                    size="small"
                    variant={selected ? "contained" : "outlined"}
                    onClick={() => onChange([user, ...value])}
                    disabled={selected}
                  >
                    {selected ? "Added" : "Add"}
                  </Button>
                </Box>
              );
            })}
          </UserContainer>
        )}
      </Stack>
    </Card>
  );
};

export default Users;
