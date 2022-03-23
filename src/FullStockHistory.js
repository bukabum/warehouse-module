import React, { Component } from 'react';
import { TextField, FormControl, MenuItem, Select, InputLabel, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Stack, Pagination, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Loading from "./Accessories/Loading";
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment'
import './Style/media.css'

class FullHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock:[],
      total_pages: "",
      page: 1,
      loading: true,
      firstDateTime: '',
      secondDateTime: '',
    };
    this.getCustomer = this.getCustomer.bind(this)
}
handlePage = (event, value) => {
  this.setState({page: value},
    () => { this.getCustomer() }
  );
};

  async getCustomer () {
    try {  
        let item = await axiosInstance.get('view/all/history/'+ this.props.match.params.itemPK + '/?page=' + this.state.page + '&date_added_min=' + this.state.firstDateTime + '&date_added_max=' + this.state.secondDateTime)
        const stock = item.data;
        this.setState({stock: stock.results});
        this.setState({total_pages: stock.total_pages});
        this.setState({ loading: false });
        this.props.history.push('/Warehouse-Customer/full/history/' + this.props.match.params.itemPK + '/?page=' + this.state.page + '&date_added_min=' + this.state.firstDateTime + '&date_added_max=' + this.state.secondDateTime)
      } catch(error){
    }
}
handleResetDialog = () => {
  this.setState({firstDateTime: ''})
  this.setState({secondDateTime: ''})
  this.setState({page: 1},
    () => { this.getCustomer() }
  );
  this.setState({ filterDialog: false });
};
handleFilterDialog = () => {
  if (this.state.filterDialog == false){
      this.setState({ filterDialog: true });
  } else {
      this.setState({ filterDialog: false });
  }
};

componentDidMount() {
    this.getCustomer();    
}

    render() {
      const stock = this.state.stock
      if (this.state.loading) {
        return (
          <Loading/>
        )
       } else {
        return (
          stock.length > 0 ?
          <div className="divControl">
            <br/>
            <h2 style={{ display: 'inline-block', margin: 0 }}>Full Stock History</h2> 
            <Link to={"/Warehouse-Customer/monthly/history/" + this.props.match.params.itemPK }>
              <Button size='medium' style={{ float: 'right' }}>Stock Bulanan</Button> 
            </Link>
              <Button onClick={this.handleFilterDialog} size='medium' style={{ float: 'right', marginRight: 10 }}>Filter</Button>
            <br/><br/>
          <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Tanggal</b></TableCell>
                      <TableCell align="right"><b>Keterangan</b></TableCell>
                      <TableCell align="right"><b>Masuk</b></TableCell>
                      <TableCell align="right"><b>Keluar</b></TableCell>
                      <TableCell align="right"><b>Stock</b></TableCell>
                      <TableCell align="right"><b>Penanggung Jawab</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {stock.map(stonk => 
                      <TableRow
                        key='row.name'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{new Date(Date.parse(stonk.date_added)).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell align="right">{stonk.description}</TableCell>
                        <TableCell align="right">{stonk.stockin}</TableCell>
                        <TableCell align="right">{stonk.stockout}</TableCell>
                        <TableCell align="right">{stonk.stock}</TableCell>
                        <TableCell align="right">{stonk.person_responsible}</TableCell>
                      </TableRow>
                  )}
                  </TableBody>
                </Table>
              </TableContainer>
              <br/><br/>
                <Stack style={{alignItems: 'center'}} spacing={2}>
                    <Pagination  count={this.state.total_pages} page={this.state.page} onChange={this.handlePage} showFirstButton showLastButton />
                </Stack>
              <br/><br/>

              <div>
                <Dialog
                    open={this.state.filterDialog}
                    onClose={this.handleFilterDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">
                      Filter Histori Pesanan
                    </DialogTitle>
                    <DialogContent>
                      <br/>
                    <DialogContentText id="alert-dialog-description">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          fullWidth
                          label="Tanggal Order Awal"
                          orientation="landscape"
                          openTo="day"
                          views={['year', 'month', 'day']}
                          value={this.state.firstDateTime}
                          onChange={(newValue) => {
                            this.setState({firstDateTime: moment(newValue).format('YYYY-MM-DD')},
                              () => { this.getCustomer() }
                            )
                          }}
                          renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                      </LocalizationProvider>
                      <br/><br/>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          fullWidth
                          label="Tanggal Order Akhir"
                          orientation="landscape"
                          openTo="day"
                          views={['year', 'month', 'day']}
                          value={this.state.secondDateTime}
                          onChange={(newValue) => {
                            this.setState({secondDateTime: moment(newValue).format('YYYY-MM-DD')},
                              () => { this.getCustomer() }
                            );
                          }}
                          renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                      </LocalizationProvider>
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button style={{ color: "white", backgroundColor: '#d9534f', marginRight: 7 }} onClick={this.handleResetDialog}>Reset</Button>
                    <Button type="submit" style={{ color: "white", backgroundColor: '#5cb85c' }} onClick={this.handleFilterDialog} autoFocus>
                        Tutup
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>


          </div>
          :
          <h1 style={{ textAlign: 'center' }}><b>Belum Ada Histori</b></h1>
          );
      }
    }
  }
  export default FullHistory;