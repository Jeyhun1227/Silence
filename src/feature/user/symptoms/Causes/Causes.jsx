import { Grid, FormLabel, Box, TextField, Card } from "@mui/material";
import Button from "components/Button";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import RHFAutocomplete from "components/hook-forms/RHFAutocomplete";
import causes from "constants/causes";
import * as symptomApi from "@api/symptoms";
import { useSnackbar } from "notistack";

const options = [
  causes.CONCUSSION,
  causes.EAR_INFECTION,
  causes.LACK_OF_SLEEP,
  causes.MOLD,
  causes.NOISE_TRAUMA,
  causes.OTOTOXIC_MEDICATIONS,
  causes.POSTURE_ISSUES,
  causes.STRESS,
  causes.VIRUS,
  causes.UNKNOWN,
];

const Causes = ({ initialValues }) => {
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const { fields } = useFieldArray({ control, name: "userSymptoms" });

  const { enqueueSnackbar } = useSnackbar();

  const submit = handleSubmit(async (values) => {
    setSaving(true);
    const symptoms = values.userSymptoms.map((userSymptom) => ({
      id: userSymptom.id,
      causes: userSymptom.causes,
    }));

    const symptomResponse = await symptomApi.updateUserSymptoms(symptoms);
    if (symptomResponse.error) {
      enqueueSnackbar("Updating symptoms is failed", { variant: "error" });
      setSaving(false);
      return;
    }
    setSaving(false);
  });

  return (
    <Card sx={{ p: 5 }}>
      <Grid container spacing={4}>
        {fields.map((field, index) => (
          <Grid item xs={12} md={6} key={index}>
            <FormLabel sx={{ mb: 0.5 }}>{field.symptomName}</FormLabel>
            <RHFAutocomplete
              name={`userSymptoms.${index}.causes`}
              control={control}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={options}
              renderOption={(props, option) => <li {...props}>{option}</li>}
              freeSolo
              multiple
              renderInput={(params) => <TextField {...params} size="small" />}
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

export default Causes;
