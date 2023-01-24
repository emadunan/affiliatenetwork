/**
* @description A function to compair single provided campaign primary data with array of tuples with the same format
* @constructor
* @param {[string, string][]} campaignsArray - Tuple contains id and network name of the campaign
* @param {[string, string]} campaign - Array of tuples contain id and network to compare with
*/
export function isTupleInArr(campaignsArray: [string, string][], campaignX : [string, string]) {
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
  const year = date.toLocaleString('default', {year: 'numeric'});
  const month = date.toLocaleString('default', {month: '2-digit'});
  const day = date.toLocaleString('default', {day: '2-digit'});

  return [year, month, day].join('-');
}
