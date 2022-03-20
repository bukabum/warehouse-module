import React, { Component } from 'react';
import axios from 'axios';
import { axiosInstance } from './navbar/auth/token/Api';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Snackbar, Alert, NativeSelect, FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from '@mui/material'
import { Link } from 'react-router-dom';
import { numberFormat } from './numberformat';
import Loading from "./Accessories/Loading";
import './Style/media.css'

class Viewitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            part:"",
            openDialog: false,
            cats: [],
            category: "",
            addToCart: false,
            snackText: "",
            snackSeverity: "",
            loading: true,
            uploadImage1: null,
        };
        this.getItem = this.getItem.bind(this)
        this.handleSelect = this.handleSelect.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.preOrder = this.preOrder.bind(this);
        
    }
    image1  = async (e) => {
        if(e.target.files[0]){
        await this.setState({
            viewImage1: URL.createObjectURL(e.target.files[0]),
            uploadImage1: e.target.files[0],
        })}
    }
    
      async getItem () {
        try {  
            let item = await axiosInstance.get('view/sparepart/' + this.props.match.params.itemPK + '/')
            const part = item.data;
            this.setState({part: part[0].sparepart});
            this.setState({cats: part[1].category});
            this.setState({ loading: false });
        } catch(error){
        }
    }

    async updateItem (event) {
        let data = new FormData();
        event.preventDefault();
        data.append('name', this.state.part.name)
        data.append('description', this.state.part.description)
        data.append('price', this.state.part.price)
        data.append('promo_price', this.state.part.promo_price)
        data.append('category', this.state.category)
        if (this.state.uploadImage1 !== null) {
            data.append('image', this.state.uploadImage1)
        } else {
            data.append('image', '')
        }
        try{
            await axiosInstance.put('view/sparepart/' + this.props.match.params.itemPK + '/', data, {
            }).then(() => {
                this.setState({
                    openDialog: false
                });
                this.getItem()
            })
              
        } catch(error) {

        }
    }

    async addToCart (event) {
        event.preventDefault();
        try{
            await axiosInstance.post('add/to/cart/' + this.props.match.params.itemPK + '/', {
            }).then(() => {
                this.setState({snackSeverity: 'success'});
                this.setState({snackText: 'Berhasil Dimasukan Ke Keranjang'});
                this.setState({addToCart: true});                
            })
              
        } catch(error) {
            this.setState({snackSeverity: 'error'});
            this.setState({snackText: error.response.data.message});
            this.setState({addToCart: true});                
        }
    }
    async preOrder (event) {
        event.preventDefault();
        try{
            await axiosInstance.post('pre/order/' + this.props.match.params.itemPK + '/', {
            }).then(() => {
                this.setState({snackSeverity: 'success'});
                this.setState({snackText: 'Berhasil Dimasukan Ke Keranjang'});
                this.setState({addToCart: true});                
            })
              
        } catch(error) {
            this.setState({snackSeverity: 'error'});
            this.setState({snackText: error.response.data.message});
            this.setState({addToCart: true});                
        }
    }
    handleClose (event, reason)  {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({addToCart: false});
      };
    
    handleSelect(event) {
        this.setState({category: event.target.value});
    };
    
    componentDidMount() {
        this.getItem();    
    }
    editDialog() {
        this.setState({ openDialog: true });
    }
    closeEditDialog = () => {
        this.setState({
            openDialog: false
        });
    }
    render() {
    const part = this.state.part
    const filteredCat = this.state.cats.filter(x => x.category_id !== part.category);
    const getFilteredCat = filteredCat.map(getFilteredCat => {return {'id': getFilteredCat.category_id, 'name': getFilteredCat.name}});
    const selectedCat = this.state.cats.filter(x => x.category_id == part.category);
    const getSelectedCat = selectedCat.map(getSelectedCat => {return {'id': getSelectedCat.category_id, 'name': getSelectedCat.name}});
    //console.log(getFilteredCat)
    if (this.state.loading) {
        return (
          <Loading/>
        )
    } else {
      return (
        <>
        <Grid
            container
            spacing={0}
            direction="row"
            //alignItems="center"
            justifyContent="center"
            //style={{ minHeight: '100vh' }}
        >
        <Card className="divControl" style={{ marginTop: 15 }}>
            <img src={part.image} />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                <b>{part.name}</b>
                </Typography>
                <Typography variant="body2">
                <h2><b>Deskripsi Barang</b></h2>
                <p>{part.description}</p>
                <h2><b>Stock Barang</b></h2>
                <p>{part.stock}</p>
                <h2><b>Harga Barang</b></h2>
                <p>{part.price}</p>
                <h2><b>Harga Promo</b></h2>
                <p>{part.promo_price == 0 ? 'Belum Ada Promo' : part.promo_price }</p>
                <h2><b>Kode Barang</b></h2>
                <p>{part.product_code}</p>
                <h2><b>Qr Code</b></h2>                
                </Typography>
            <img src={part.qrcode} />


            </CardContent>
            <CardActions>
                <Button onClick={() => this.editDialog()} style={{ backgroundColor: '#0275d8', color: 'white' }} variant="contained" size="small">Edit</Button>
                <Link style={{ textDecoration: 'none', marginLeft: 8 }} to={'/Warehouse-1.0/stock/out/' + part.pk}>
                    <Button style={{ backgroundColor: '#0275d8', color: 'white' }} variant="contained" size="small">Stok Keluar</Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to={'/Warehouse-1.0/stock/in/' + part.pk}>
                    <Button style={{ backgroundColor: '#0275d8', color: 'white' }} variant="contained" size="small">Stok Masuk</Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to={'/Warehouse-1.0/monthly/history/' + part.pk}>
                    <Button style={{ backgroundColor: '#0275d8', color: 'white' }} variant="contained" size="small">History</Button>
                </Link>
                {part.stock == 0 ?
                    <Button onClick={this.preOrder} style={{ backgroundColor: '#5cb85c', color: 'white' }} variant="contained" size="small">Pre Order</Button>
                :
                    <Button onClick={this.addToCart} style={{ backgroundColor: '#5cb85c', color: 'white' }} variant="contained" size="small">+ Keranjang</Button>
                }
            </CardActions>
            </Card>
          </Grid>
          <br/><br/>

          <Dialog open={this.state.openDialog} onClose={this.closeEditDialog}>
            <DialogTitle>Edit Data Barang</DialogTitle>
            <form onSubmit={this.updateItem}>
            <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
                value={part.name}
                name="name"
                required
                onChange={(e) => this.setState(prevState => ({
                    part: {...prevState.part, name: e.target.value}
                }))}
                id="outlined-basic"
                label="Nama Barang"
                autoFocus
                margin="dense"
                variant='standard'
                fullWidth
            />
            <TextField            
                name="Description"
                label="Deskripsi Barang"
                fullWidth
                value={part.description}
                onChange={(e) => this.setState(prevState => ({
                    part: {...prevState.part, description: e.target.value}
                }))}
                margin="dense"
                id="description"
                multiline
                rows='5'
                type="text"
                variant='standard'
            >
            </TextField>
            <TextField       
                onChange={(e) => this.setState(prevState => ({
                    part: {...prevState.part, price: e.target.value}
                }))}
                margin="dense"
                id="price"
                name="price"
                value={part.price}
                label="Harga Barang"
                type="number"
                variant='standard'
                fullWidth
            />
            <TextField       
                onChange={(e) => this.setState(prevState => ({
                    part: {...prevState.part, promo_price: e.target.value}
                }))}
                margin="dense"
                id="promo_price"
                name="promo_price"
                value={part.promo_price}
                label="Harga Promo"
                type="number"
                variant='standard'
                fullWidth
                InputProps={{
                    inputProps: { 
                        max: part.price, min: 0 
                    }
                  }}

            />
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Kategori</InputLabel>
                    <NativeSelect
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={this.state.category}
                        onChange={this.handleSelect}
                        label="Kategori"
                        name="category"
                        defaultValue={part.category}
                    >
                        {getSelectedCat.map(cat =>
                            <option value={cat.category_id}>
                                {cat.name}
                            </option>
                        )}
                        {getFilteredCat.map(cat => 
                            <option value={cat.category_id}>{cat.name}</option>
                        )}
                    </NativeSelect>

                </FormControl>
                    <br/><br/>
                    <Typography>
                        Gambar Produk
                    </Typography>
                <input value={this.state.image} onChange={this.image1} name="product_image" accept="image/*" type="file"/>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.closeEditDialog}>Cancel</Button>
            <Button type='submit'>Update</Button>
            </DialogActions>
            </form>
        </Dialog>
            <Snackbar open={this.state.addToCart} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity={this.state.snackSeverity} sx={{ width: '100%' }}>
                    {this.state.snackText}
                </Alert>
            </Snackbar>


          </>
      );
    }
  }
}
export default Viewitem;