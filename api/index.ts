import { load } from "cheerio";
import { RowData } from "../app/types/RowData";

// Replace this with the URL that specifically shows the "All Submissions" tab
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1RXWxLqTyWvAuq8A0PgaBuWeEn_G6qTLyTZ8lzfNEaNw/edit?gid=314416722#gid=314416722";

// Export the function to fetch and process the data
export const fetchSubmissionsData = async () => {
  // 1) Fetch the HTML for the "All Submissions" tab
  const response = await fetch(SHEET_URL);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  const html = await response.text();

  // 2) Load HTML into Cheerio
  const $ = load(html);

  // 3) Extract rows from the first (and presumably only) 'table.waffle'
  const tableRows: string[][] = [];
  $("table.waffle tr").each((_, rowElem) => {
    const rowData: string[] = [];
    $(rowElem)
      .find("td, th")
      .each((_, cellElem) => {
        rowData.push($(cellElem).text().trim());
      });
    tableRows.push(rowData);
  });

  // 4) Assume the first row is headers (adjust the index if your headers are lower)
  const [headers, ...rows] = tableRows;

  // 5) Convert each subsequent row to an object keyed by the headers
  const jsonData: RowData[] = rows.map((row, index) => {
    const record: RowData = {
      id: index,
      date: row[1],
      address: row[2],
      city: row[3],
      state: row[4],
      zip: row[5],
      rentalPrice: row[6].replace(/\.00$/, ""),
      updatedRentalPrice: row[7].replace(/\.00$/, ""),
      priceIncreaseDate: row[8],
      listingSite: row[9],
      listingUrl: row[10],
      rentalListingAgent: row[11],
      propertyOwner: row[12],
      additionalInfo: row[13],
      sourceGrabs: row[14] ? row[14].split(",").map((s) => s.trim()) : [],
      parcelId: row[15],
      listingAgentPhone: row[16],
      listingAgentEmail: row[17],
      propertyOwnerPhone: row[18],
      propertyOwnerEmail: row[19],
      priceOriginalDate: row[20],
      percentIncrease:
        "%" +
        (
          ((Number(row[7].replace("$", "").replace(",", "")) -
            Number(row[6].replace("$", "").replace(",", ""))) /
            Number(row[6].replace("$", "").replace(",", ""))) *
          100
        ).toFixed(),
    };
    return record;
  });

  // removes the first item which was the header row
  jsonData.shift();
  // 6) Return the JSON data
  return jsonData;
};
