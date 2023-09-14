import { Box, FormLabel, Grid, Stack, Typography } from "@mui/material";
import Button from "components/Button";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import RHFSwitch from "components/hook-forms/RHFSwitch";
import { Info } from "./styled";
import SymptomInput from "../../components/SymptomInput";
import * as userApi from "@api/user";
import * as symptomApi from "@api/symptoms";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

const BasicInformation = ({ initialValues, onNext }) => {
  const [saving, setSaving] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const { fields } = useFieldArray({
    control,
    name: "userSymptoms",
  });

  const submit = handleSubmit(async (values) => {
    setSaving(true);
    const userResponse = await userApi.updateUserBasicInfo(values.id, {
      firstName: values.firstName,
      lastName: values.lastName,
      age: values.age,
      location: values.location,
      hideLocationAge: values.hideLocationAge,
    });

    if (userResponse.error) {
      enqueueSnackbar("Updating user details is failed", { variant: "error" });
      setSaving(false);
      return;
    }

    const userSymptoms = values.userSymptoms?.map((symptom) => ({
      value: symptom.value,
      symptomId: symptom.symptomId,
      userId: values.id
    }));

    const symptomResponse = await symptomApi.updateUserSymptoms(userSymptoms);
    if (symptomResponse.error) {
      enqueueSnackbar("Updating symptoms is failed", { variant: "error" });
      setSaving(false);
      return;
    }

    setSaving(false);
    onNext();
  });

  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <RHFTextField name="firstName" control={control} label="First Name" />
            <RHFTextField name="lastName" control={control} label="Last Name" />
            <RHFTextField name="email" control={control} label="Email" disabled />
            <RHFTextField name="age" control={control} label="Age" type="number" />
            <RHFTextField name="location" control={control} label="Location" />
            <Info>
              <Typography variant="body2">
                Your email address will be hidden from all members, but your age, name, and location can be used to find
                people like you. You can opt to keep your location privie by clicking here
              </Typography>
            </Info>

            <Box display="flex" justifyContent="space-between">
              <FormLabel>Keep my location and age private</FormLabel>
              <RHFSwitch name="hideLocationAge" control={control} />
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            {fields?.map((field, index) => (
              <SymptomInput
                type={field.type}
                label={field.name}
                control={control}
                name={`userSymptoms.${index}.value`}
                key={index}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={5}>
        <Button loading={saving} onClick={submit}>
          Save and continue
        </Button>
      </Box>
    </>
  );
};

export default BasicInformation;
