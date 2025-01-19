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

export const getDatePostedOrGougedChartData = async ({
  type,
  startDate,
  endDate,
}: {
  type: "gouged" | "posted";
  startDate?: string;
  endDate?: string;
}) => {
  const records = await fetchRentData();

  let filteredRecords = records;

  if (startDate && endDate) {
    filteredRecords = records.filter((record: PropertiesRecord) => {
      const dateField =
        type === "posted" ? record.datePosted : record.priceIncreaseDate;
      return dateField && dateField >= startDate && dateField <= endDate;
    });
  }

  filteredRecords = filteredRecords.filter(
    (record) =>
      record.rentalPrice !== undefined &&
      (type === "posted"
        ? record.datePosted !== undefined
        : record.priceIncreaseDate !== undefined)
  );

  const chartData = filteredRecords.map((record: PropertiesRecord) => ({
    key: type === "posted" ? record.datePosted : record.priceIncreaseDate,
    data: record.rentalPrice,
  }));
  return chartData;
};
