import { FC } from "react";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

interface SiteFooterProps {
  className?: string;
}

const SiteFooter: FC<SiteFooterProps> = (props) => {
  return (
    <footer className={`${props.className}`}>
      <Container>
        <Box component="div" className="h-10 flex justify-between items-center">
          <Link href={"/privacy-policy"}>
            <Typography component="h4" className="my-2 hover:text-white">Privacy Policy</Typography>
          </Link>
          <Typography component="h5">Copy rights reserved © 2023</Typography>
          <Typography component="h4" className="opacity-0">.</Typography>
        </Box>

      </Container>
    </footer>
  );
};

export default SiteFooter;
