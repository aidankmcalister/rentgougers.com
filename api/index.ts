import { load } from "cheerio";
import { RowData } from "../app/types/RowData";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1RXWxLqTyWvAuq8A0PgaBuWeEn_G6qTLyTZ8lzfNEaNw/htmlview?gid=314416722";

const parsePrice = (val: string | undefined): number => {
  if (!val) return 0;
  return Number(val.replace(/\$/g, "").replace(/,/g, "").trim()) || 0;
};

export const fetchRentData = async (): Promise<RowData[]> => {
  const response = await fetch(SHEET_URL);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  const html = await response.text();

  const $ = load(html);

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

  const filteredRows = tableRows.filter(
    (row) => row.filter(Boolean).length > 5
  );

  filteredRows.splice(0, 2);

  const jsonData: RowData[] = filteredRows.map((row, index) => {
    const originalRentalNum = parsePrice(row[6]);
    const updatedRentalNum = parsePrice(row[7]);

    let percentIncrease = 0;
    if (originalRentalNum > 0 && updatedRentalNum > 0) {
      const increase =
        ((updatedRentalNum - originalRentalNum) / originalRentalNum) * 100;
      percentIncrease = parseFloat(increase.toFixed());
    }

    const sheetRow = index + 3;

    const record: RowData = {
      id: sheetRow - 1,
      date: row[1],
      address: row[2],
      city: row[3],
      state: row[4],
      zip: row[5],
      rentalPrice: originalRentalNum,
      updatedRentalPrice: updatedRentalNum,
      priceIncreaseDate: row[8],
      listingSite: row[9],
      listingUrl: row[10],
      additionalInfo: row[13] ?? "",
      sourceGrabs: row[14] ? row[14].split(",").map((s) => s.trim()) : [],
      parcelId: row[15] ?? "",
      priceOriginalDate: row[20] ?? "",
      percentIncrease,
      googleSheetLink: `https://docs.google.com/spreadsheets/d/1RXWxLqTyWvAuq8A0PgaBuWeEn_G6qTLyTZ8lzfNEaNw/edit?gid=314416722&range=A${sheetRow}`,
      googleMapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${row[2]} ${row[3]} ${row[4]} ${row[5]}`
      )}`,
      housePossiblyRebuilt: percentIncrease > 500,
    };
    return record;
  });

  return jsonData;
};
