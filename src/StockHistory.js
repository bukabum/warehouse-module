import React, { Component } from 'react';
import { Table, TableBody, Button, Box, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Loading from "./Accessories/Loading";
import './Style/media.css'

class StockHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock:[],
      part: [],
      total_pages: "",
      page: 1,
      loading: true,
      filterDialog: false,
    };
    this.getMonthlyHistory = this.getMonthlyHistory.bind(this)
}

  async getMonthlyHistory () {
    try {  
        let item = await axiosInstance.get('monthly/stock/' + this.props.match.params.itemPK + '/')
        const stock = item.data;
        this.setState({stock: stock[0].stock});
        this.setState({part: stock[1].sparepart});
        this.setState({ loading: false });
      } catch(error){
    }
}

componentDidMount() {
    this.getMonthlyHistory();    
}

    render() {
      const part = this.state.part
      const stock = this.state.stock
      if (this.state.loading) {
        return (
          <Loading/>
        )
       } else {
      return (
        <div className="divControl">
          <br/>
          <h2 style={{ display: 'inline-block', margin: 0 }}>Monthly Stock History</h2>
          <Link to={"/Warehouse-1.0/full/history/" + this.props.match.params.itemPK }>
            <Button size='medium' style={{ float: 'right' }}>Semua History</Button> 
          </Link>
          <br/><br/>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row"><b>Stock Awal</b></TableCell>
                    <TableCell align="right"><b>Stock Akhir</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                      key='row.name'
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{part.first_stock}</TableCell>
                      <TableCell align="right">{part.stock}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <br/><br/>
          {stock.length > 0 ?
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Tanggal</b></TableCell>
                    <TableCell align="right"><b>Keterangan</b></TableCell>
                    <TableCell align="right"><b>Masuk</b></TableCell>
                    <TableCell align="right"><b>Keluar</b></TableCell>
                    <TableCell align="right"><b>Stock</b></TableCell>
                    <TableCell align="right"><b>Penanggung Jawab</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {stock.map(stonk => 
                    <TableRow
                      key='row.name'
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{new Date(Date.parse(stonk.date_added)).toLocaleDateString("id-ID")}</TableCell>
                      <TableCell align="right">{stonk.description}</TableCell>
                      <TableCell align="right">{stonk.stockin}</TableCell>
                      <TableCell align="right">{stonk.stockout}</TableCell>
                      <TableCell align="right">{stonk.stock}</TableCell>
                      <TableCell align="right">{stonk.person_responsible}</TableCell>
                    </TableRow>
                )}
                </TableBody>
              </Table>
            </TableContainer>
              : 
              <h1 style={{ textAlign: 'center' }}><b>Belum Ada Histori Bulanan</b></h1>
              }
            <br/><br/>
            
            
        </div>
      );
    }
  }
}
export default StockHistory;