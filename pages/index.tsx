import { FC } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

import { signIn, useSession } from "next-auth/react";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Home: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div>
      <h1 className="text-center">{`Welcome to our Affiliate Network plateform`}</h1>
      <h3>We are happy for your visit</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum omnis
        eius sed ipsum esse, odit accusamus eaque iure consequuntur obcaecati a
        ratione debitis qui. Tempora, obcaecati! Ipsum libero, adipisci nobis
        odit blanditiis illum consequuntur doloremque similique ipsam
        repudiandae iure quos veritatis enim ab fugiat placeat provident itaque
        expedita debitis autem nostrum soluta assumenda magni eius. Ratione est
        ut illo dolore harum nemo fugiat iusto non nesciunt, autem repellat
        molestiae reiciendis!
      </p>
      <div className="my-4 flex justify-center">
        {status === "unauthenticated" && (
          <Button
            className="bg-[#BE3F3F]"
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={() => signIn(undefined, { callbackUrl: "/coupons" })}
          >
            Login Now
          </Button>
        )}
        {status === "authenticated" && !session.user.privilege && (
          <Button
            className="bg-[#BE3F3F]"
            variant="contained"
            endIcon={<AppRegistrationIcon />}
            onClick={() => router.replace("/users/register")}
          >
            Register Now
          </Button>
        )}
        {session?.user.privilege === "publisher" && (
          <Button
            className="bg-[#BE3F3F]"
            variant="contained"
            endIcon={<AppRegistrationIcon />}
            onClick={() => router.replace("/campaigns")}
          >
            Register Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
