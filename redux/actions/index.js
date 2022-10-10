import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  firstname: null,
  lastname: null,
  email: null,
  phone: null,
  alamat: null,
  kecamatan: null,
  kelurahan: null,
  kabupaten: null,
  provinsi: null,
  negara_asal: null,
  negara_tujuan: null,
  layanan: null,
  data: null,
};

export const dataInput = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    sendDataInput: (state, action) => {
      const data = action.payload;

      state.firstname = data.firstname;
      state.lastname = data.lastname;
      state.email = data.email;
      state.phone = data.phone;
      state.alamat = data.alamat;
      state.kecamatan = data.kecamatan;
      state.kelurahan = data.kelurahan;
      state.kabupaten = data.kabupaten;
      state.provinsi = data.provinsi;
      state.kode_pos = data.kode_pos;
      state.negara_asal = data.negara_asal;
      state.negara_tujuan = data.negara_tujuan;
      state.layanan = data.layanan;
      state.data = data.data
    },
    resetData: (state) => {
      state.firstname = null;
      state.lastname = null;
      state.email = null;
      state.phone = null;
      state.alamat = null;
      state.kecamatan = null;
      state.kelurahan = null;
      state.kabupaten = null;
      state.provinsi = null;
      state.kode_pos = null;
      state.negara_asal = null;
      state.negara_tujuan = null;
      state.layanan = null;
      state.data = null;
    },
  },
});

export const { sendDataInput, resetData } = dataInput.actions;
export default dataInput.reducer;