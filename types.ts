export interface IHotel {
  _id?: string; // optional if you're using MongoDB default id

  name: string;
  address1: string;
  airportCode: string;

  city?: string;
  countryCode?: string;

  highRate?: number;
  lowRate?: number;

  propertyCategory?: number;
  stateProvinceCode?: string;

  thumbNailUrl?: string;

  gallery?: string[]; // better than Array
  amenities?: string[]; // better than Array

  overview?: string;
}

export interface IBooking {
  _id: string;
  hotelId: IHotel;
  userId: string;
  checkin: string;
  checkout: string;
}

export interface SearchTerm {
  destination: string;
  checkin: string;
  checkout: string;
}

export interface SearchContextWithFilters {
  destination: string;
  checkin: string;
  checkout: string;
  category: string;
  price: string;
  sort: string;
}
