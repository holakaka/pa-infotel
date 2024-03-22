import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Props {
  attributeSelected: string[];
  forecastPeriodSelected: string;
}

const initialState: Props = {
  attributeSelected: [],
  forecastPeriodSelected: "",
};
const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setForecastPeriodSelected: (state, action: PayloadAction<string>) => {
      state.forecastPeriodSelected = action.payload;
    },

    setAttributeSelected: (state, action: PayloadAction<string[]>) => {
      state.attributeSelected = action.payload;
    },
  },
});

export const { setForecastPeriodSelected, setAttributeSelected } =
  forecastSlice.actions;
export default forecastSlice.reducer;
