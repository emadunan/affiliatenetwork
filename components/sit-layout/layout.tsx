import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";

import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import SiteTitle from "./site-title";

interface LayoutProps {
  className?: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div className="bg-secondary min-h-screen flex flex-col">
      <Container>
        <SiteTitle className="h-20" />
        <SiteHeader className="sticky top-0 z-10" />
        <Box component="div" className={`mt-4`}>{props.children}</Box>
      </Container>
      <SiteFooter className="bg-primary text-secondary mt-auto" />
    </div>
  );
}

export default Layout;