import { PropertiesRecord, XataClient } from "~/utils/xata";

export const fetchRentData = async (): Promise<PropertiesRecord[]> => {
  const xata = new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH,
  });
  const records = await xata.db.Properties.sort("address", "desc")
    .select([
      "xata_id",
      "additionalInfo",
      "address",
      "city",
      "datePosted",
      "googleMapLink",
      "googleSheetLink",
      "google_sheet_id",
      "housePossiblyRebuilt",
      "listingSite",
      "listingUrl",
      "parcelId",
      "percentIncrease",
      "priceIncreaseDate",
      "priceOriginalDate",
      "rentalPrice",
      "sourceGrabs",
      "state",
      "updatedRentalPrice",
      "zip",
    ])
    .getAll();

  return records.map((record) => ({
    ...record,
  })) as PropertiesRecord[];
};

export const getPriceChartData = async ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
} = {}) => {
  const records = await fetchRentData();

  let filteredRecords = records;

  if (startDate && endDate) {
    filteredRecords = records.filter(
      (record: PropertiesRecord) =>
        record.datePosted &&
        record.datePosted >= startDate &&
        record.datePosted <= endDate
    );
  }

  filteredRecords = filteredRecords.filter(
    (record) =>
      record.rentalPrice !== undefined && record.datePosted !== undefined
  );

  const chartData = filteredRecords.map((record: PropertiesRecord) => ({
    key: record.datePosted,
    data: record.rentalPrice,
  }));
  return chartData;
};
