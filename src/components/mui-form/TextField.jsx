import { forwardRef } from "react";
import { FormControl, FormHelperText, FormLabel, OutlinedInput } from "@mui/material";

const TextField = forwardRef(({ label, helperText, error, fullWidth = true, ...props }, ref) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <FormLabel sx={{ mb: 0.5 }}>{label}</FormLabel>
      <OutlinedInput ref={ref} {...props} size="small" />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
});

export default TextField;
