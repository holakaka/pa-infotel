export interface IBaseHotel {
  property_code: string;
  property_name: string;
}
export interface IHotelRevenue {
  room_revenue: number;
  fb_revenue: number;
  other_revenue: number;
  total_revenue: number;
}
export interface IHotelTypeRoom {
  occupied_room: number;
  group_rooms: number;
  transient_rooms: number;
}
export interface IHotelInfo {
  _property_code: string;
  total_room: number;
  properties: IBaseHotel;
  revenue?: IHotelRevenue;
  occ?: number;
  adr?: number;
  available_rooms: number;
  hotel_rooms: number;
  detail_rev?: IHotelTypeRoom;
  detail_rn?: IHotelTypeRoom;
  detail_occ?: IHotelTypeRoom;
  detail_adr?: IHotelTypeRoom;
}
