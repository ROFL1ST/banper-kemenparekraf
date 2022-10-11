import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  sort: "terbaru",
  subsektor_id: undefined,
  provinsi_id: undefined,
};

export const dataInput = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    changeState: (state, action) => {
      const data = action.payload;
      state.sort = data.sort;
      state.subsektor_id = data.subsektor_id;
    },
    resetData: (state) => {
      state.sort = "terbaru";
      state.provinsi_id = null;
      state.subsektor_id = null;
    },
  },
});

export const { changeState, resetData } = dataInput.actions;
export default dataInput.reducer;
