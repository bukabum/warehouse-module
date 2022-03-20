import React, { Component } from 'react';
import { Alert, TextField, Stack, Button, Snackbar, MuiAlert, CardActions, CardContent, Typography } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Style/media.css'

class AddCustomer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        cus:[],
        total_pages: "",
        page: 1,
        snack: false,
        snackText: "",
        snackSeverity: ""
      };
      this.postCustomer = this.postCustomer.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleClose = this.handleClose.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
   handleClose (event, reason)  {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snack: false});
  };

    async postCustomer (event) {
        event.preventDefault();
        try {  
            const item = await axiosInstance.post('new/customer/', {
                nama_pelanggan : this.state.name,
                catatan : this.state.note,
                alamat : this.state.address,
                kota : this.state.city,
                provinsi : this.state.provence,
                no_hp : this.state.phone,
            }).then(() => {
                this.setState({snackSeverity: 'success'});
                this.setState({snackText: 'Data Berhasil Ditambahkan'});
                this.setState({snack: true})
                this.setState({
                    nama_pelanggan: "",
                    catatan: "",
                    alamat: "",
                    kota: "",
                    provinsi: "",
                    no_hp: "",
                })        
                this.props.history.push("/view/customer")
            })
            } catch(error){
        }
    }
      render() {
        return (
          <div className="divControl">
            <h2 style={{ display: 'inline-block' }}>Tambah Pelanggan</h2> 
            <br/><br/>
            <form onSubmit={this.postCustomer}>
            <TextField name="name" onChange={this.handleChange} label="Nama Penerima" required fullWidth style={{ width: '100%' }}/>
                <br/><br/>
            <TextField name="phone" onChange={this.handleChange} label="No Hp" required type='number' fullwidth style={{ width: '100%' }}/>
                <br/><br/>
            <TextField name="address" onChange={this.handleChange} label="Alamat Pengiriman" required fullwidth style={{ width: '100%' }}/>
                <br/><br/>
            <TextField name="city" onChange={this.handleChange} label="Kota" required fullwidth style={{ width: '100%' }}/>
                <br/><br/>
            <TextField name="provence" onChange={this.handleChange} label="Provinsi" required fullwidth style={{ width: '100%' }}/>
                <br/><br/>
            <TextField name="note" onChange={this.handleChange} multiline rows={10} label="Catatan" fullwidth style={{ width: '100%' }}/>
                <br/><br/>
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
    
    export default AddCustomer;