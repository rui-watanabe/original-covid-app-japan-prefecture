import React from 'react';
import reducer, {
  fetchAsyncData,
  fetchAsyncCurrentPrefecture,
  covidState,
} from './covidSlice';
import initPrefectureData from './prefectureData.json';
import payloadPrefectureData2 from './prefectureData2.json';

describe('covidSliice extraReducers test', () => {
  const initialState: covidState = initPrefectureData.data;
  it('Should output fetchAsyncData new state when fulfilled', () => {
    const action = {
      type: fetchAsyncData.fulfilled.type,
      payload: {
        date: payloadPrefectureData2.data.date,
        data: payloadPrefectureData2.data.data,
      },
    };
    const state = reducer(initialState, action);
    expect(state.date).toEqual('2021年3月31日');
    expect(state.data.hokkaido.hospitalize.normal).toEqual(1);
    expect(state.data.hokkaido.outPatient.normal).toEqual(2);
    expect(state.data.hokkaido.emergency.normal).toEqual(3);
  });
});
