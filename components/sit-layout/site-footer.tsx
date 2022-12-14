import { FC } from "react";
import { Container } from "@mui/material";
import Link from "next/link";

interface SiteFooterProps {
  className?: string;
}

const SiteFooter: FC<SiteFooterProps> = (props) => {
  return (
    <footer className={`${props.className}`}>
      <Container>
        <div className="h-20 flex justify-center items-center">
          <h5>Copy rights reserved © 2023</h5>
        </div>
        <Link href={"/privacy-policy"}>
          <h4 className="my-2 hover:text-white">Privacy Policy</h4>
        </Link>
      </Container>
    </footer>
  );
};

export default SiteFooter;
