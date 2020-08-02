import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  let userData =  localStorage.getItem('user')
  userData     = JSON.parse(userData)

  return (
    <div style={{minHeight: '100vh'}} className={classes.root}>
       Welcome {userData.name}!
    </div>
  );
};

export default Dashboard;
