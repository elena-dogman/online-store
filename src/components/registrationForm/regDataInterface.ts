export interface RegistrationData {
  name: string;
  lastName: string;
  password: string;
  mailValue: string;
  DOB: string;
  shippingAddress: Address;
  billingAddress: Address;
  key?: string;
}

export interface Address {
  city: string;
  country: string;
  postaCode: string;
  streetName: string;
}
