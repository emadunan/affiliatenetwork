/**
* @description A function to compair single provided campaign primary data with array of tuples with the same format
* @constructor
* @param {[string, string][]} campaignsArray - Tuple contains id and network name of the campaign
* @param {[string, string]} campaign - Array of tuples contain id and network to compare with
*/
export function isTupleInArr(campaignsArray: [string, string][], campaignX: [string, string]) {
  for (const campaign of campaignsArray) {
    if (campaign[0] === campaignX[0] && campaign[1] === campaignX[1]) {
      return true;
    }
  }

  return false;
}

/**
 * 
 * @param date - Date to be transformed into YYYY-MM-DD format
 * @returns
 */
export function formatDate(date = new Date()) {
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });

  return [year, month, day].join('-');
}

//   'campaign_name',                     //   campaign_name                      String
//   'campaign_logo',                     //   campaign_logo                      String
//   'automation',                        //   automation                         String
//   'last_updated_at',                   //   last_updated_at                    DateTime
                                          //   last_fetched_at                    DateTime
//   'code',                              //   code                               String
//   'date',
//   'original_currency',
//   'country',
//   'customer_type',
//   'ad_set',
//   'month',
//   'month_number',
//   'order_id',
//   'aov',
//   'net_orders',                          //   net_orders                         String
//   'net_revenue',                         //   net_revenue                        String
//   'net_sales_amount',                    //   net_sales_amount                   String
//   'net_sales_amount_usd',                //   net_sales_amount_usd               String
//   'net_aov_usd',                         //   net_aov_usd                        String
//   'orders',                              //   orders                             String
//   'revenue',                              //   revenue                            String
//   'sales_amount',                         //   sales_amount                       String
//   'sales_amount_usd',                     //   sales_amount_usd                   String
//   'aov_usd',                              //   aov_usd                            String
//   'orders_cancellation_rate',             //   orders_cancellation_rate           String
//   'sales_amount_usd_cancellation_rate',   //   sales_amount_usd_cancellation_rate String
//   'revenue_cancellation_rate',            //   revenue_cancellation_rate          String
//   'sales_amount_cancellation_rate',       //   sales_amount_cancellation_rate     String
//   'aov_usd_cancellation_rate'             //   aov_usd_cancellation_rate          String


//   id                                 String @id @default(cuid())
//   full_count                         String
//   campaign_id                        String
//   code_id                            String



export function boostinyCSVTextToJSON(content: string) {
  const headString = "campaign_name,campaign_logo,automation,last_updated_at,code,date,original_currency,country,customer_type,ad_set,month,month_number,order_id,aov,net_orders,net_revenue,net_sales_amount,net_sales_amount_usd,net_aov_usd,orders,revenue,sales_amount,sales_amount_usd,aov_usd,orders_cancellation_rate,sales_amount_usd_cancellation_rate,revenue_cancellation_rate,sales_amount_cancellation_rate,aov_usd_cancellation_rate";

  const lines = content.split("\n");

  const row1 = lines[4];
  const head = row1.split(",");

  if (row1.trim() !== headString) {
    throw new Error("Invalid Boostiny CSV content, missing some columns!!");
  }

  const rows = lines.slice(5, lines.length - 3);
  const orders = rows.map(line => {
    const data = line.split(",");

    return {
      campaign_name: data[0],
      campaign_logo: data[1],
      automation: data[2],
      last_updated_at: new Date(data[3]),
      code: data[4],
      date: new Date(data[5]),
      original_currency: data[6],
      country: data[7],
      customer_type: data[8],
      ad_set: data[9],
      month: data[10],
      month_number: data[11],
      order_id: data[12],
      aov: data[13],
      net_orders: data[14],
      net_revenue: data[15],
      net_sales_amount: data[16],
      net_sales_amount_usd: data[17],
      net_aov_usd: data[18],
      orders: data[19],
      revenue: data[20],
      sales_amount: data[21],
      sales_amount_usd: data[22],
      aov_usd: data[23],
      orders_cancellation_rate: data[24],
      sales_amount_usd_cancellation_rate: data[25],
      revenue_cancellation_rate: data[26],
      sales_amount_cancellation_rate: data[27],
      aov_usd_cancellation_rate: data[28],
    }
  });

  return orders.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return (new Date(a.date) as unknown as number) - (new Date(b.date) as unknown as number);
  });
}
