import { Box, Divider, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { FC, ReactNode, useEffect, useState } from "react";

interface SummaryTypographyProps {
  children: ReactNode
}

const SummaryTypography: FC<SummaryTypographyProps> = ({ children }) => {
  return <Typography component="p" className="mr-8">{children}</Typography>;
}

const Performance: FC = () => {
  const {data: session} = useSession();
  const [report, setReport] = useState<any>();
  useEffect(() => {
    fetch("/api/boostiny/performance").then(response => {
      return response.json();
    }).then(data => {
      console.log(data.payload);
      setReport(data.payload)
    })
  }, []);
  return (
    <div>
      {report && session?.user.privilege === "admin" && (
        <Box className="flex flex-wrap">
          <SummaryTypography>aov_usd: {report?.summary?.aov_usd}</SummaryTypography>
          <SummaryTypography>aov_usd_cancellation_rate: {report?.summary?.aov_usd_cancellation_rate}</SummaryTypography>
          <SummaryTypography>full_count: {report?.summary?.full_count}</SummaryTypography>
          <SummaryTypography>net_aov_usd: {report?.summary?.net_aov_usd}</SummaryTypography>
          <SummaryTypography>net_orders: {report?.summary?.net_orders}</SummaryTypography>
          <SummaryTypography>net_revenue: {report?.summary?.net_revenue}</SummaryTypography>
          <SummaryTypography>net_sales_amount: {report?.summary?.net_sales_amount}</SummaryTypography>
          <SummaryTypography>net_sales_amount_usd: {report?.summary?.net_sales_amount_usd}</SummaryTypography>
          <SummaryTypography>orders: {report?.summary?.orders}</SummaryTypography>
          <SummaryTypography>orders_cancellation_rate: {report?.summary?.orders_cancellation_rate}</SummaryTypography>
          <SummaryTypography>revenue: {report?.summary?.revenue}</SummaryTypography>
          <SummaryTypography>revenue_cancellation_rate: {report?.summary?.revenue_cancellation_rate}</SummaryTypography>
          <SummaryTypography>sales_amount: {report?.summary?.sales_amount}</SummaryTypography>
          <SummaryTypography>sales_amount_cancellation_rate: {report?.summary?.sales_amount_cancellation_rate}</SummaryTypography>
          <SummaryTypography>sales_amount_usd: {report?.summary?.sales_amount_usd}</SummaryTypography>
          <SummaryTypography>sales_amount_usd_cancellation_rate: {report?.summary?.sales_amount_usd_cancellation_rate}</SummaryTypography>
          <Divider />
        </Box>
      )}
    </div>
  );
};

export default Performance;
