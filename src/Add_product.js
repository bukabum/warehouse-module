import React, { Component } from 'react';
import { Snackbar, Alert, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { base } from "./navbar/auth/token/Api";
import './Style/media.css'

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cat:[],
        uploadImage1: null,
        snackSeverity: "",
        snackText: "",
        snack: false,
    };
    this.callCategory = this.callCategory.bind(this)
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.handleClose = this.handleClose.bind(this);
}
handleClose (event, reason)  {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snack: false});
  };

async callCategory(){
    axios.get(base+'category/')
    .then(res => {
          const category = res.data;
          this.setState({ cat: category });
        })

}
image1  = async (e) => {
    if(e.target.files[0]){
    await this.setState({
        viewImage1: URL.createObjectURL(e.target.files[0]),
        uploadImage1: e.target.files[0],
    })}
}
async newProduct (event) {    
    let data = new FormData();
    event.preventDefault();
    data.append('name', this.state.name)
    data.append('description', this.state.description)
    data.append('first_stock', this.state.first_stock)
    data.append('price', this.state.price)
    data.append('category', this.state.category)
    data.append('image', this.state.uploadImage1)
    try{
        await axiosInstance.post('new/sparepart/', data, {            
        }).then(() => {
            this.setState({snackSeverity: 'success'});
            this.setState({snackText: 'Produk Berhasil Ditambahkan'});
            this.setState({snack: true})
            this.setState({
                name: '',
                description: '',
                first_stock: '',
                price: '',
                category: '',
                image: null,
              })      
            this.props.history.push("/Warehouse-1.0")
        })
    }catch (error) {

    }
}
  handleSelect(event) {
    this.setState({category: event.target.value});

  };
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

componentDidMount() {
    this.callCategory();    
}

    render() {
      return (
        <div className="divControl">
            <br/>
            <h2 style={{ display: 'inline-block' }}>Tambah Produk</h2>
                <br/><br/>
            <form onSubmit={this.newProduct}>
                <TextField value={this.state.name} name="name" required onChange={this.handleChange} style={{ width: '100%' }} id="outlined-basic" label="Nama Barang" variant="outlined" />
                    <br/><br/>
                <TextField value={this.state.description} name="description" required onChange={this.handleChange} style={{ width: '100%' }}  id="outlined-basic" label="Deskripsi Barang" variant="outlined" />
                    <br/><br/>
                <TextField value={this.state.first_stock} name="first_stock" required onChange={this.handleChange} type='number' style={{ width: '100%' }}  id="outlined-basic" label="Jumlah Stock" variant="outlined" />
                    <br/><br/>
                <TextField value={this.state.price} name="price" required onChange={this.handleChange} type='number' style={{ width: '100%' }}  id="outlined-basic" label="Harga Barang" variant="outlined" />
                    <br/><br/>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Kategori</InputLabel>
                    <Select
                        value={this.state.category}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={this.handleSelect}
                        label="Kategori"
                        name="category"
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {this.state.cat.map(cats => 
                            <MenuItem value={cats.category_id}>{cats.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>

            <p>Gambar Produk</p>
                <input value={this.state.image} onChange={this.image1} required name="product_image" accept="image/*" type="file"/>
                <Button type='submit' style={{ float: 'right' }}>Submit</Button>
            </form>
            <br/><br/>
            <img src={this.state.viewImage1}/>
            <br/><br/>
            <Snackbar open={this.state.snack} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity={this.state.snackSeverity} sx={{ width: '100%' }}>
                    {this.state.snackText}
                </Alert>
            </Snackbar>
        </div>
      );
    }
  }
  
  export default AddProduct;