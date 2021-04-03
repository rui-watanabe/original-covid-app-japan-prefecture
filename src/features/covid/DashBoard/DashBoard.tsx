import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import styles from './DashBoard.module.css';
import {
  fetchAsyncGetPrefectureData,
  selectPrefectureData,
} from '../covidSlice';
import PieChart from '../PieChart/PieChart';
import SwitchPrefecture from '../SwitchPrefecture/SwitchPrefecure';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  content: { marginTop: 85 },
}));

const DashBoard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(selectPrefectureData);
  const daily = data.date;

  useEffect(() => {
    dispatch(fetchAsyncGetPrefectureData('東京都'));
  }, [dispatch]);

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            COVID LIVE DASHBOARD JAPAN PREFECTURE
          </Typography>
          <div>
            <Typography variant="body1">{daily}</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <div className={styles.container}>
          <SwitchPrefecture />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <PieChart pieType="hospitalize" />
          </Grid>
          <Grid item xs={12} md={7}>
            <PieChart pieType="outputPatient" />
          </Grid>
          <Grid item xs={12} md={5}>
            <PieChart pieType="emergency" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DashBoard;
