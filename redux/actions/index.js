import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  sort: "terbaru",
  subsektor_id: undefined,
  provinsi_id: undefined,
  kota_id:undefined
};

export const beritaInfo = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    changeState: (state, action) => {
      const data = action.payload;
      state.sort = data.sort;
      state.subsektor_id = data.subsektor_id;
      state.provinsi_id = data.provinsi_id
      state.kota_id = data.kota_id
    },
  },
});

export const { changeState, resetData } = beritaInfo.actions;
export default beritaInfo.reducer;
