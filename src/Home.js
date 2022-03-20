import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import Carousel from 'react-material-ui-carousel'
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { base } from "./navbar/auth/token/Api";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loading from "./Accessories/Loading";
import { numberFormat } from "./numberformat";
import './Style/media.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      sparepart: [],
      open: false,
      page: 1,
      total_pages: "",
      product_code: "",
      price_min: "",
      price_max: "",
      category: "",
      name: "",
      cat: [],
      loading: true,
    }
    this.callSparePart = this.callSparePart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.filterPage = this.filterPage.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.callCategory = this.callCategory.bind(this);
  }
  componentDidUpdate(prevProps){
    if(this.props.match.params.total_pages!== prevProps.match.params.total_pages){
      this.callSparePart()
  }
}

  handlePage = (event, value) => {
    this.setState({page: value},
      () => { this.callSparePart() }
    );
  };
  filterPage = (event) => {
    event.preventDefault();
    this.setState({page: 1, open: false},
    () => { this.callSparePart() }
  );
};
    resetFilter(event){
      event.preventDefault();
      this.setState({
        page: 1,
        open: false,
        total_pages: "",
        product_code: "",
        price_min: "",
        price_max: "",
        category: "",
        name: "",  
      },
        () => { this.callSparePart() 
      }
      )
    }
    
    


    async callSparePart(){
      axios.get(base+'all/sparepart/?category=' + this.state.category + '&name=' + this.state.name + '&page=' + this.state.page + '&price_max=' + this.state.price_max + '&price_min=' + this.state.price_min + '&product_code=' + this.state.product_code)
      //axios.get(base+'all/sparepart/?&page=' + this.state.page)
      .then(res => {
            this.props.history.push('/Warehouse-1.0/category=' + this.state.category + '&name=' + this.state.name + '&page=' + this.state.page + '&price_max=' + this.state.price_max + '&price_min=' + this.state.price_min + '&product_code=' + this.state.product_code)
            const sparepart = res.data;
            this.setState({ sparepart: sparepart.results });
            this.setState({ total_pages: sparepart.total_pages });
            this.setState({ loading: false });
          })
  
    }
    async callCategory(){
      axios.get(base+'category/')
      .then(res => {
            const category = res.data;
            this.setState({ cat: category });
          })
  
    }
    
      componentDidMount() {
        this.callSparePart()
        this.callCategory()
      }
      closeDialog = () => {
        this.setState({
          open: false
        });
    }
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
    handleSelect(event) {
      this.setState({category: event.target.value});
    };
      render() {
        const width = window.innerWidth
        console.log(width)
        this.handleShow = () => {
          this.setState({ open: true });
       };
       if (this.state.loading) {
        return (
          <Loading/>
        )
       } else {
          return (
          <div className="divControl">
            <h1 style={{ display: 'inline-block', margin: 0 }}>List Produk</h1>
            <Button onClick={() => this.handleShow()}  style={{ float: 'right', }}>Filter</Button>
          <br/><br/>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '100vh' }}
            >

              {this.state.sparepart.map(part => 
              <Card sx={{ minWidth: 250, maxWidth: 250, marginBottom: 10, marginLeft: 2}}>
                <CardMedia
                  style={{ maxHeight: 150, height: 150 }}
                  component="img"
                  alt={part.name}
                  image={part.image}
                />
                <CardContent>
                <Link style={{ textDecoration: 'none' }} to={'/Warehouse-1.0/view/item/' + part.pk} >
                  <Typography gutterBottom variant="h5" component="div">
                    { part.name }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <p>Stock: {part.stock}x</p>
                    <p>Kode Barang: {part.product_code}</p>
                    <p>Harga Barang: {numberFormat(part.price)}</p>
                  </Typography>
                </Link>
                </CardContent>
              </Card> )}
              </Grid>

              <Stack style={{alignItems: 'center'}} spacing={2}>
                  <Pagination  count={this.state.total_pages} page={this.state.page} onChange={this.handlePage} showFirstButton showLastButton />
              </Stack>
              <br/><br/>
              <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">
                      Filter Produk
                    </DialogTitle>
                    <br/>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <TextField
                        onChange={this.handleChange}    
                        name="name"
                        label='Nama Barang'
                        fullWidth={true}
                        multiline={true}
                      >
                      </TextField>
                      <br/><br/>
                      <TextField
                        onChange={this.handleChange}    
                        name="product_code"
                        label='Kode Barang'
                        fullWidth={true}
                        multiline={true}
                      >
                      </TextField>
                      <br/><br/>
                      <TextField
                        onChange={this.handleChange}
                        name="price_min"
                        label='Harga Min'
                        type='number'
                        fullWidth={true}
                      >
                      </TextField>
                      <br/><br/>
                      <TextField
                        onChange={this.handleChange}    
                        name="price_max"
                        type="number"
                        label='Harga Max'
                        fullWidth={true}
                      >
                      </TextField>
                      <br/><br/>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Kategori</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={this.state.category}
                          onChange={this.handleSelect}
                          label="Kategori"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {this.state.cat.map(cats => 
                          <MenuItem value={cats.category_id}>{cats.name}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button style={{ color: "white", backgroundColor: '#f0ad4e' }} onClick={this.resetFilter}>Reset</Button>
                    <Button style={{ color: "white", backgroundColor: '#d9534f', marginRight: 7 }} onClick={this.closeDialog}>Cancel</Button>
                    <form onSubmit={this.filterPage}>
                    <Button type="submit" style={{ color: "white", backgroundColor: '#5cb85c' }} onClick={() => this.onRemoveItem(this.state.activeItem)} autoFocus>
                        Submit
                    </Button>
                    </form>
                    </DialogActions>
                </Dialog>
                </div>

          </div>
        )
      }
      }
    };
export default Home;
    