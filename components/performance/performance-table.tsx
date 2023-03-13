import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";

interface PerformanceTableProps {
  rows: any[];
  metricName: string[];
}

/*
  <ItemTypography>Full count: {item.full_count}</ItemTypography>
  <ItemTypography>Campaign Name: {item.campaign_name}</ItemTypography>
  <ItemTypography>Campaign Id: {item.campaign_id}</ItemTypography>
  // <ItemTypography>Campaign logo: {item.campaign_logo}</ItemTypography>
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
*/

const PerformanceTable: React.FC<PerformanceTableProps> = ({ rows, metricName }) => {
  const { data: session } = useSession();
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell></TableCell>
            <TableCell>Campaign</TableCell>
            {/* <TableCell>Country</TableCell> */}
            <TableCell>Coupon</TableCell>
            {/* <TableCell>Adset</TableCell> */}
            {/* <TableCell>Date</TableCell> */}

            {/* <TableCell>Original Currency</TableCell> */}
            {/* <TableCell>AOV</TableCell> */}
            {/* <TableCell>Customer Type</TableCell> */}
            {/* <TableCell>Order Id</TableCell> */}

            {session?.user.privilege === "admin" && (
              <TableCell>Publishers</TableCell>
            )}

            {/* <TableCell>Conversions</TableCell>
            <TableCell>Net Conversions</TableCell>
            <TableCell>Conversions CR</TableCell> */}

            <TableCell>Revenue</TableCell>
            <TableCell>Net Revenue</TableCell>
            <TableCell>Revenue CR</TableCell>

            {metricName.includes("sales_amount") && <TableCell>Sales Amount</TableCell>}
            {metricName.includes("net_sales_amount") && <TableCell>Net Sales Amount</TableCell>}
            {metricName.includes("sales_amount_cancellation_rate") && <TableCell>Sales Amount CR</TableCell>}

            {metricName.includes("sales_amount_usd") && <TableCell>Sales Amount USD</TableCell>}
            {metricName.includes("net_sales_amount_usd") && <TableCell>Net Sales Amount USD</TableCell>}
            {metricName.includes("sales_amount_usd_cancellation_rate") && <TableCell>Sales Amount CR USD</TableCell>}

            {metricName.includes("aov_usd") && <TableCell>AOV USD</TableCell>}
            {/* <TableCell>Net AOV USD</TableCell> */}
            {metricName.includes("aov_usd_cancellation_rate") && <TableCell>AOV USD CR</TableCell>}

            {/* <TableCell>Month</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <Avatar
                  alt={row.campaign_name}
                  src={row.campaign_logo}
                  sx={{ width: 24, height: 24, mr: 1 }}
                />
              </TableCell>
              <TableCell>{row.campaign_name}</TableCell>
              {/* <TableCell>Country</TableCell> */}
              <TableCell>{row.code}</TableCell>
              {/* <TableCell>Adset</TableCell> */}
              {/* <TableCell>Date</TableCell> */}

              {/* <TableCell>Original Currency</TableCell> */}
              {/* <TableCell>AOV</TableCell> */}
              {/* <TableCell>Customer Type</TableCell> */}
              {/* <TableCell>Order Id</TableCell> */}

              {session?.user.privilege === "admin" && (
                <TableCell>
                  {row.couponMeta &&
                    row.couponMeta.userCoupons.map((el: any) => (
                      <span
                        className="whitespace-nowrap flex justify-center items-center"
                        key={el.user.userId}
                      >
                        <Avatar
                          alt={el.user.name}
                          src={el.user.image}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        {el.user.name} ({el.percent}%)
                      </span>
                    ))}
                </TableCell>
              )}

              {/* <TableCell>Conversions</TableCell>
              <TableCell>Net Conversions</TableCell>
              <TableCell>Conversions CR</TableCell> */}

              <TableCell>{(+row.revenue).toFixed(2)}</TableCell>
              <TableCell>{(+row.net_revenue).toFixed(2)}</TableCell>
              <TableCell>{(+row.revenue_cancellation_rate).toFixed(2)}</TableCell>

              {metricName.includes("sales_amount") && <TableCell>{(+row.sales_amount).toFixed(2)}</TableCell>}
              {metricName.includes("net_sales_amount") && <TableCell>{(+row.net_sales_amount).toFixed(2)}</TableCell>}
              {metricName.includes("sales_amount_cancellation_rate") && <TableCell>{(+row.sales_amount_cancellation_rate).toFixed(2)}</TableCell>}

              {metricName.includes("sales_amount_usd") && <TableCell>{(+row.sales_amount_usd).toFixed(2)}</TableCell>}
              {metricName.includes("net_sales_amount_usd") && <TableCell>{(+row.net_sales_amount_usd).toFixed(2)}</TableCell>}
              {metricName.includes("sales_amount_usd_cancellation_rate") && <TableCell>{(+row.sales_amount_usd_cancellation_rate).toFixed(2)}</TableCell>}

              {metricName.includes("aov_usd") && <TableCell>{(+row.aov_usd).toFixed(2)}</TableCell>}
              {/* <TableCell>{row.net_aov_usd}</TableCell> */}
              {metricName.includes("aov_usd_cancellation_rate") && <TableCell>{(+row.aov_usd_cancellation_rate).toFixed(2)}</TableCell>}

              {/* <TableCell>Month</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PerformanceTable;
