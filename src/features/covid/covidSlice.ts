import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import prefectureApiData from './prefectureApiData.json';
import prefectureData from './prefectureData.json';

// const apiUrl = 'https://opendata.corona.go.jp/api/covid19DailySurvey?prefName=';
// axios.defaults.baseURL = 'https://opendata.corona.go.jp/api';
// axios.defaults.withCredentials = false;

// axios.defaults.proxy = {
//   host: 'https://opendata.corona.go.jp/api',
//   port: 80,
// };

type PREFECTUREAPIDATA = typeof prefectureApiData;
type covidState = typeof prefectureData;
export type covidStateObject =
  | typeof prefectureData.hospitalize
  | typeof prefectureData.outPatient
  | typeof prefectureData.emergency;

const initialState: covidState = prefectureData;

const plusCovidStateObjectDate = (
  object: covidStateObject,
  answerType: string
) => {
  const retObject = { ...object };
  switch (answerType) {
    case '通常':
      retObject.normal += 1;
      break;
    case '制限':
      retObject.limit += 1;
      break;
    case '停止':
      retObject.stopped += 1;
      break;
    case '設置なし':
      retObject.unanswered += 1;
      break;
    case '未回答':
      retObject.unintroduced += 1;
      break;
    default:
      break;
  }
  return retObject;
};

export const fetchAsyncGetPrefectureData = createAsyncThunk(
  'covid/getSelectPrefectureData',
  async (prefecture: string) => {
    const question = '?';
    const encodePrefectureURI = encodeURI(prefecture);
    const { data } = await axios.get<PREFECTUREAPIDATA>(
      `/covid19DailySurvey${question}prefName=${encodePrefectureURI}`
    );
    const dataDate = data[0].submitDate;
    const date = `${dataDate.substr(0, 4)}年${dataDate.substr(
      5,
      2
    )}月${dataDate.substr(8, 2)}日`;

    let hospitalizeObject = prefectureData.hospitalize;
    let outPatientObject = prefectureData.outPatient;
    let emergencyObject = prefectureData.emergency;

    data.forEach((el) => {
      switch (el.facilityType) {
        case '入院':
          hospitalizeObject = plusCovidStateObjectDate(
            hospitalizeObject,
            el.ansType
          );
          break;
        case '外来':
          outPatientObject = plusCovidStateObjectDate(
            outPatientObject,
            el.ansType
          );
          break;
        case '救急':
          emergencyObject = plusCovidStateObjectDate(
            emergencyObject,
            el.ansType
          );
          break;
        default:
          break;
      }
    });

    return {
      prefecture,
      date,
      hospitalizeObject,
      outPatientObject,
      emergencyObject,
    };
  }
);

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPrefectureData.fulfilled, (state, action) => {
      return {
        ...state,
        prefecture: action.payload.prefecture,
        hospitalize: action.payload.hospitalizeObject,
        outPatient: action.payload.outPatientObject,
        emergency: action.payload.emergencyObject,
      };
    });
  },
});

export const selectPrefectureData = (state: RootState): covidState =>
  state.covid;

export default covidSlice.reducer;
