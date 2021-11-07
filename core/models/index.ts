export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  rating: number;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export enum AdvTargetType {
  sell,
  rents,
}

export interface Advertisement {
  _id: string;
  title: string;
  price: number;
  house: House;
  target: AdvTargetType;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  _id: string;
  value: string;
}
export interface Reply {
  _id: string;
  owner: User;
  text: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  lat: number;
  lng: number;
  value: string;
  floor: number;
  door: number;
}
export enum HouseType {
  house,
  flat,
  apartment,
}
export enum FinishingType {
  norm,
  nenorm,
}

export interface House {
  _id: string;
  owner: User;
  address: Address;

  photo: string[];

  description: string;
  type: HouseType;

  size: number; // метраж

  hasBalcony: boolean;
  countBathrooms: number;
  countRoom: number;
  year: number;
  finishing: FinishingType;
  lenToMetro: number; // calc from map when created

  rating: number;
  replies: Reply[];
}
