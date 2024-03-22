import { ActualData, HeaderActualData } from "@/app/sampledata/ActualData";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setListSelectedProperty } from "@/redux/slices/propertySlice";
import {
  IBaseHotel,
  IHotelInfo,
  IHotelRevenue,
  IHotelTypeRoom,
} from "@/types/Hotel";
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { TableVirtuoso } from "react-virtuoso";
interface Props {}
export default function TableRecord({}: Props): ReactElement {
  const [heightVirtualList, setHeightVirtualList] = useState<number>(0);
  const divVirtualListRef = useRef<HTMLDivElement>(null);
  const property = useAppSelector((state) => state.property);
  const actualData = useAppSelector((state) => state.actualdata);

  const dispatch = useAppDispatch();

  const [sumState, setSumState] = useState<{
    sum_total_rooms: number;
    sum_room_venue: number;
    sum_fb_venue: number;
    sum_other_venue: number;
    sum_total_venue: number;
    sum_occ: number;
    sum_adr: number;
    sum_hotel_room: number;
    sum_available_rooms: number;
    sum_rev_occ: number;
    sum_rev_grp: number;
    sum_rev_trans: number;
    sum_rn_occ: number;
    sum_rn_grp: number;
    sum_rn_trans: number;
    sum_occ_occ: number;
    sum_occ_grp: number;
    sum_occ_trans: number;
    sum_adr_occ: number;
    sum_adr_grp: number;
    sum_adr_trans: number;
  }>({
    sum_total_rooms: 0,
    sum_room_venue: 0,
    sum_fb_venue: 0,
    sum_other_venue: 0,
    sum_total_venue: 0,
    sum_occ: 0,
    sum_adr: 0,
    sum_hotel_room: 0,
    sum_available_rooms: 0,
    sum_rev_occ: 0,
    sum_rev_grp: 0,
    sum_rev_trans: 0,
    sum_rn_occ: 0,
    sum_rn_grp: 0,
    sum_rn_trans: 0,
    sum_occ_occ: 0,
    sum_occ_grp: 0,
    sum_occ_trans: 0,
    sum_adr_occ: 0,
    sum_adr_grp: 0,
    sum_adr_trans: 0,
  });
  const headers: string[] = HeaderActualData;

  // Tính height cho Virtuallist dựa vào div contain
  useLayoutEffect(() => {
    const handleWindowResize = () => {
      if (divVirtualListRef.current) {
        setHeightVirtualList(divVirtualListRef.current.clientHeight);
      }
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  useEffect(() => {
    if (!property.setListSelectedProperty) return;

    const sum: typeof sumState = property.setListSelectedProperty.reduce(
      (accumulator, currentValue) => {
        accumulator.sum_total_rooms += currentValue.total_room ?? 0;
        accumulator.sum_room_venue += currentValue.revenue?.room_revenue ?? 0;
        accumulator.sum_fb_venue += currentValue.revenue?.fb_revenue ?? 0;
        accumulator.sum_other_venue += currentValue.revenue?.other_revenue ?? 0;
        accumulator.sum_total_venue += currentValue.revenue?.total_revenue ?? 0;
        accumulator.sum_occ += currentValue.occ ?? 0;
        accumulator.sum_adr += currentValue.adr ?? 0;
        accumulator.sum_hotel_room += currentValue.hotel_rooms ?? 0;
        accumulator.sum_available_rooms += currentValue.available_rooms ?? 0;
        accumulator.sum_rev_occ += currentValue.detail_rev?.occupied_room ?? 0;
        accumulator.sum_rev_grp += currentValue.detail_rev?.group_rooms ?? 0;
        accumulator.sum_rev_trans +=
          currentValue.detail_rev?.transient_rooms ?? 0;
        accumulator.sum_rn_occ += currentValue.detail_rn?.occupied_room ?? 0;
        accumulator.sum_rn_grp += currentValue.detail_rn?.group_rooms ?? 0;
        accumulator.sum_rn_trans +=
          currentValue.detail_rn?.transient_rooms ?? 0;
        accumulator.sum_occ_occ += currentValue.detail_occ?.occupied_room ?? 0;
        accumulator.sum_occ_grp += currentValue.detail_occ?.group_rooms ?? 0;
        accumulator.sum_occ_trans +=
          currentValue.detail_occ?.transient_rooms ?? 0;
        accumulator.sum_adr_occ += currentValue.detail_adr?.occupied_room ?? 0;
        accumulator.sum_adr_grp += currentValue.detail_adr?.group_rooms ?? 0;
        accumulator.sum_adr_trans +=
          currentValue.detail_adr?.transient_rooms ?? 0;
        return accumulator;
      },
      {
        sum_total_rooms: 0,
        sum_room_venue: 0,
        sum_fb_venue: 0,
        sum_other_venue: 0,
        sum_total_venue: 0,
        sum_occ: 0,
        sum_adr: 0,
        sum_hotel_room: 0,
        sum_available_rooms: 0,
        sum_rev_occ: 0,
        sum_rev_grp: 0,
        sum_rev_trans: 0,
        sum_rn_occ: 0,
        sum_rn_grp: 0,
        sum_rn_trans: 0,
        sum_occ_occ: 0,
        sum_occ_grp: 0,
        sum_occ_trans: 0,
        sum_adr_occ: 0,
        sum_adr_grp: 0,
        sum_adr_trans: 0,
      }
    );
    setSumState(sum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property.setListSelectedProperty]);

  return (
    <div
      className={` h-[98dvh] md:h-[calc(100dvh-9rem)] min-h-56 w-[95%] mt-4 bg-white absolute left-1/2 -translate-x-1/2 rounded-t-lg overflow-hidden`}
      ref={divVirtualListRef}
    >
      <TableVirtuoso
        style={{ height: heightVirtualList }}
        data={property.setListSelectedProperty}
        className="rounded-t-lg"
        fixedHeaderContent={() => (
          <tr>
            {headers.map((header: string, index: number) => {
              return (
                <th
                  key={index}
                  className="w-max mx-2 min-w-6 bg-pa-home-blue-light border-2 px-4 text-lg font-medium"
                >
                  {header}
                </th>
              );
            })}
          </tr>
        )}
        fixedFooterContent={() => {
          return (
            <tr>
              <th className="w-max mx-2 min-w-6 bg-pa-home-blue-light border-2 px-4 text-lg font-medium">
                Grand Total
              </th>

              {Object.keys(sumState).map((key) => (
                <th
                  key={key}
                  className="w-max mx-2 min-w-6 bg-pa-home-blue-light border-2 px-4 text-lg font-medium"
                >
                  {sumState[key as keyof typeof sumState]}
                </th>
              ))}
            </tr>
          );
        }}
        itemContent={(index, property) => {
          const even: boolean = index % 2 === 0;
          return (
            <>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property._property_code}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.total_room}
              </td>

              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.revenue?.room_revenue}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.revenue?.fb_revenue}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.revenue?.other_revenue}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.revenue?.total_revenue}
              </td>
              {/* dddddddddd */}
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.occ}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.adr}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.hotel_rooms}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.available_rooms}
              </td>
              {/* Detail Rev */}
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_rev?.occupied_room}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_rev?.group_rooms}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_rev?.transient_rooms}
              </td>
              {/* Detail RN */}
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_rn?.occupied_room}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_rn?.group_rooms}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_rn?.transient_rooms}
              </td>
              {/* Detail OCC */}
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_occ?.occupied_room}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_occ?.group_rooms}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_occ?.transient_rooms}
              </td>
              {/* Detail ADR */}
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_adr?.occupied_room}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_adr?.group_rooms}
              </td>
              <td
                className={`${
                  even ? "bg-pa-dark-light" : "bg-pa-home-grey"
                } py-3 text-center  border border-white`}
              >
                {property.detail_adr?.transient_rooms}
              </td>
            </>
          );
        }}
      />
    </div>
  );
}
