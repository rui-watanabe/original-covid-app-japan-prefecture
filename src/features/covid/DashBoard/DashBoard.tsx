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
import { fetchAsyncData, selectData, selectLoading } from '../covidSlice';
import PieChart from '../PieChart/PieChart';
import SwitchPrefecture from '../SwitchPrefecture/SwitchPrefecure';
import Spinner from '../Spinner/Spinner';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  content: { marginTop: 85 },
}));

const DashBoard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const daily = data.date;
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchAsyncData());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <AppBar position="absolute" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            全国医療提供体制状況
          </Typography>
          <div>
            <Typography variant="body1">{daily}状況</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <div className={styles.container}>
          <SwitchPrefecture />
        </div>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={12} md={5}>
            <PieChart pieType="hospitalize" />
          </Grid>
          <Grid item xs={12} md={5}>
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
