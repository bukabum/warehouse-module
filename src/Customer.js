import React, { Component } from 'react';
import { FormControl, Select, InputLabel, MenuItem, TextField, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Stack, Pagination, Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Loading from "./Accessories/Loading";
import './Style/media.css'

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cus:[],
      total_pages: "",
      page: 1,
      loading: true,
      filterDialog: false,
      name: '',
      address: '',
      phone: '',
    };
    this.getCustomer = this.getCustomer.bind(this)
    this.handleFilterDialog = this.handleFilterDialog.bind(this)
    this.handleResetDialog = this.handleResetDialog.bind(this)
}
handlePage = (event, value) => {
  this.setState({page: value},
    () => { this.getCustomer() }
  );
};

  async getCustomer () {
    try {  
        let item = await axiosInstance.get('view/all/customer/?alamat=' + this.state.address + '&nama_pelanggan=' + this.state.name + '&no_hp=' + this.state.phone + '&page=' +this.state.page)
        const cus = item.data;
        this.setState({cus: cus.results});
        this.setState({total_pages: cus.total_pages});
        this.setState({ loading: false });
        this.props.history.push('/Warehouse-1.0/view/customer/?page='+this.state.page + '&alamat=' + this.state.address + '&nama_pelanggan=' + this.state.name + '&no_hp=' + this.state.phone)
      } catch(error){
    }
}

componentDidMount() {
    this.getCustomer();    
}
handleFilterDialog = () => {
  if (this.state.filterDialog == false){
      this.setState({ filterDialog: true });
  } else {
      this.setState({ filterDialog: false });
  }
};
handleResetDialog = () => {
    this.setState({name: ''})
    this.setState({address: ''})
    this.setState({phone: ''})
    this.setState({page: 1},
      () => { this.getCustomer() }
    );
    this.setState({ filterDialog: false });
  };

    render() {
      const cusm = this.state.cus
      if (this.state.loading) {
        return (
          <Loading/>
        )
        } else {
        return (
          <div className="divControl">
            <br/><br/>
            <h2 style={{ display: 'inline-block', margin: 0 }}>Data Pelanggan</h2> 
            <Link to="/Warehouse-1.0/add/customer">
              <Button size='medium' style={{ float: 'right' }}>Tambah</Button> 
            </Link>
              <Button onClick={this.handleFilterDialog} size='medium' style={{ float: 'right', marginRight: 10 }}>Filter</Button>
            {cusm.length > 0 ?
            <>
            {cusm.map(cus => 
            <Card sx={{ minWidth: 275, marginTop: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {cus.nama_pelanggan}
                </Typography>
                  <br/>
                <Typography>
                  {cus.no_hp}
                  <br />
                  {cus.alamat}, {cus.kota}, {cus.provinsi}
                  <br/>
                  {cus.catatan}
                </Typography>
              </CardContent>
              <CardActions>
                <Link style={{ textDecoration: 'none' }} to={"/Warehouse-1.0/customer/detail/" + cus.pk}>
                  <Button size="small">Lihat</Button>
                </Link>
              </CardActions>
            </Card>
          )}
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
                      Filter Pelanggan
                    </DialogTitle>
                    <DialogContent>
                      <br/>
                    <DialogContentText id="alert-dialog-description">
                    <TextField
                        name="nama_pelanggan"
                        label='Nama Pelanggan'
                        fullWidth={true}
                        value={this.state.name}
                        onChange={(event) => {
                          this.setState({name: event.target.value}, 
                            () => { this.getCustomer() })
                        }}
                  >
                      </TextField>
                      <br/><br/>
                      <TextField
                        name="alamat"
                        label='Alamat'
                        fullWidth={true}
                        value={this.state.address}
                        onChange={(event) => {
                          this.setState({address: event.target.value}, 
                            () => { this.getCustomer() })
                        }}
                  >
                      </TextField>
                      <br/><br/>
                      <TextField
                        name="no_hp"
                        label='No Hp'
                        fullWidth={true}
                        type="number"
                        value={this.state.phone}
                        onChange={(event) => {
                          console.log(event.target.value)
                          this.setState({phone: event.target.value},
                              () => { this.getCustomer() }
                            );
                        }}
                  >
                      </TextField>
                      <br/><br/>
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
          <h1 style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}><b>Belum Ada Data Pelanggan</b></h1>
          }
          </div>
        );
      }
    }
  }
  
  export default Customer;