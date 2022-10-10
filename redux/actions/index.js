import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  sort: "terbaru",
  subsektor_id: 0,  
  provinsi_id:0
};

export const dataInput = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    changeState: (state, action) => {
      const data = action.payload;
      state.sort = data.sort

    },
    resetData: (state) => {
      state.sort = "terbaru",
      state.subsektor_id = 0,  
      state.provinsi_id = 0
    },
  },
});

export const { changeState, resetData } = dataInput.actions;
export default dataInput.reducer;
