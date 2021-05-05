import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import covidReducer, { covidState } from '../covidSlice';
import SwitchPrefecture from './SwitchPrefecture';

afterEach(() => {
  cleanup();
});

describe('SwitchPrefecture rendering test', () => {
  let store: EnhancedStore<{ covid: covidState }>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        covid: covidReducer,
      },
    });
  });
  it('Should render the elements correctly', async () => {
    render(
      <Provider store={store}>
        <SwitchPrefecture />
      </Provider>
    );
    expect(await screen.findByText(/東京都/)).toBeInTheDocument(); // find~は結果が反映されるまでまつ
  });
});
