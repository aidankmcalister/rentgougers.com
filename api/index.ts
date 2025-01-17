import { load } from "cheerio";
import { RowData } from "../app/types/RowData";

// Use the HTML view for the "All Submissions" tab (gid=314416722):
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1RXWxLqTyWvAuq8A0PgaBuWeEn_G6qTLyTZ8lzfNEaNw/htmlview?gid=314416722";

// Helper to safely convert a string like "$1,200" to a number. Returns 0 if invalid or empty.
const parsePrice = (val: string | undefined): number => {
  if (!val) return 0;
  return Number(val.replace(/\$/g, "").replace(/,/g, "").trim()) || 0;
};

// Export the function to fetch and process the data
export const fetchSubmissionsData = async (): Promise<RowData[]> => {
  // 1) Fetch the HTML of the "All Submissions" tab
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

  // Filter out obviously short/empty rows. Adjust the threshold as needed.
  const filteredRows = tableRows.filter(
    (row) => row.filter(Boolean).length > 5
  );

  /*
    Depending on your sheet structure, you might need to remove
    one or two "header" rows. For example, if row[0] is the column
    headers and row[1] might be a sub-header, you can do:

      filteredRows.splice(0, 2);

    Adjust if you only have a single header row. For now, let's assume
    your first *two* rows are headers and you want to start data
    from the 3rd row in the sheet.
  */
  filteredRows.splice(0, 2);

  // 4) Map each row to your RowData model
  const jsonData: RowData[] = filteredRows.map((row, index) => {
    // Original rental price & updated rental price for percent increase calc
    const originalRentalNum = parsePrice(row[6]);
    const updatedRentalNum = parsePrice(row[7]);

    // Calculate percent increase
    let percentIncrease = "0";
    if (originalRentalNum > 0 && updatedRentalNum > 0) {
      const increase =
        ((updatedRentalNum - originalRentalNum) / originalRentalNum) * 100;
      percentIncrease = increase.toFixed();
    }

    // The row index in the final data is `index`, but the actual row in the sheet
    // (because we spliced out 2 header rows) is `index + 3`.
    // Example: if `index=0` in the filtered array, that corresponds to row #3 in the sheet.
    const sheetRow = index + 3;

    const record: RowData = {
      id: sheetRow - 1, // e.g. row #3 in sheet => id=2
      date: row[1],
      address: row[2],
      city: row[3],
      state: row[4],
      zip: row[5],
      rentalPrice: row[6]?.replace(/\.00$/, "") ?? "",
      updatedRentalPrice: row[7]?.replace(/\.00$/, "") ?? "",
      priceIncreaseDate: row[8],
      listingSite: row[9],
      listingUrl: row[10],
      // If your columns shift, verify these indexes are correct:
      additionalInfo: row[13] ?? "",
      sourceGrabs: row[14] ? row[14].split(",").map((s) => s.trim()) : [],
      parcelId: row[15] ?? "",
      priceOriginalDate: row[20] ?? "",
      percentIncrease,
      // Build a direct link to the row in the sheet
      googleSheetLink: `https://docs.google.com/spreadsheets/d/1RXWxLqTyWvAuq8A0PgaBuWeEn_G6qTLyTZ8lzfNEaNw/edit?gid=314416722&range=A${sheetRow}`,
      // Google Maps search link
      googleMapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${row[2]} ${row[3]} ${row[4]} ${row[5]}`
      )}`,
    };
    return record;
  });

  // 5) Return the final JSON data
  return jsonData;
};
