import { IBaseHotel, IHotelInfo } from "@/types/Hotel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Props {
  setListProperty: IBaseHotel[];
  setListSelectedProperty: IHotelInfo[];
}
const initialState: Props = {
  setListProperty: [],
  setListSelectedProperty: [],
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setListProperty: (state, action: PayloadAction<IBaseHotel[]>) => {
      state.setListProperty = action.payload;
    },
    setListSelectedProperty: (state, action: PayloadAction<IHotelInfo[]>) => {
      state.setListSelectedProperty = action.payload;
    },
  },
});

export const { setListProperty, setListSelectedProperty } =
  propertySlice.actions;
export default propertySlice.reducer;
