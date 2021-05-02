import React from 'react';
import reducer, {
  fetchAsyncData,
  fetchAsyncCurrentPrefecture,
  covidState,
} from './covidSlice';
import initPrefectureData from './prefectureData.json';
import payloadPrefectureData2 from './prefectureData2.json';

describe('covidSlice extraReducers test', () => {
  const initialState: covidState = initPrefectureData.data;
  it('Should output fetchAsyncData new state when pending', () => {
    const action = {
      type: fetchAsyncData.pending.type,
      payload: {
        date: payloadPrefectureData2.data.date,
        data: payloadPrefectureData2.data.data,
      },
    };
    const state = reducer(initialState, action);
    expect(state.date).toEqual('2021年3月31日');
    expect(state.isLoading).toEqual(true);
    expect(state.data.hokkaido.hospitalize.normal).toEqual(0);
    expect(state.data.hokkaido.outPatient.normal).toEqual(0);
    expect(state.data.hokkaido.emergency.normal).toEqual(0);
  });
  it('Should output fetchAsyncData new state when fulfilled', () => {
    const action = {
      type: fetchAsyncData.fulfilled.type,
      payload: {
        date: payloadPrefectureData2.data.date,
        data: payloadPrefectureData2.data.data,
      },
    };
    const state = reducer(initialState, action);
    expect(state.date).toEqual('2021年4月1日');
    expect(state.isLoading).toEqual(false);
    expect(state.data.hokkaido.hospitalize.normal).toEqual(1);
    expect(state.data.hokkaido.outPatient.normal).toEqual(2);
    expect(state.data.hokkaido.emergency.normal).toEqual(3);
  });
  it('Should output fetchAsyncCurrentPrefecture new state when fulfilled', () => {
    const action = {
      type: fetchAsyncCurrentPrefecture.fulfilled.type,
      payload: {
        prefecture: 'hokkaido',
      },
    };
    const state = reducer(initialState, action);
    expect(state.currentPrefecture).toEqual('hokkaido');
  });
});
