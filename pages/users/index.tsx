import { UserWithMeta } from "@prisma/client/scalar";
import { FC, useEffect, useState } from "react";
import UsersTable from "../../components/user/users-table";

const Users: FC = () => {
  const [users, setUsers] = useState<UserWithMeta[]>();
  useEffect(() => {
    fetch("/api/users")
      .then((response) => {
        if (!response.ok) console.log(response.statusText);

        return response.json();
      })
      .then((users) => {
        console.log(users);
        setUsers(users);
      });
  }, []);

  return (
    <div>
      {users && users?.length > 0 && (
        <UsersTable users={users.filter((user) => user.userMeta?.privilege)} />
      )}
    </div>
  );
};

export default Users;
