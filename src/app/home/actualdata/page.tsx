"use client";
import { ReactElement, useEffect, useState } from "react";
import HeaderSelection from "./HeaderSelection";
import { ICluster } from "@/types/Cluster";
import { ActualData, Cluster } from "@/app/sampledata/ActualData";
import { IBaseHotel, IHotelInfo } from "@/types/Hotel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setListProperty,
  setListSelectedProperty,
} from "@/redux/slices/propertySlice";
import TableRecord from "./TableRecord";
import TableChart from "./TableChart";
import { setPropertyAttributeSelected } from "@/redux/slices/actualdataSlice";

export default function Page(): ReactElement {
  const [cluster, setCluster] = useState<ICluster[]>([]);
  const [hotelProperty, setHotelProperty] = useState<IBaseHotel[]>([]);
  const dispatch = useAppDispatch();
  const [mappedHotelInfo, setMappedHotelInfo] = useState<IHotelInfo[]>([]);
  const actualData = useAppSelector((state) => state.actualdata);

  useEffect(() => {
    // get data from template data Cluster
    const mappedCluster: ICluster[] = Cluster.map((clusterItem) => ({
      cluster_name: clusterItem.cluster_name,
      hotel_property: clusterItem.properties.map((property: IBaseHotel) => ({
        property_code: property.property_code,
        property_name: property.property_name,
      })),
    }));

    const allHotelProperties: IBaseHotel[] = mappedCluster.flatMap(
      (clusterItem) => clusterItem.hotel_property
    );

    setHotelProperty(allHotelProperties);
    setCluster(mappedCluster);
  }, []);
  useEffect(() => {
    const mappedHotelInfo: IHotelInfo[] = ActualData.map((actualdata) => ({
      _property_code: actualdata._property_code,
      total_room: actualdata.total_room,
      properties: {
        property_code: actualdata.properties.property_code,
        property_name: actualdata.properties.property_name,
      },
      revenue: actualdata.revenue
        ? {
            room_revenue: actualdata.revenue.room_revenue,
            fb_revenue: actualdata.revenue.fb_revenue,
            other_revenue: actualdata.revenue.other_revenue,
            total_revenue: actualdata.revenue.total_revenue,
          }
        : undefined,
      occ: actualdata.occ,
      adr: actualdata.adr,
      available_rooms: actualdata.available_rooms,
      hotel_rooms: actualdata.hotel_rooms,
      detail_rev: actualdata.detail_rev
        ? {
            occupied_room: actualdata.detail_rev.occupied_room,
            group_rooms: actualdata.detail_rev.group_rooms,
            transient_rooms: actualdata.detail_rev.transient_rooms,
          }
        : undefined,
      detail_rn: actualdata.detail_rn
        ? {
            occupied_room: actualdata.detail_rn.occupied_room,
            group_rooms: actualdata.detail_rn.group_rooms,
            transient_rooms: actualdata.detail_rn.transient_rooms,
          }
        : undefined,
      detail_occ: actualdata.detail_occ
        ? {
            occupied_room: actualdata.detail_occ.occupied_room,
            group_rooms: actualdata.detail_occ.group_rooms,
            transient_rooms: actualdata.detail_occ.transient_rooms,
          }
        : undefined,
      detail_adr: actualdata.detail_adr
        ? {
            occupied_room: actualdata.detail_adr.occupied_room,
            group_rooms: actualdata.detail_adr.group_rooms,
            transient_rooms: actualdata.detail_adr.transient_rooms,
          }
        : undefined,
    }));
    setMappedHotelInfo(mappedHotelInfo);
  }, []);
  useEffect(() => {
    dispatch(setPropertyAttributeSelected("Total Room in Hotel"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!mappedHotelInfo) return;
    const filteredHotelInfo: IHotelInfo[] = mappedHotelInfo.filter((info) =>
      actualData.propertyCodeSelected.includes(info._property_code)
    );
    dispatch(setListSelectedProperty(filteredHotelInfo));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualData.propertyCodeSelected, mappedHotelInfo]);
  useEffect(() => {
    if (hotelProperty) {
      dispatch(setListProperty(hotelProperty));
    }
  }, [dispatch, hotelProperty]);

  return (
    <div className=" h-screen w-full relative flex flex-col">
      <HeaderSelection />
      <div className="flex-1">
        {actualData.isShowChart ? <TableChart /> : <TableRecord />}
      </div>
    </div>
  );
}
