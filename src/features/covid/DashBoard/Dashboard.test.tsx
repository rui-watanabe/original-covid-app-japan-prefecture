import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { covidState, selectCurrentPrefecture, selectData, selectLoading } from '../covidSlice';
import DashBoard from "./DashBoard";
import { useSelector, useDispatch } from 'react-redux'
import prefectureData from '../prefectureData.json';
import { RootState } from "../../../app/store";

const data: covidState = prefectureData.data;

jest.mock('react-redux')
const useSelectorMock = useSelector as jest.Mock<covidState | boolean | string>
const useDispatchMock = useDispatch as jest.Mock

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('DashBoard rendering test', () => {
    beforeEach(() => {
      useSelectorMock.mockImplementation((selector): any => 
      {
        if (selector === selectData) 
        {
          return data
        }
        else if(selector === selectCurrentPrefecture)
        {
          return "hokkaido"
        }
        else if(selector === selectLoading)
        {
          return false
        }
        else
        {
          return undefined
        }
      }
    );
    useDispatchMock.mockReturnValue(jest.fn())
    })
  it("Should render the elements correctly", async () => {
    render(<DashBoard />);
    screen.debug();
    expect(await screen.findByText(/全国医療提供体制状況/)).toBeInTheDocument();//find~は結果が反映されるまでまつ
  });
})
