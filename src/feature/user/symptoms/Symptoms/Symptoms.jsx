import { useState } from "react";
import { Card, Grid } from "@mui/material";
import { Box } from "@mui/material";
import Button from "components/Button";
import { useFieldArray, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import * as symptomApi from "@api/symptoms";
import SymptomInput from "../../components/SymptomInput";
import { useUser } from "feature/auth/context";

const Symptoms = ({ initialValues }) => {
  const [saving, setSaving] = useState();

  const user = useUser();

  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const { fields } = useFieldArray({
    control,
    name: "userSymptoms",
  });

  const submit = handleSubmit(async (values) => {
    setSaving(true);
    const userSymptoms = values.userSymptoms?.map((symptom) => ({
      value: symptom.value,
      symptomId: symptom.symptomId,
      userId: user.id,
      id: symptom.id,
    }));

    const symptomResponse = await symptomApi.updateUserSymptoms(userSymptoms);
    if (symptomResponse.error) {
      enqueueSnackbar("Update failed", { variant: "error" });
      return;
    } else {
      enqueueSnackbar("Update success", { variant: "success" });
    }

    setSaving(false);
  });

  return (
    <Card sx={{ p: 5 }}>
      <Grid container spacing={4}>
        {fields?.map((field, index) => (
          <Grid item xs={12} md={6}>
            <SymptomInput
              type={field.type}
              label={field.name}
              control={control}
              name={`userSymptoms.${index}.value`}
              key={index}
            />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={5}>
        <Button loading={saving} onClick={submit}>
          Update
        </Button>
      </Box>
    </Card>
  );
};

export default Symptoms;
