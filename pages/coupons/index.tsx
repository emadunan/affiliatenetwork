import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Coupons: FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (["publisher", "admin"].includes(session?.user.privilege as string)) router.replace("/users/register");

    fetch("/api/campaigns").then(response => {
      if (!response.ok) return console.log(response);
      return response.json();
    }).then(data => console.log(data)
    )
  }, []);

  return (
    <div>
      Coupons Page
    </div>
  );
}

export default Coupons;