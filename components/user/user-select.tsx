import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useGetAllUsersQuery } from "../../services/user";

export default function UserSelect() {
  const { data: users } = useGetAllUsersQuery();
  
  const [user, setUser] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="user-select-label">user</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={user}
          onChange={handleChange}
          label="user"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {users?.map(user => <MenuItem value={user.id}>{user.name}</MenuItem>)}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}