import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Coupons: FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const {
    user: { privilege },
  } = session || { user: { privilege: undefined } };

  useEffect(() => {
    if (session) {
      if (["admin", "publisher"].includes(privilege as string)) {
        fetch("/api/campaigns")
          .then((response) => {
            if (!response.ok) return console.log(response);
            return response.json();
          })
          .then((data) => console.log(data));
      } else {
        router.replace("/users/register");
      }
    }
  }, [session, privilege]);

  return (
    <div>
      {status === "loading" && <div>Loading ...</div>}
      {["publisher", "admin"].includes(privilege as string) && (
        <div>Coupons</div>
      )}
    </div>
  );
};

export default Coupons;
