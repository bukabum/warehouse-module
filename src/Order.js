import React, { Component } from 'react';
import { InputLabel, Select, MenuItem, FormControl, Dialog, DialogTitle, DialogContentText, DialogActions, TextField, DialogContent, Stack, Pagination, Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { numberFormat } from './numberformat';
import Loading from "./Accessories/Loading";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import isWeekend from 'date-fns/isWeekend';
import moment from 'moment'
import DatePicker from '@mui/lab/DatePicker';
import './Style/media.css'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order:[],
      total_pages: "",
      page: 1,
      loading: true,
      paid: "",
      cancel: "",
      retur: "",
      filterDialog: false,
      firstDateTime: '',
      secondDateTime: '',
      min_price: "",
      max_price: "",
      order_code: "",
    };
    this.getOrder = this.getOrder.bind(this)
    this.handlePage = this.handlePage.bind(this)
}
handlePage = (event, value) => {
  this.setState({page: value},
    () => { this.getOrder() }
  );
};

  async getOrder () {
    try {
        let item = await axiosInstance.get('view/all/order/?cancel=' + this.state.cancel + '&creation_date_max=' + this.state.secondDateTime + '&creation_date_min=' + this.state.firstDateTime + '&order_code=' + this.state.order_code + '&page=' + this.state.page + '&paid=' + this.state.paid + '&retur=' + this.state.retur + '&total_amount_max=' + this.state.max_price + '&total_amount_min=' + this.state.min_price)
        const order = item.data;
        console.log(order.results.filter(Boolean))
        console.log(order.results)
        this.setState({order: order.results.filter(Boolean)});
        this.setState({total_pages: order.total_pages});
        this.props.history.push('/Warehouse-1.0/order/list/?page='+this.state.page + '&cancel=' + this.state.cancel + '&creation_date_max=' + this.state.secondDateTime + '&creation_date_min=' + this.state.firstDateTime + '&order_code=' + this.state.order_code + '&page=' + this.state.page + '&paid=' + this.state.paid + '&retur=' + this.state.retur + '&total_amount_max=' + this.state.max_price + '&total_amount_min=' + this.state.min_price)
        this.setState({ loading: false });
      } catch(error){
    }
}

componentDidMount() {
    this.getOrder();    
}
handleFilterDialog = () => {
  if (this.state.filterDialog == false){
      this.setState({ filterDialog: true });
  } else {
      this.setState({ filterDialog: false });
  }
};
handleResetDialog = () => {
  this.setState({paid: ''})
  this.setState({cancel: ''})
  this.setState({retur: ''})
  this.setState({firstDateTime: ''})
  this.setState({secondDateTime: ''})
  this.setState({min_price: ''})
  this.setState({max_price: ''})
  this.setState({order_code: ''})
  this.setState({page: 1},
    () => { this.getOrder() }
  );
  this.setState({ filterDialog: false });
};
handleSelectPaid = (event) => {
  this.setState({paid: event.target.value},
    () => { this.getOrder() }
  );
};
handleSelectCancel = (event) => {
  this.setState({cancel: event.target.value},
    () => { this.getOrder() }
  );
};
handleSelectRetur = (event) => {
  this.setState({retur: event.target.value},
    () => { this.getOrder() }
  );
};



    render() {
      if (this.state.loading) {
        return (
          <Loading/>
        )
       } else {
      return (
        <div className="divControl">
        {this.state.order.length > 0 ?
        <>
          <br/><br/>
          <h2 style={{ display: 'inline-block', margin: 0 }}>List Order</h2> 
          <Button size="large" onClick={() => this.handleFilterDialog()}  style={{ float: 'right' }}>Filter</Button>
          {this.state.order.map(item => 
              <Card sx={{ marginTop: 3 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                </Typography>
                <Typography variant="body2">
                  <h2> Order - {item.order_code}</h2>
                  <p>Status Pembayaran: {item.retur ? 'Pesanan Di Retur' : item.cancel ? 'Pesanan Dibatalkan' : item.paid ? 'Lunas' : 'Belum Lunas'}</p>
                  <p>{item.retur ? 'Alasan Retur: ' +  item.retur_reason : item.cancel ?  'Alasan Pembatalan: ' + item.cancel_reason : null  }</p>
                  <p>{item.retur ? 'Tanggal Retur: ' +  new Date(Date.parse(item.retur_date)) : item.cancel ?  'Tanggal Pembatalan: ' + new Date(Date.parse(item.cancel_date)) : null  }</p>
                  <p>{item.customer ? item.customer.nama_pelanggan ? <> Pemesan: {item.customer.nama_pelanggan} - {item.customer.no_hp} - {item.customer.alamat}, {item.customer.kota}, {item.customer.provinsi}</> : '' : '' }</p>
                  <p>Total Order: {item.total_amount ? numberFormat(item.total_amount) : '' }</p>
                  <p>{item.note ? 'Catatan: ' + item.note : null }</p>

                </Typography>
              </CardContent>
              <CardActions>
              <Link to={'/Warehouse-1.0/order/detail/' + item.pk} style={{ textDecoration: 'none' }}>
                  <Button>Lihat Order</Button>
                </Link>
              </CardActions>
            </Card> 
            )}
            <br/>
          <Stack style={{alignItems: 'center'}} spacing={2}>
                <Pagination  count={this.state.total_pages} page={this.state.page} onChange={this.handlePage} showFirstButton showLastButton />
          </Stack>
          <br/>
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
                    <TextField
                        name="nama"
                        label='Nilai Order Min'
                        fullWidth={true}
                        type="number"
                        onChange={(event) => {
                          this.setState({min_price: event.target.value}, 
                            () => { this.getOrder() })
                        }}
                  >
                      </TextField>
                      <br/><br/>
                      <TextField
                        name="nama"
                        label='Nilai Order Max'
                        fullWidth={true}
                        type="number"
                        onChange={(event) => {
                          this.setState({max_price: event.target.value}, 
                            () => { this.getOrder() })
                        }}
                  >
                      </TextField>
                      <br/><br/>
                      <TextField
                        name="nama"
                        label='Kode Order'
                        fullWidth={true}
                        type="number"
                        value={this.state.order_code}
                        onChange={(event) => {
                          console.log(event.target.value)
                          this.setState({order_code: event.target.value},
                              () => { this.getOrder() }
                            );
                        }}
                  >
                      </TextField>
                      <br/><br/>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Pembayaran</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={this.state.paid}
                          label="Pembayaran"
                          onChange={this.handleSelectPaid}
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          <MenuItem value={true}>Lunas</MenuItem>
                          <MenuItem value={false}>Belum Lunas</MenuItem>
                        </Select>
                      </FormControl>
                      <br/><br/>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Pembatalan</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={this.state.cancel}
                          label="Pembatalan"
                          onChange={this.handleSelectCancel}
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          <MenuItem value={true}>Dibatalkan</MenuItem>
                          <MenuItem value={false}>Tidak Dibatalkan</MenuItem>
                        </Select>
                      </FormControl>
                      <br/><br/>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Retur</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={this.state.retur}
                          label="Retur"
                          onChange={this.handleSelectRetur}
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          <MenuItem value={true}>Retur</MenuItem>
                          <MenuItem value={false}>Tidak Retur</MenuItem>
                        </Select>
                      </FormControl>
                      <br/><br/>
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
                              () => { this.getOrder() }
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
                              () => { this.getOrder() }
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
        </>
        :
        <h1 style={{ textAlign: 'center' }}><b>Belum Ada Order</b></h1>
        }
        </div>
      );
    }
  }
}
  
  export default Order;