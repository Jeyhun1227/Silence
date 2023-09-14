import { Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";

const RHFAutocomplete = ({ name, control, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Autocomplete {...field} onChange={(e, v) => field.onChange(v)} {...rest} />}
    />
  );
};

export default RHFAutocomplete;
