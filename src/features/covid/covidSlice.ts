import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import prefectureApiData from './prefectureApiData.json';
import prefectureData from './prefectureData.json';

type PREFECTUREAPIDATA = typeof prefectureApiData;
type covidState = typeof prefectureData;
type covidStateData = typeof prefectureData.data;
type covidStatePrefectureData = typeof prefectureData.data.hokkaido;
export type covidStatePrefectureDataKeyString = {
  [key: string]: covidStatePrefectureData;
};
export type covidStateDataPrefectureCount = typeof prefectureData.data.hokkaido.hospitalize;

const initialState: covidState = prefectureData;

const plusCovidStateDataPrefectureCount = (
  object: covidStateDataPrefectureCount,
  answerType: string
) => {
  const retCovidStateDataPrefectureCount = { ...object };
  switch (answerType) {
    case '通常':
      retCovidStateDataPrefectureCount.normal += 1;
      break;
    case '制限':
      retCovidStateDataPrefectureCount.limit += 1;
      break;
    case '停止':
      retCovidStateDataPrefectureCount.stopped += 1;
      break;
    case '設置なし':
      retCovidStateDataPrefectureCount.unanswered += 1;
      break;
    case '未回答':
      retCovidStateDataPrefectureCount.unintroduced += 1;
      break;
    default:
      break;
  }

  return retCovidStateDataPrefectureCount;
};

export const fetchAsyncData = createAsyncThunk('covid/getData', async () => {
  const { data } = await axios.get<PREFECTUREAPIDATA>(
    `/api/covid19DailySurvey`
  );
  const retCovidState = JSON.parse(JSON.stringify(prefectureData));
  const dataDate = data[0].submitDate;
  const setDate = `${dataDate.substr(0, 4)}年${dataDate.substr(
    5,
    2
  )}月${dataDate.substr(8, 2)}日`;
  retCovidState.date = setDate;

  const retCovidStateData: covidStatePrefectureDataKeyString = JSON.parse(
    JSON.stringify(prefectureData.data)
  );

  data.forEach((el) => {
    Object.keys(retCovidStateData).forEach((key) => {
      if (retCovidStateData[key].prefectureInfo.name === el.prefName) {
        switch (el.facilityType) {
          case '入院':
            retCovidStateData[
              key
            ].hospitalize = plusCovidStateDataPrefectureCount(
              retCovidStateData[key].hospitalize,
              el.ansType
            );
            break;
          case '外来':
            retCovidStateData[
              key
            ].outPatient = plusCovidStateDataPrefectureCount(
              retCovidStateData[key].outPatient,
              el.ansType
            );
            break;
          case '救急':
            retCovidStateData[
              key
            ].emergency = plusCovidStateDataPrefectureCount(
              retCovidStateData[key].emergency,
              el.ansType
            );
            break;
          default:
            break;
        }
      }
    });
  });
  retCovidState.data = retCovidStateData as covidStateData;

  return {
    date: retCovidState.date,
    data: retCovidState.data,
  };
});

export const fetchAsyncCurrentPrefecture = createAsyncThunk(
  'covid/getCurrentPrefecture',
  async (prefecture: string) => {
    const dataObject: covidStatePrefectureDataKeyString = {
      ...prefectureData.data,
    };
    let retPrefecture = '';
    Object.keys(dataObject).forEach((data) => {
      if (dataObject[data].prefectureInfo.name === prefecture) {
        retPrefecture = data;
      }
    });
    return { retPrefecture };
  }
);

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncData.fulfilled, (state, action) => {
      return {
        ...state,
        date: action.payload.date,
        data: action.payload.data,
      };
    });
    builder.addCase(fetchAsyncCurrentPrefecture.fulfilled, (state, action) => {
      return {
        ...state,
        currentPrefecture: action.payload.retPrefecture,
      };
    });
  },
});

export const selectData = (state: RootState): covidState => state.covid;

export const selectCurrentPrefecture = (state: RootState): string =>
  state.covid.currentPrefecture;

export default covidSlice.reducer;
