import { Grid, Stack, Typography, FormLabel, Box, TextField } from "@mui/material";
import Button from "components/Button";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import RHFAutocomplete from "components/hook-forms/RHFAutocomplete";
import causes from "constants/causes";
import { Info } from "./styled";
import * as symptomApi from "@api/symptoms";
import { useSnackbar } from "notistack";
import { useUser } from "feature/auth/context";
import { useRouter } from "next/router";
import * as userApi from "@api/user";

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

const Causes = ({ initialValues, onBack }) => {
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
  });
  const user = useUser();
  const router = useRouter();

  const { fields } = useFieldArray({ control, name: "userSymptoms" });

  const { enqueueSnackbar } = useSnackbar();

  const handleSave = handleSubmit(async (values) => {
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
    
    await userApi.confirmUser(user.id);
    router.push("/");
  });

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            {fields.map((field, index) => (
              <div key={index}>
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
              </div>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Info style={{ marginTop: "50px" }}>
            <Typography variant="body2">
              This page is used to gather information regarding the cause or causes of your tinnitus and/or other
              symptoms. <br />
              <br />
              Simply start typing, and if your cause does not show, you can still enter it as a cause. <br />
              <br />
              Please answer to the best of your abilities, and don't worry about getting everything perfect. <br />
              <br />
              These answers can be changed later.
            </Typography>
          </Info>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="space-between" mt={5}>
        <Button onClick={onBack}>Previous</Button>
        <Button loading={saving} onClick={handleSave}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default Causes;
