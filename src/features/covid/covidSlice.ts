import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import prefectureData from './prefectureData.json';

type prefectureApiData = typeof prefectureData;
export type covidState = typeof prefectureData.data;
type covidStatePrefectureData = typeof prefectureData.data.data.hokkaido;
export type covidStateDataPrefectureCount = typeof prefectureData.data.data.hokkaido.hospitalize;
export type covidStatePrefectureDataKeyString = {
  [key: string]: covidStatePrefectureData;
};

const initialState: covidState = prefectureData.data;

export const fetchAsyncData = createAsyncThunk('covid/getData', async () => {
  const { data } = await axios.get<prefectureApiData>(
    process.env.REACT_APP_API_HOST
  );
  const setData = data.data;
  return {
    date: setData.date,
    data: setData.data,
  };
});

export const fetchAsyncCurrentPrefecture = createAsyncThunk(
  'covid/getCurrentPrefecture',
  async (prefecture: string) => {
    return { prefecture };
  }
);

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncData.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAsyncData.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        date: action.payload.date,
        data: action.payload.data,
      };
    });
    builder.addCase(fetchAsyncCurrentPrefecture.fulfilled, (state, action) => {
      return {
        ...state,
        currentPrefecture: action.payload.prefecture,
      };
    });
  },
});

export const selectData = (state: RootState): covidState => state.covid;

export const selectCurrentPrefecture = (state: RootState): string =>
  state.covid.currentPrefecture;

export const selectLoading = (state: RootState): boolean =>
  state.covid.isLoading;

export default covidSlice.reducer;
