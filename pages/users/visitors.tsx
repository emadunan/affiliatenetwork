import { UserWithMeta } from "@prisma/client/scalar";
import { FC, useEffect, useState } from "react";
import VisitorsTable from "../../components/user/visitors-table";

const Users: FC = () => {
  const [users, setUsers] = useState<UserWithMeta[]>();
  useEffect(() => {
    fetch("/api/users")
      .then((response) => {
        if (!response.ok) return console.log(response.statusText);

        return response.json();
      })
      .then((users) => setUsers(users));
  }, []);

  return <div>
    {(users && users?.length > 0) && (
      <VisitorsTable users={users.filter(user => !user.UserMeta?.privilege)} />
    )}
  </div>;
};

export default Users;
