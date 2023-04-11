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
import { BoostinyPerformanceRecord } from "../../interfaces/boostiny-performance-report";

interface PerformanceTableProps {
  rows: (BoostinyPerformanceRecord | undefined)[];
  metricName: string[];
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({
  rows,
  metricName,
}) => {
  const { data: session } = useSession();
  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
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
            {metricName.includes("net_revenue") && (
              <TableCell>Net Revenue</TableCell>
            )}
            {metricName.includes("revenue_cancellation_rate") && (
              <TableCell>Revenue CR</TableCell>
            )}

            <TableCell>Sales Amount</TableCell>
            {metricName.includes("net_sales_amount") && (
              <TableCell>Net Sales Amount</TableCell>
            )}
            {metricName.includes("sales_amount_cancellation_rate") && (
              <TableCell>Sales Amount CR</TableCell>
            )}

            {metricName.includes("sales_amount_usd") && (
              <TableCell>Sales Amount USD</TableCell>
            )}
            {metricName.includes("net_sales_amount_usd") && (
              <TableCell>Net Sales Amount USD</TableCell>
            )}
            {metricName.includes("sales_amount_usd_cancellation_rate") && (
              <TableCell>Sales Amount CR USD</TableCell>
            )}

            {metricName.includes("aov_usd") && <TableCell>AOV USD</TableCell>}
            {/* <TableCell>Net AOV USD</TableCell> */}
            {metricName.includes("aov_usd_cancellation_rate") && (
              <TableCell>AOV USD CR</TableCell>
            )}

            {/* <TableCell>Month</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            (row, idx) =>
              row && (
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
                        row.couponMeta.userCoupons.map((el) => (
                          <span
                            className="whitespace-nowrap flex justify-center items-center"
                            key={`${el.userId}-${idx}`}
                          >
                            {el.user.name && el.user.image && (
                              <React.Fragment>
                                <Avatar
                                  alt={el.user.name}
                                  src={el.user.image}
                                  sx={{ width: 24, height: 24, mr: 1 }}
                                />
                                {el.user.name} ({el.percent}%)
                              </React.Fragment>
                            )}
                          </span>
                        ))}
                    </TableCell>
                  )}

                  {/* <TableCell>Conversions</TableCell>
              <TableCell>Net Conversions</TableCell>
              <TableCell>Conversions CR</TableCell> */}

                  <TableCell>{(+row.revenue).toFixed(2)}</TableCell>
                  {metricName.includes("net_revenue") && (
                    <TableCell>{(+row.net_revenue).toFixed(2)}</TableCell>
                  )}
                  {metricName.includes("revenue_cancellation_rate") && (
                    <TableCell>
                      {(+row.revenue_cancellation_rate).toFixed(2)}
                    </TableCell>
                  )}

                  <TableCell>{(+row.sales_amount).toFixed(2)}</TableCell>
                  {metricName.includes("net_sales_amount") && (
                    <TableCell>{(+row.net_sales_amount).toFixed(2)}</TableCell>
                  )}
                  {metricName.includes("sales_amount_cancellation_rate") && (
                    <TableCell>
                      {(+row.sales_amount_cancellation_rate).toFixed(2)}
                    </TableCell>
                  )}

                  {metricName.includes("sales_amount_usd") && (
                    <TableCell>{(+row.sales_amount_usd).toFixed(2)}</TableCell>
                  )}
                  {metricName.includes("net_sales_amount_usd") && (
                    <TableCell>
                      {(+row.net_sales_amount_usd).toFixed(2)}
                    </TableCell>
                  )}
                  {metricName.includes(
                    "sales_amount_usd_cancellation_rate"
                  ) && (
                    <TableCell>
                      {(+row.sales_amount_usd_cancellation_rate).toFixed(2)}
                    </TableCell>
                  )}

                  {metricName.includes("aov_usd") && (
                    <TableCell>{(+row.aov_usd).toFixed(2)}</TableCell>
                  )}
                  {/* <TableCell>{row.net_aov_usd}</TableCell> */}
                  {metricName.includes("aov_usd_cancellation_rate") && (
                    <TableCell>
                      {(+row.aov_usd_cancellation_rate).toFixed(2)}
                    </TableCell>
                  )}

                  {/* <TableCell>Month</TableCell> */}
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PerformanceTable;
