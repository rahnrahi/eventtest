import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Grid, Button, Card} from '@material-ui/core'
import EventsForm from './EventsForm'
import MaterialTable from 'material-table';
import { API_URL } from "../../../../config"
import axios from 'axios'
import EventTable from './EventTable'




const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function EventTableList() {
  
  const tableRef = React.createRef();

  let getEventsdata =  query =>{

    let token =  localStorage.getItem('token')
    axios.defaults.baseURL = API_URL
    axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
    return new Promise((resolve, reject) => {

      const bodyParameters = {
        page: query.page + 1,
        limit: query.pageSize
      };
      
      axios.get( 
        `${API_URL}/events`,
        bodyParameters
      ).then(result=>{
        console.log(".......result", result)
        let {results, page, totalResults} = result.data
        return resolve({
          data: results,
          page: page,
          totalCount: totalResults,
        })
      }).catch(console.log);

    })
  
  }
  
  return (
    <EventTable/>
  )

}

export default class TotalEvents extends Component {
  render() {
    return (
      <Grid container direction="column"
      justify="center"
      alignItems="center" >
      <Grid container item xs={12} >
         <EventsForm/>
      </Grid>
      
      <Grid container item xs={12} style={{marginTop: 40}} >
     
        <EventTableList />
      </Grid>
    </Grid>
    )
  }
}
