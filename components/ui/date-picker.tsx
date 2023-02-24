import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

interface MaterialUIPickerProps {
  label: string;
  value: Dayjs | null;
  handleChange: (newValue: Dayjs | null) => void;
}

const MaterialUIPicker: React.FC<MaterialUIPickerProps> = ({
  label,
  value,
  handleChange,
}) => {
  // const [value, setValue] = React.useState<Dayjs | null>(
  //   dayjs(ddate),
  // );

  // const handleChange = (newValue: Dayjs | null) => {
  //   setValue(newValue);
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} className="m-2">
        <DesktopDatePicker
          label={label}
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default MaterialUIPicker;
