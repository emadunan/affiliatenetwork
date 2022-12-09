import { FC } from "react";
import { Container } from "@mui/material";

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
      </Container>
    </footer>
  );
};

export default SiteFooter;