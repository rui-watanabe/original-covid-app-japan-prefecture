import React from 'react';
import { Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
  selectData,
  selectCurrentPrefecture,
  covidStatePrefectureDataKeyString,
  covidStateDataPrefectureCount,
} from '../covidSlice';

type PieChartType = {
  pieType: 'hospitalize' | 'outputPatient' | 'emergency';
};

const PieChart = ({ pieType }: PieChartType): JSX.Element => {
  const data = useSelector(selectData);
  const currentPrefecture = useSelector(selectCurrentPrefecture);
  const setALLData = data.data as covidStatePrefectureDataKeyString;
  const setData = setALLData[currentPrefecture];
  let dataObject: covidStateDataPrefectureCount;
  let title: string;
  if (pieType === 'hospitalize') {
    dataObject = setData.hospitalize;
    title = '外来';
  } else if (pieType === 'outputPatient') {
    dataObject = setData.outPatient;
    title = '入院';
  } else if (pieType === 'emergency') {
    dataObject = setData.emergency;
    title = '救急';
  } else {
    return <></>;
  }

  const pieChart = (
    <Doughnut
      data={{
        labels: ['通常', '制限', '停止', '設置なし', '未回答'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0,0,255,0.5)',
              '#008080',
              'rgba(255,0,0,0.5)',
              '#424242',
              '#ffb300',
            ],
            data: [
              dataObject.normal,
              dataObject.limit,
              dataObject.stopped,
              dataObject.unintroduced,
              dataObject.unanswered,
            ],
            hoverBackgroundColor: [
              '#36A2EB',
              '#3cb371',
              '#FF6384',
              '#9e9e9e',
              '#ffd54f',
            ],
            borderColor: [
              'transparent',
              'transparent',
              'transparent',
              'transparent',
              'transparent',
            ],
          },
        ],
      }}
      options={{
        legend: { position: 'bottom', labels: { boxWidth: 15 } },
      }}
    />
  );
  return (
    <>
      <Typography align="center" color="textSecondary" gutterBottom>
        {title}患者状況
      </Typography>
      {pieChart}
    </>
  );
};

export default PieChart;
