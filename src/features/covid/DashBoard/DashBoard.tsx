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
  fetchAsyncGetData,
  fetchAsyncGetLatestData,
  selectCurrentCategoryFlg,
  selectCurrentData,
} from '../covidSlice';
import SwitchCategory from '../SwitchCategory/SwitchCategory';
import Chart from '../Chart/Chart';
import Cards from '../Cards/Cards';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  content: { marginTop: 85 },
}));

const DashBoard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentDataList = useSelector(selectCurrentData);
  const categoryFlg = useSelector(selectCurrentCategoryFlg);
  const loadDate = new Date(
    currentDataList[currentDataList.length - 1].date
  ).toLocaleDateString();

  useEffect(() => {
    dispatch(fetchAsyncGetData('positive-cases'));
    dispatch(fetchAsyncGetLatestData());
  }, [dispatch]);

  return (
    <div>
      <AppBar position="absolute" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            全国コロナ感染者 ライブダッシュボード
          </Typography>
          <div>
            <Typography variant="body1">
              {loadDate}
              更新
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <div className={styles.container}>
          <SwitchCategory loadDate={loadDate} />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {categoryFlg === 1 ? <Chart /> : <Cards />}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DashBoard;
