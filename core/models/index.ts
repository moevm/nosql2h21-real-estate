/*
    TODO:
    add to all shemes
    createdAt
    updatedAt
*/

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

export enum AdvTarget {
  sell,
  rents,
}

export interface Adv {
  _id: string;
  owner: User;
  title: string;
  price: number;
  house: House;
  target: AdvTarget;
  tags: Tag[];
}

export interface Tag {
  _id: string;
  name: string;
}
export interface Reply {
  _id: string;
  owner: User;
  text: string;
  rating: number;
}

export interface Address {
  x: number;
  y: number;
  value: string; // calc from map when created
  floor: number;
  door: number;
}
export enum HouseType {
  house,
  flat,
  apartament,
}
export enum FinishingType {
  NORM,
  NENORM,
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
  Replys: Reply[];
}
