import React, { Component } from 'react';
import { Snackbar, Alert, Autocomplete, TextField, Stack, Pagination, Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { numberFormat } from "./numberformat";
import Loading from "./Accessories/Loading";
import './Style/media.css'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      customer: [],
      snack: false,
      snackText: "",
      snackSeverity: "",
      selected_customer: "",
      discount: 0,
      loading: true,
    };
    this.getCart = this.getCart.bind(this)
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleChangeInternalNote = this.handleChangeInternalNote.bind(this)
    this.handleChangeExternalNote = this.handleChangeExternalNote.bind(this)
    this.handleChangePotongan = this.handleChangePotongan.bind(this)
    this.updateCart = this.updateCart.bind(this)
    this.checkData = this.checkData.bind(this)
    this.onRemoveItem = this.onRemoveItem.bind(this)
    this.deleteCart = this.deleteCart.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.requestOrder = this.requestOrder.bind(this)
}

async requestOrder () {
  try {  
      await axiosInstance.put('post/cart/', {
        customer: this.state.selected_customer,
        discount: this.state.discount
      }).then(() => {
        this.props.history.push('/Warehouse-Customer/order/list/?page=1')
      })
    } catch(error){
      this.setState({snackSeverity: 'error'});
      this.setState({snackText: error.response.data.message ? error.response.data.message : 'Potongan tidak boleh melebihi total harga'});
      this.setState({snack: true});                
  }
}

async getCart () {
  try {  
      let item = await axiosInstance.get('view/cart/')
      const cart = item.data;
      this.setState({cart: cart[0].orderitem});
      this.setState({customer: cart[1].customer});
      this.setState({ loading: false });
    } catch(error){
      this.setState({ loading: false });
  }
}
async updateCart (e, pk, quantity, internal_note, external_note, discount) {
  e.preventDefault();
  //console.log(external_note)
  console.log(pk)
  try{
      await axiosInstance.put('edit/cart/' + pk + '/', {
        quantity: quantity,
        internal_note: internal_note,
        external_note: external_note,
        discount: discount,
        discount: discount,
      }).then(() => {
          this.setState({snackSeverity: 'success'});
          this.setState({snackText: 'Item Diperbarui'});
          this.setState({snack: true});                
      })
        
  } catch(error) {
      this.setState({snackSeverity: 'error'});
      this.setState({snackText: error.response.data.message});
      this.setState({snack: true});                
  }
}

async deleteCart (e, pk) {
  e.preventDefault();
  //console.log(external_note)
  try{
      await axiosInstance.delete('edit/cart/' + pk + '/', {
      }).then(() => {
          this.setState(state => {
            const cart = state.cart.filter(cart => cart.pk !== pk);
            //console.log(cart)
            return {
              cart
            };
          });      
          this.setState({snackSeverity: 'error'});
          this.setState({snackText: 'Baranng dihapus dari keranjang'});
          this.setState({snack: true});                
      })
        
  } catch(error) {
      this.setState({snackSeverity: 'error'});
      this.setState({snackText: error.response.data.message});
      this.setState({addToCart: true});                
  }
}

componentDidMount() {
    this.getCart();    
}
handleChangeQuantity= (e, id) => {
  const CartIndex = this.state.cart.findIndex(c => {
    return c.pk === id
  })

  const cart = {...this.state.cart[CartIndex]}

  cart.quantity = e.target.value

  const keranjang = [...this.state.cart]
  keranjang[CartIndex] = cart

  this.setState({ cart: keranjang })
  //console.log(keranjang)
}

handleChangeInternalNote= (e, id) => {
  const CartIndex = this.state.cart.findIndex(c => {
    return c.pk === id
  })

  const cart = {...this.state.cart[CartIndex]}

  cart.internal_note = e.target.value

  const keranjang = [...this.state.cart]
  keranjang[CartIndex] = cart

  this.setState({ cart: keranjang })
  //console.log(keranjang)
}

handleChangeExternalNote= (e, id) => {
  const CartIndex = this.state.cart.findIndex(c => {
    return c.pk === id
  })

  const cart = {...this.state.cart[CartIndex]}

  cart.external_note = e.target.value

  const keranjang = [...this.state.cart]
  keranjang[CartIndex] = cart

  this.setState({ cart: keranjang })
  //console.log(keranjang)
}

handleChangePotongan= (e, id) => {
  const CartIndex = this.state.cart.findIndex(c => {
    return c.pk === id
  })

  const cart = {...this.state.cart[CartIndex]}

  cart.discount = e.target.value

  const keranjang = [...this.state.cart]
  keranjang[CartIndex] = cart

  this.setState({ cart: keranjang })
  //console.log(keranjang)
}
onRemoveItem = id => {
  this.setState(state => {
    const cart = state.cart.filter(cart => cart.pk !== id);
    console.log(cart)
    return {
      cart
    };
  });
};

