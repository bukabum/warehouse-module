import React, { Component } from 'react';
import { Select, InputLabel, FormControl, MenuItem, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, TextField, Stack, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { numberFormat } from "./numberformat";
import Loading from "./Accessories/Loading";
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import isWeekend from 'date-fns/isWeekend';
import moment from 'moment'
import './Style/media.css'

class ViewCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cus: "",
        his: [],
        total_pages: "",
        paid: "",
        cancel: "",
        retur: "",
        min_price: "",
        max_price: "",
        order_code: "",
        page: 1,
        editDialog: false,
        filterDialog: false,
        loading: true,
        firstDateTime: '',
        secondDateTime: '',
    };
    this.getCustomer = this.getCustomer.bind(this)
    this.getCustomerOrderHistory = this.getCustomerOrderHistory.bind(this)
    this.handlePage = this.handlePage.bind(this)
    this.handleEditDialog = this.handleEditDialog.bind(this)
    this.updateCustomer = this.updateCustomer.bind(this)
    this.handleFilterDialog = this.handleFilterDialog.bind(this)
    this.handleSelectPaid = this.handleSelectPaid.bind(this)
    this.handleSelectCancel = this.handleSelectCancel.bind(this)
    this.handleSelectRetur = this.handleSelectRetur.bind(this)
    this.handleResetDialog = this.handleResetDialog.bind(this)
}

async updateCustomer (event) {
    event.preventDefault();
    const cus = this.state.cus
    try {  
          await axiosInstance.put('customer/detail/' + this.props.match.params.cusPK + '/',{            
            nama_pelanggan: cus.nama_pelanggan,
            no_hp: cus.no_hp,
            alamat: cus.alamat,
            kecamatan: cus.kecamatan,
            kota: cus.kota,
            provinsi: cus.provinsi,
            catatan: cus.catatan,
        }).then(() => {
            this.setState({ editDialog: false });
        })
    } catch(error){
    }
}

async getCustomer () {
    try {  
        let item = await axiosInstance.get('customer/detail/' + this.props.match.params.cusPK + '/')
        const cus = item.data;
        this.setState({cus: cus});
    } catch(error){
    }
}

async getCustomerOrderHistory () {
    try {  
        let item = await axiosInstance.get('view/customer/order/history/' + this.props.match.params.cusPK + '/?paid=' + this.state.paid + '&request_order_min=' + this.state.firstDateTime + '&request_order_max=' + this.state.secondDateTime + '&cancel=' + this.state.cancel + '&retur=' + this.state.retur + '&total_amount_min=' + this.state.min_price + '&total_amount_max=' + this.state.max_price + '&order_code=' + this.state.order_code + '&page=' + this.state.page)
        const his = item.data;
        this.setState({ his: his.results });        
        this.setState({ total_pages: his.total_pages });
        this.setState({ loading: false });
        this.props.history.push('/customer/detail/' + this.props.match.params.cusPK + '/?paid=' + this.state.paid + '&request_order_min=' + this.state.firstDateTime + '&request_order_max=' + this.state.secondDateTime + '&cancel=' + this.state.cancel + '&retur=' + this.state.retur + '&total_amount_min=' + this.state.min_price + '&total_amount_max=' + this.state.max_price + '&order_code=' + this.state.order_code)
      } catch(error){
    }
}
handlePage = (event, value) => {
    this.setState({page: value},
      () => { this.getCustomerOrderHistory() }
    );
  };
