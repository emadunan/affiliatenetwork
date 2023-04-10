import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useGetAllUsersQuery } from "../../services/user";

// onChangeUser: (x: any) => void;

interface UserSelectProps {
  userId: any;
  onChangeUser: (userId: string) => Promise<void>;
}

const UserSelect: React.FC<UserSelectProps> = ({ userId, onChangeUser }) => {
  const { data: users } = useGetAllUsersQuery();

  const handleChange = (event: SelectChangeEvent) => {
    onChangeUser(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={userId}
          onChange={handleChange}
          label="user"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {users?.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default UserSelect;
