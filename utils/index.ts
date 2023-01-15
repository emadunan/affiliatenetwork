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