handleChange = (event) => {

}
componentDidMount() {
    this.getCustomer();   
    this.getCustomerOrderHistory(); 
}
handleEditDialog = () => {
    if (this.state.editDialog == false){
        this.setState({ editDialog: true });
    } else {
        this.setState({ editDialog: false });
    }
 };
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
    () => { this.getCustomerOrderHistory() }
  );
  this.setState({ filterDialog: false });
};
handleSelectPaid = (event) => {
  this.setState({paid: event.target.value},
    () => { this.getCustomerOrderHistory() }
  );
};
handleSelectCancel = (event) => {
  this.setState({cancel: event.target.value},
    () => { this.getCustomerOrderHistory() }
  );
};
handleSelectRetur = (event) => {
  this.setState({retur: event.target.value},
    () => { this.getCustomerOrderHistory() }
  );
};



    render() {
        const cusm = this.state.cus
        const his = this.state.his
        if (this.state.loading) {
          return (
            <Loading/>
          )
         } else {  
        return (
        <div className="divControl">
          <h2 style={{ display: 'inline-block' }}>Detail Pelanggan</h2> 
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography>
                {cusm.nama_pelanggan}
                    <br />
                {cusm.no_hp}
                    <br />
                {cusm.alamat}{cusm.kecamatan  ? <>, {cusm.kecamatan} </>: null}{cusm.kota  ? <>,  {cusm.kota} </> : null }{cusm.provinsi  ? <>, {cusm.provinsi} </> : null }
                    <br />
                {cusm.catatan}
                    <br />
              </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => this.handleEditDialog()}>Edit</Button>
            </CardActions>
          </Card>
          <br/>
          {his.length > 0 ? 
          <>
            <h2 style={{ display: 'inline-block', margin: 0 }}>History Order</h2> 
            <Button onClick={this.handleFilterDialog} size="large" style={{ float: 'right' }}>Filter</Button>
            {his.map(him => 
            <Card sx={{ marginTop: 3 }}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Link style={{ textDecoration: 'none' }} to={"/Warehouse-1.0/order/detail/" + him.pk }>Order - { him.order_code }</Link>
                </Typography>
                <Typography>
                  <p>Status Pembayaran: {him.retur ? 'Pesanan Di Retur' : him.cancel ? 'Pesanan Dibatalkan' : him.paid ? 'Lunas' : 'Belum Lunas'}</p>
                  <p>{him.retur ? 'Alasan Retur: ' +  him.retur_reason : him.cancel ?  'Alasan Pembatalan: ' + him.cancel_reason : null  }</p>
                  <p>{him.retur ? 'Tanggal Retur: ' +  new Date(Date.parse(him.retur_date)) : him.cancel ?  'Tanggal Pembatalan: ' + new Date(Date.parse(him.cancel_date)) : null  }</p>
                  <p>{him.paid ? 'Tanggal Pelunasan: ' +  new Date(Date.parse(him.paid_date)) : '' }</p>
                  <p>Total Order: {him.total_amount ? numberFormat(him.total_amount) : '' }</p>
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Harga Satuan</TableCell>
                            <TableCell align="right">Jumlah</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {him.orderitem_set.map(item => 
                            <TableRow
                            key=''
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{item.receipt.parts.name}</TableCell>
                                <TableCell align="right">{numberFormat(item.receipt.parts.price)}</TableCell>
                                <TableCell align="right">{item.quantity}x</TableCell>
                                <TableCell align="right">{numberFormat(item.total_price)}</TableCell>
                            </TableRow>
                            )}
                            <TableRow>
                                <TableCell component="th" scope="row"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"><b>Total</b></TableCell>
                                <TableCell align="right">{numberFormat(him.total_amount)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </CardContent>
            </Card> 
            )}
            <Stack style={{alignItems: 'center'}} spacing={2}>
                <Pagination  count={this.state.total_pages} page={this.state.page} onChange={this.handlePage} showFirstButton showLastButton />
            </Stack>
            <br/><br/>
          </>
          : <h2 style={{ textAlign: 'center' }}>Belum ada history order</h2> }


<div>
                <Dialog
                    open={this.state.editDialog}
                    onClose={this.handleEditDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">
                      Edit Data Pelanggan
                    </DialogTitle>
                    <br/>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <TextField
                        name="nama"
                        label='Nama Pelanggan'
                        fullWidth={true}
                        value={cusm.nama_pelanggan}
                        onChange={(e) => this.setState(prevState => ({
                            cus: {...prevState.cus, nama_pelanggan: e.target.value}
                        }))}
                      >
                      </TextField>
                      <br/><br/>
                      <TextField
                        name="no_hp"
                        label='No HP'
                        type='number'
                        fullWidth={true}
                        value={cusm.no_hp}
                        onChange={(e) => this.setState(prevState => ({
                            cus: {...prevState.cus, no_hp: e.target.value}
                        }))}
                    >
                      </TextField>
                      <br/><br/>
                      <TextField
                        name="Alamat"
                        label='Alamat'
                        fullWidth={true}
                        value={cusm.alamat}
                        onChange={(e) => this.setState(prevState => ({
                            cus: {...prevState.cus, alamat: e.target.value}
                        }))}
                      >
                      </TextField>
                      <br/><br/>
                      <TextField
                        name="Kota"
                        label='Kota'
                        fullWidth={true}
                        value={cusm.kota}
                        onChange={(e) => this.setState(prevState => ({
                            cus: {...prevState.cus, kota: e.target.value}
                        }))}
                      >
                      </TextField>
                      <br/><br/>
                      <TextField
                        name="Provinsi"
                        label='Provinsi'
                        fullWidth={true}
                        value={cusm.provinsi}
                        onChange={(e) => this.setState(prevState => ({
                            cus: {...prevState.cus, provinsi: e.target.value}
                        }))}
                      >
                      </TextField>
                      <br/><br/>
                      <TextField
                        name="Catatan"
                        label='Catatan'
                        fullWidth={true}
                        value={cusm.catatan}
                        onChange={(e) => this.setState(prevState => ({
                            cus: {...prevState.cus, catatan: e.target.value}
                        }))}
                      >
                      </TextField>
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button style={{ color: "white", backgroundColor: '#d9534f', marginRight: 7 }} onClick={this.handleEditDialog}>Cancel</Button>
                    <form onSubmit={this.updateCustomer}>
                    <Button type="submit" style={{ color: "white", backgroundColor: '#5cb85c' }} onClick={() => this.onRemoveItem(this.state.activeItem)} autoFocus>
                        Submit
                    </Button>
                    </form>
                    </DialogActions>
                </Dialog>
                </div>

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
                            () => { this.getCustomerOrderHistory() })
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
                            () => { this.getCustomerOrderHistory() })
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
                              () => { this.getCustomerOrderHistory() }
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
                              () => { this.getCustomerOrderHistory() }
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
                              () => { this.getCustomerOrderHistory() }
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
      );
    }
  }
}
export default ViewCustomer;