import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Props {
  propertyCodeSelected: string[];
  propertyAttributeSelected: string;
  isShowChart: boolean;
}

const initialState: Props = {
  propertyCodeSelected: [],
  propertyAttributeSelected: "",
  isShowChart: false,
};
const actualdataSlice = createSlice({
  name: "actualdata",
  initialState,
  reducers: {
    setPropertyAttributeSelected: (state, action: PayloadAction<string>) => {
      state.propertyAttributeSelected = action.payload;
    },

    setPropertyCodeSelected: (state, action: PayloadAction<string[]>) => {
      state.propertyCodeSelected = action.payload;
    },
    setIsShowChart: (state, action: PayloadAction<boolean>) => {
      state.isShowChart = action.payload;
    },
  },
});

export const {
  setPropertyAttributeSelected,
  setPropertyCodeSelected,
  setIsShowChart,
} = actualdataSlice.actions;
export default actualdataSlice.reducer;
