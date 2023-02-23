import { Backdrop, Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { FC, ReactNode, useEffect, useState } from "react";
import PerformanceTable from "../../components/performance/performance-table";
import MaterialUIPicker from "../../components/ui/date-picker";

// 2023-01-26 09:10:47

// SummaryTypography Component
interface TypographyProps {
  children: ReactNode
}

const SummaryTypography: FC<TypographyProps> = ({ children }) => {
  return <Typography component="p" className="mr-8">{children}</Typography>;
}

const ItemTypography: FC<TypographyProps> = ({ children }) => {
  return <Typography component="p" className="mr-4">{children}</Typography>;
}

// PerformanceItem Component
interface PerformanceItem {
  ad_set: string;
  aov_usd: string;
  aov_usd_cancellation_rate: string;
  automation: string;
  campaign_id: string;
  campaign_logo: string;
  campaign_name: string;
  code: string;
  code_id: string;
  country: string;
  customer_type: string;
  date: string;
  full_count: string;
  last_updated_at: string;
  net_aov_usd: string | null;
  net_orders: string;
  net_revenue: string;
  net_sales_amount: string;
  net_sales_amount_usd: string;
  orders: string;
  orders_cancellation_rate: string;
  revenue: string;
  revenue_cancellation_rate: string;
  sales_amount: string;
  sales_amount_cancellation_rate: string;
  sales_amount_usd: string;
  sales_amount_usd_cancellation_rate: string;
}

interface PerformanceItemProps {
  item: PerformanceItem;
}

const PerformanceItem: FC<PerformanceItemProps> = ({ item }) => {
  return (
    <Box component="div" className="my-4">
      <Box component="div" className="flex flex-row flex-wrap border-gray-700 border p-2">
        <ItemTypography>Full count: {item.full_count}</ItemTypography>
        <ItemTypography>Campaign Name: {item.campaign_name}</ItemTypography>
        <ItemTypography>Campaign Id: {item.campaign_id}</ItemTypography>
        {/* <ItemTypography>Campaign logo: {item.campaign_logo}</ItemTypography> */}
        <ItemTypography>automation: {item.automation}</ItemTypography>
        <ItemTypography>last_updated_at: {item.last_updated_at}</ItemTypography>
        <ItemTypography>code: {item.code}</ItemTypography>
        <ItemTypography>code_id: {item.code_id}</ItemTypography>
        <ItemTypography>orders: {item.orders}</ItemTypography>
        <ItemTypography>orders_cancellation_rate: {item.orders_cancellation_rate}</ItemTypography>
        <ItemTypography>revenue: {item.revenue}</ItemTypography>
        <ItemTypography>net_revenue: {item.net_revenue}</ItemTypography>
        <ItemTypography>revenue_cancellation_rate: {item.revenue_cancellation_rate}</ItemTypography>
        <ItemTypography>sales_amount: {item.sales_amount}</ItemTypography>
        <ItemTypography>net_sales_amount: {item.net_sales_amount}</ItemTypography>
        <ItemTypography>sales_amount_cancellation_rate: {item.sales_amount_cancellation_rate}</ItemTypography>
        <ItemTypography>sales_amount_usd: {item.sales_amount_usd}</ItemTypography>
        <ItemTypography>net_sales_amount_usd: {item.net_sales_amount_usd}</ItemTypography>
        <ItemTypography>sales_amount_usd_cancellation_rate: {item.sales_amount_usd_cancellation_rate}</ItemTypography>
        <ItemTypography>aov_usd: {item.aov_usd}</ItemTypography>
        <ItemTypography>net_aov_usd: {item.net_aov_usd}</ItemTypography>
        <ItemTypography>aov_usd_cancellation_rate: {item.aov_usd_cancellation_rate}</ItemTypography>
      </Box>
      <Box>
        users
      </Box>
    </Box>
  );
}

const Performance: FC = () => {
  // Backdrop and spinner
  const [showSpinner, setShowSpinner] = React.useState(false);

  const handleSpinnerClose = () => {
    setShowSpinner(false);
  };

  // Fetch data
  const { data: session } = useSession();
  const [report, setReport] = useState<any>();
  // useEffect(() => {
  //   setShowSpinner(true);
  //   fetch("/api/boostiny/performance").then(response => {
  //     return response.json();
  //   }).then(data => {
  //     console.log(data.payload);
  //     setReport(data.payload)
  //     setShowSpinner(false);
  //   })
  // }, []);
  return (
    <div>
      <MaterialUIPicker />
      {report && session?.user.privilege === "admin" && (
        <Box>
          <Typography variant="h4">Summary</Typography>
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
          </Box>
          <Divider />
          <Typography variant="h4">Performance</Typography>
          {<PerformanceTable rows={report.data}/>}
          {/* {report.data.map((item: any) => <PerformanceItem item={item} />)} */}
        </Box>

      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showSpinner}
        onClick={handleSpinnerClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Performance;
