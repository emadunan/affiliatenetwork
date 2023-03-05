import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { FC, ReactNode, useState } from "react";
import PerformanceTable from "../../components/performance/performance-table";
import MaterialUIPicker from "../../components/ui/date-picker";
import dayjs, { Dayjs } from "dayjs";
import Pagination from "@mui/material/Pagination";

// SummaryTypography Component
interface TypographyProps {
  children: ReactNode;
}

const SummaryTypography: FC<TypographyProps> = ({ children }) => {
  return (
    <Typography component="p" className="mr-8">
      {children}
    </Typography>
  );
};

const Performance: FC = () => {
  // Backdrop and spinner
  const [showSpinner, setShowSpinner] = React.useState(false);

  const [fromDate, setFromDate] = React.useState<Dayjs | null>(
    dayjs(new Date(Date.now() - 3600 * 1000 * 24 * 7).toISOString())
  );
  const [untilDate, setUntilDate] = React.useState<Dayjs | null>(
    dayjs(new Date().toISOString())
  );

  const handleFromDateChange = (newValue: Dayjs | null) => {
    setFromDate(newValue);
  };

  const handleUntilDateChange = (newValue: Dayjs | null) => {
    setUntilDate(newValue);
  };

  const handleRunReport = (page = 1) => {
    console.log(fromDate?.toISOString(), untilDate?.toISOString());

    setShowSpinner(true);
    fetch(
      `/api/boostiny/performance?page=${page}&fromDate=${fromDate?.toISOString()}&untilDate=${untilDate?.toISOString()}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.payload);
        setReport(data.payload);
        setShowSpinner(false);
      });
  };

  const handleSpinnerClose = () => {
    setShowSpinner(false);
  };

  // Fetch data
  const { data: session } = useSession();
  const [report, setReport] = useState<any>();

  return (
    <Box component="div">
      <Box
        component="div"
        className="flex flex-row justify-center items-center"
      >
        <MaterialUIPicker
          label="from"
          handleChange={handleFromDateChange}
          value={fromDate}
        />
        <MaterialUIPicker
          label="until"
          handleChange={handleUntilDateChange}
          value={untilDate}
        />
        <Button
          variant="outlined"
          onClick={(_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleRunReport()
          }
        >
          Run Report
        </Button>
      </Box>

      {report &&
        ["admin", "publisher"].includes(session?.user.privilege as string) && (
          <Box>
            {session?.user.privilege === "admin" && (
              <Box>
                <Typography variant="h4" className="text-center mt-2">
                  Summary
                </Typography>
                <Box className="flex flex-wrap">
                  <SummaryTypography>
                    aov_usd: {report?.summary?.aov_usd}
                  </SummaryTypography>
                  <SummaryTypography>
                    aov_usd_cancellation_rate:{" "}
                    {report?.summary?.aov_usd_cancellation_rate}
                  </SummaryTypography>
                  <SummaryTypography>
                    full_count: {report?.summary?.full_count}
                  </SummaryTypography>
                  <SummaryTypography>
                    net_aov_usd: {report?.summary?.net_aov_usd}
                  </SummaryTypography>
                  <SummaryTypography>
                    net_orders: {report?.summary?.net_orders}
                  </SummaryTypography>
                  <SummaryTypography>
                    net_revenue: {report?.summary?.net_revenue}
                  </SummaryTypography>
                  <SummaryTypography>
                    net_sales_amount: {report?.summary?.net_sales_amount}
                  </SummaryTypography>
                  <SummaryTypography>
                    net_sales_amount_usd:{" "}
                    {report?.summary?.net_sales_amount_usd}
                  </SummaryTypography>
                  <SummaryTypography>
                    orders: {report?.summary?.orders}
                  </SummaryTypography>
                  <SummaryTypography>
                    orders_cancellation_rate:{" "}
                    {report?.summary?.orders_cancellation_rate}
                  </SummaryTypography>
                  <SummaryTypography>
                    revenue: {report?.summary?.revenue}
                  </SummaryTypography>
                  <SummaryTypography>
                    revenue_cancellation_rate:{" "}
                    {report?.summary?.revenue_cancellation_rate}
                  </SummaryTypography>
                  <SummaryTypography>
                    sales_amount: {report?.summary?.sales_amount}
                  </SummaryTypography>
                  <SummaryTypography>
                    sales_amount_cancellation_rate:{" "}
                    {report?.summary?.sales_amount_cancellation_rate}
                  </SummaryTypography>
                  <SummaryTypography>
                    sales_amount_usd: {report?.summary?.sales_amount_usd}
                  </SummaryTypography>
                  <SummaryTypography>
                    sales_amount_usd_cancellation_rate:{" "}
                    {report?.summary?.sales_amount_usd_cancellation_rate}
                  </SummaryTypography>
                </Box>
              </Box>
            )}
            <Divider />
            <Box
              component="div"
              className="flex flex-col justify-center items-center"
            >
              <Typography variant="h4" className="my-2">
                Performance
              </Typography>
              {report.pagination.total && (
                <Pagination
                  count={Math.ceil(
                    report.pagination.total / report.pagination.perPage
                  )}
                  page={report.pagination.currentPage}
                  variant="outlined"
                  color="primary"
                  onChange={(event: React.ChangeEvent<unknown>, page: number) =>
                    handleRunReport(page)
                  }
                />
              )}
              <PerformanceTable rows={report.data} />
            </Box>
          </Box>
        )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showSpinner}
        onClick={handleSpinnerClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Performance;
