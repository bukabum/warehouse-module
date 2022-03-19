import React, { Component } from 'react';
import { Snackbar, Alert, Stack, Pagination, Button, Box, Card, CardActions, CardContent, Typography, TextField } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Style/media.css'

class StockIn extends Component {
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
    this.stockIn = this.stockIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async stockIn (event) {
    event.preventDefault();
    console.log(this.state.stock_in)
    try {  
        await axiosInstance.post('stock/in/' + this.props.match.params.itemPK + '/', {
          stockin: this.state.stock_in,
          description: this.state.description,
        }).then(() => {
          this.setState({snackSeverity: 'success'});
          this.setState({snackText: 'Stok Berhasil Ditambah'});
          this.setState({snack: true})
          this.setState({
            stock_in: "",
            description: "",
          })
        })
      } catch(error){
    }
}
handleChange(event) {
  this.setState({[event.target.name]: event.target.value});
}


    render() {
      return (
        <div className="divControl">
          <h2 style={{ display: 'inline-block' }}>Stok Masuk</h2> 
          <form onSubmit={this.stockIn}>
            <TextField value={this.state.stock_in} onChange={this.handleChange} name='stock_in' label="Stock Masuk" required type='number' fullwidth style={{ width: '100%' }}/>
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
  
  export default StockIn;