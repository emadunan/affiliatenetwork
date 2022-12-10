import type { FC } from "react";
import NavBar from "../ui/navbar";

interface SitHeaderProps {
  className?: string;
}

const SiteHeader: FC<SitHeaderProps> = (props) => {
  return (
    <header className={props.className}>
      <NavBar />
    </header>
  );
};

export default SiteHeader;
