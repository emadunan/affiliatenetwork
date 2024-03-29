import { FC, SyntheticEvent } from "react";
import ReactDOM from "react-dom";

import { Alert, Snackbar } from "@mui/material";

export type Severity = "error" | "info" | "success" | "warning";

interface AlertMsgProps {
  open: boolean;
  handleClose: (event: SyntheticEvent | Event, reason?: string) => void;
  severity: Severity;
  alertMessage: string;
}

const AlertMsg: FC<AlertMsgProps> = ({
  severity,
  alertMessage,
  open,
  handleClose,
}) => {
  return ReactDOM.createPortal(
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {alertMessage}
      </Alert>
    </Snackbar>,
    document.getElementById("alert-msg") as HTMLDivElement
  );
};

export default AlertMsg;
