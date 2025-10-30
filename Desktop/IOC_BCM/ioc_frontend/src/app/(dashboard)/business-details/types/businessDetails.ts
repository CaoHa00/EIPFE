export type OperatingFrequency = "regular" | "seasonal";

export interface GeneralInformationResponse {
  userDetailId: string;
  companyName: string;
  legalPresentative: string;
  phoneNumber: string;
  location: string;
  industrySector: string;
  scaleCapacity: string;
  businessRegistrationNumber: string;
  taxCode: string;
  operatingFrequency: OperatingFrequency;
  seasonalPeriod?: string;
}

export interface GeneralInformation {
  companyName: string;
  legalPresentative: string;
  phoneNumber: string;
  location: string;
  industrySector: string;
  scaleCapacity: string;
  businessRegistrationNumber: string;
  taxCode: string;
  operatingFrequency: OperatingFrequency;
  seasonalPeriod?: string;
}
