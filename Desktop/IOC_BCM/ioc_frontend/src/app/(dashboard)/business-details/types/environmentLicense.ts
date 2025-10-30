export type LicenseFile = {
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
};

export interface PrimaryLicense {
  hasLicense: true;
  licenseNumber: string;
  issueDate: string; // ISO yyyy-mm-dd
  issuer: string;
  file?: File | null;
}

export interface OtherLicense {
  id: string;
  licenseType: string;
  projectName: string;
  licenseNumber: string;
  issueDate: string;
  issuer: string;
  file?: File | null;
}

export type EnvironmentFormPayload = {
  // when hasLicense === true, provide primaryLicense info
  // when hasLicense === false, provide otherLicenses array
  hasLicense: boolean;
  primaryLicense?: Omit<PrimaryLicense, "hasLicense">;
  otherLicenses?: Omit<OtherLicense, "id">[];
  userAccountId?: string;
};
