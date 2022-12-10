import type { FC } from "react";
import { FormHelperText } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import useNetworkStatus from "../../hooks/use-network-status";

interface SiteTitleProps {
  className?: string;
}

const SiteTitle: FC<SiteTitleProps> = (props) => {
  const networkStatus = useNetworkStatus();

  return (
    <section className={`${props.className} relative`}>
      <h1 className="text-4xl text-primary text-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] ">
        Affiliate Network
      </h1>

      {!networkStatus && (
        <FormHelperText className="animate-pulse absolute bottom-0">
          <WarningAmberIcon sx={{ color: "#D73500" }} />
          <span className="text-error">Internet Disconnected!</span>
        </FormHelperText>
      )}
    </section>
  );
};
export default SiteTitle;
