import { XataClient } from "~/utils/xata";

export const fetchRentData = async () => {
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

  return records;
};
