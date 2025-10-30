export interface YearlyOperational {
  product_volume: number | ""; // numeric
  product_unit: string;
  fuel_consumption: number | "";
  fuel_unit: string;
  electricity_consumption: number | "";
  water_consumption: number | "";
}

export interface OperationalPayload {
  year: number;
  data: YearlyOperational;
}

export interface OperationalFormPayload {
  years: OperationalPayload[]; // two entries, most-recent-first
  userAccountId?: string;
}
