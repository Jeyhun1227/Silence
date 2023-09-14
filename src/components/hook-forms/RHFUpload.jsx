import { Controller } from "react-hook-form";
import { UploadAvatar } from "../upload";

export function RHFUploadAvatar({ name, control, ...other }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadAvatar
            accept={{
              "image/*": [],
            }}
            error={!!error}
            file={field.value}
            {...other}
          />
        </div>
      )}
    />
  );
}
