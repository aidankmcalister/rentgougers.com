export type RowData = {
  id: number;
  datePosted: Date; // A
  address: string; // B
  city: string; // C
  state: string; // D
  zip: string; // E
  rentalPrice: number; // F
  updatedRentalPrice: number; // G
  priceIncreaseDate: string; // H
  listingSite: string; // I
  listingUrl: string; // J
  rentalListingAgent?: string; // K
  propertyOwner?: string; // L
  additionalInfo: string; // M
  sourceGrabs: string[]; // N
  parcelId: string; // O
  listingAgentPhone?: string; // P
  listingAgentEmail?: string; // Q
  propertyOwnerPhone?: string; // R
  propertyOwnerEmail?: string; // S
  priceOriginalDate: string; // T
  percentIncrease: number;
  googleSheetLink: string;
  googleMapLink: string;
  housePossiblyRebuilt: boolean;
};
