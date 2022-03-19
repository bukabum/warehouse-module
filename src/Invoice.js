import React, { useEffect, useState } from 'react';
import { Grid, ImageListItem, ImageList, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Typography, CardActions } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { numberFormat } from './numberformat';
import Loading from "./Accessories/Loading";
import './Style/invoice.css'
export default function Invoice (props) {
    const [order, setOrder] = useState([]);
    const [orderitem, setOrderItem] = useState([]);
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [promo, setPromo] = useState(true);

    const getInvoice = async () => {
        try {
            const { data } = await axiosInstance.get('invoice/' + props.match.params.orderPK + '/')
            const order = data;
            setOrder(order[0].order);
            setOrderItem(order[1].orderitem);
            setLogo(order[2].logo.logo);
            setPromo(order[3].promo);
            setLoading(false) 
        } catch(error){
    }
}
    const total_amount = () => {
        return order.discount + order.total_amount
    }

    useEffect (() => {
        getInvoice()
    }, [])
    if (loading) {
        return (
          <Loading/>
        )
       } else {

    return (
    
    <div className="invoice" style={{ maxWidth: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
        <br/><br/>
        <Card>
            <div style={{ padding: 20 }}>
                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                        <TableCell width="90" style={{ maxWidth: 90 }}><img width='90' src={logo} /></TableCell>
                        <TableCell align="left"><h2>Bukabum.com</h2></TableCell>
                        </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>

                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                        <TableCell><b>Detail Pesanan</b></TableCell>
                        <TableCell><b>Detail Pengiriman</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                Order - {order.order_code}
                                    <br/>
                                {new Date(Date.parse(order.creation_date)).toLocaleDateString("id-ID")}
                                    <br/>
                                {order.paid ? "Lunas" : "Belum Lunas"}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {order.customer ? order.customer.nama_pelanggan : ''}
                                    <br/>
                                {order.customer ? order.customer.no_hp : ''}
                                    <br/>
                                {order.customer ? order.customer.alamat : ''}, {order.customer ? order.customer.kota : ''}, {order.customer ? order.customer.provinsi : ''}
                                    <br/>
                                {order.customer ? order.customer.catatan : ''}
                            </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                        <TableCell style={{ width: '20%' }}><b>Item</b></TableCell>
                        <TableCell style={{ width: '20%' }}><b>Harga Satuan</b></TableCell>
                        <TableCell style={{ width: '20%' }}><b>Potongan (Per Barang)</b></TableCell>
                        <TableCell style={{ width: '20%' }}><b>Jumlah</b></TableCell>
                        <TableCell style={{ width: '20%' }}><b>Total</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderitem.map(order => 
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.receipt.parts.name} {order.preorder ? ' - (Pre-Order)' : null}
                                </TableCell>
                                <TableCell>{order.receipt.parts.promo_price ? numberFormat(order.receipt.parts.promo_price) : numberFormat(order.receipt.parts.price)}</TableCell>
                                <TableCell>{order.discount ? numberFormat(order.discount) : 'Rp 0' }</TableCell>
                                <TableCell>{order.quantity}x</TableCell>
                                <TableCell>{order.total_price ? numberFormat(order.total_price) : ''}</TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                
                <TableContainer justifyContent="flex-end">
                    <Table sx={{ minWidth: '100%', float: 'right' }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b></b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b></b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b></b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b>Total: </b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b>{numberFormat(order.discount + order.total_amount)}</b></TableCell>
                            
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b></b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b></b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b></b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b>Potongan: </b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b>{order.discount ? numberFormat(order.discount) : 'Rp 0' }</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b></b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b></b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b></b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b>Harga Akhir: </b></TableCell>
                            <TableCell style={{ width: '20%', borderBottom: "none" }}><b>{order.total_amount ? numberFormat(order.total_amount) : '' }</b></TableCell>
                        </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                <br/>
                <Typography>
                    {order.paid ?
                    null
                    : 
                    <div>
                        <b>Silahkan Lakukan Pembayaran Ke</b>
                            <br/><br/>
                                Nama Bank: Bank Central Asia (BCA)
                            <br/>
                                Nama Rekening: PT. Bergerak Unggul Makmur
                            <br/>
                                Nomor Akun: ......
                            <br/><br/>
                                Atau
                            <br/><br/>
                                Nama Bank: Bank Mandiri
                            <br/>
                                Nama Rekening: PT. Bergerak Unggul Makmur
                            <br/>
                                Nomor Akun: ......
                            <br/><br/>

                    </div>
                    }
                </Typography>
                {promo.length > 0 ?
                <>
                <div style={{ backgroundColor: 'red' }}>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Our Promo</h1>
                </div>

                <br/>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    {promo.map((item) => (
                        <img
                            src={`${item.promotion}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.promotion}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                            height='200px'
                            style={{ marginRight: 5, marginLeft: 5 }}
                        />
                    ))}
                </Grid>
                </>
                : 
                null}
            </div>
        </Card>
        <br/><br/>
    </div>
    )
}
}