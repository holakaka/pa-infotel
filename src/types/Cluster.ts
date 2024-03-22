import { IBaseHotel } from "./Hotel";

export interface ICluster {
  cluster_name: string;
  hotel_property: IBaseHotel[]
}
