import React, { Component } from 'react';
import { Snackbar, Alert, TextField, Stack, Pagination, Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Style/media.css'

class StockOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cus:[],
      total_pages: "",
      page: 1,
      snackSeverity: "",
      snackText: "",
      snack: false,
    };
    this.stockOut = this.stockOut.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async stockOut (event) {
    event.preventDefault();
    console.log(this.state.stock_in)
    try {  
        await axiosInstance.post('stock/out/' + this.props.match.params.itemPK + '/', {
          stockout: this.state.stock_out,
          description: this.state.description,
        }).then(() => {
          this.setState({snackSeverity: 'success'});
          this.setState({snackText: 'Stok Berhasil Dikurangi'});
          this.setState({snack: true})
          this.setState({
            stock_out: "",
            description: "",
          })
        })
      } catch(error){
        this.setState({snackSeverity: 'error'});
        this.setState({snackText: 'Stok Gagal Dikurangi'});
        this.setState({snack: true})
    }
}
handleChange(event) {
  this.setState({[event.target.name]: event.target.value});
}

    render() {
      return (
        <div className="divControl">
          <h2 style={{ display: 'inline-block' }}>Stok Keluar</h2> 
          <form onSubmit={this.stockOut}>
            <TextField value={this.state.stock_out} onChange={this.handleChange} name='stock_out' label="Stock Keluar" required type='number' fullwidth style={{ width: '100%' }}/>
                <br/><br/>
            <TextField value={this.state.description} onChange={this.handleChange} name='description' multiline rows={10} label="Keterangan / Alasan" required fullwidth style={{ width: '100%' }}/>
                <br/><br/>
            <Link style={{ textDecoration: 'none' }} to={'/view/item/'+this.props.match.params.itemPK}>
              <Button>Lihat Barang</Button>
            </Link>
              <Button type='submit' style={{ float: 'right' }}>Submit</Button>
          </form>
          <Snackbar open={this.state.snack} autoHideDuration={6000} onClose={this.handleClose}>
              <Alert onClose={this.handleClose} severity={this.state.snackSeverity} sx={{ width: '100%' }}>
                  {this.state.snackText}
              </Alert>
          </Snackbar>
        </div>
      );
    }
  }
  
  export default StockOut;