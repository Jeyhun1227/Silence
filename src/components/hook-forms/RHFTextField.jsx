import TextField from "components/mui-form/TextField";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";

const RHFTextField = forwardRef(({ name, control, ...rest }, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...rest} ref={ref} />
      )}
    />
  );
});

export default RHFTextField;