checkData = (quantity, note, discount) => {
  console.log(quantity, note, discount)
}
handleClose (event, reason)  {
  if (reason === 'clickaway') {
    return;
  }

  this.setState({snack: false});
};

  render() {
      const customer = this.state.customer.map(customer => {return {'name': customer.nama_pelanggan + ' - ' + customer.no_hp  + ' - ' +  customer.alamat  + ' - ' +  customer.kota  + ' - ' + customer.provinsi, 'pk': customer.pk}})
      const cart = this.state.cart
      //console.log(customer)
      if (this.state.loading) {
        return (
          <Loading/>
        )
      } else {
      return (
        <div className="divControl">
          {cart.length > 0? 
          <>
          <h2 style={{ display: 'inline-block' }}>List Keranjang</h2> 
          {cart.map((car) => 
          <div key={car.pk}>
          <Card key={car.pk} sx={{ minWidth: 275 }}>
          <form onSubmit={e => this.updateCart(e, car.pk, car.quantity, car.internal_note, car.external_note, car.discount)}>
            <CardContent>
              <Typography variant="h5" component="div">
                <b>{car.parts.name} {car.preorder ? '(Pre-Order)' : ''}</b>
              </Typography>
                <br/>
              <Typography>
                {car.parts.product_code}
                <br />
                {car.parts.promo_price == 0 ? numberFormat(car.parts.price) : numberFormat(car.parts.promo_price)}
                
                <br/>
                {car.catatan}
              </Typography>
              <br/>
                <TextField 
                    value={car.quantity}
                    style={{ width: '100%' }} 
                    margin="dense" 
                    id="outlined-basic" 
                    type="number" 
                    label="Quantity" 
                    variant="outlined"
                    name="Quantity"
                    InputProps={{
                      inputProps: { 
                          max: 1000, min: 1 
                      }
                    }}
                    onChange={(e) => this.handleChangeQuantity(e, car.pk)}    
                  />
                <TextField 
                    value={car.internal_note}
                    style={{ width: '100%' }} 
                    margin="dense" 
                    id="outlined-basic" 
                    type="text" 
                    label="Catatan Untuk Gudang" 
                    variant="outlined" 
                    onChange={(e) => this.handleChangeInternalNote(e, car.pk)}    
                  />
                <TextField 
                    value={car.external_note}
                    style={{ width: '100%' }} 
                    margin="dense" 
                    id="outlined-basic" 
                    type="text" 
                    label="Catatan Dari Pelanggan" 
                    variant="outlined" 
                    onChange={(e) => this.handleChangeExternalNote(e, car.pk)}    
                  />
                <TextField 
                    value={car.discount} 
                    style={{ width: '100%' }} 
                    margin="dense" 
                    id="outlined-basic" 
                    type="number" 
                    label="Potongan (Per Barang)" 
                    variant="outlined" 
                    InputProps={{
                      inputProps: { 
                          max: car.parts.price, min: 0 
                      }
                    }}
                    onChange={(e) => this.handleChangePotongan(e, car.pk)}    
                  />

            </CardContent>
            <CardActions>
              <Button onClick={(e) => this.deleteCart(e, car.pk)} style={{ color: 'red' }} size="small">Hapus</Button>
              <Button type='submit' style={{ float: 'right' }} size="small">Perbarui</Button>
            </CardActions>
            </form>
          </Card>
          <br/>
          </div>
        )}
        <br/>
          <Typography variant="h5" component="div">
            <b>Pelanggan</b>
          </Typography>
        <br/>
        <Autocomplete
          onChange={(event, value) => this.setState({selected_customer: value.pk})}
          //onChange={(event, value) => console.log(value.pk)}
          style={{ width: '100%' }}
          disablePortal
          id="combo-box-demo"
          options={customer}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.pk}
          sx={{ width: 300 }}
          //renderInput={(params) => <TextField fullwidth {...params} label="Pilih Pelanggan" />}
          renderInput={(params) =>  <TextField fullwidth {...params} label="Pilih Pelanggan" />}
        />
        <br/>
          <TextField onChange={(event) => this.setState({discount: event.target.value})} style={{ width: '100%' }} margin="dense" id="outlined-basic" type="number" label="Potongan Harga" variant="outlined" />
        <br/><br/><br/><br/>
          <Button onClick={this.requestOrder} style={{ float: 'right' }}>Submit</Button>
        <br/><br/><br/><br/>
        <Snackbar open={this.state.snack} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity={this.state.snackSeverity} sx={{ width: '100%' }}>
                {this.state.snackText}
            </Alert>
        </Snackbar>
        </>
        : 
        <h1 style={{ textAlign: 'center' }}><b>Keranjang Kosong</b></h1>
        }
        </div>
      );
    }
  }
}

export default Cart;