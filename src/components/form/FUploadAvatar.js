import { FileDownload } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import UploadAvatar from "../UploadAvatar";

function FUploadAvatar({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error & !field.value;
        return (
          <div>
            <UploadAvatar error={checkError} {...other} file={field.value} />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}
export default FUploadAvatar;
