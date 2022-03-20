import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Stack, Pagination, Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { axiosInstance } from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { numberFormat } from './numberformat';
import CancelDialog from './Dialog/CancelOrder';
import Instalment from './Dialog/Instalment';
import PaidOff from './Dialog/PaidOff';
import ReturnDialog from './Dialog/ReturnOrder';
import Loading from "./Accessories/Loading";
import './Style/media.css'
import NoteDialog from './Dialog/Note';
import DeleteNoteDialog from './Dialog/DeleteNote';

export default function OrderDetail (props) {
    const [openCancel, setOpenCancel] = useState(false);
    const [openInstalment, setOpenInstalment] = useState(false);
    const [openPaidOff, setOpenPaidOff] = useState(false);
    const [openReturn, setOpenReturn] = useState(false);
    const [openNote, setOpenNote] = useState(false);
    const [order, setOrder] = useState([]);
    const [orderitem, setOrderItem] = useState([]);
    const [cancelPk, setCancelPk] = useState();
    const [returnPk, setReturnPk] = useState();
    const [instalmentPk, setInstalmentPk] = useState();
    const [snack, setSnack] = useState(false);
    const [snackText, setSnackText] = useState();
    const [snackSeverity, setSnackSeverity] = useState();
    const [instalment, setInstalment] = useState([]);
    const [paidPK, setPaidPK] = useState([]);
    const [loading, setLoading] = useState(true);
    const [instalmentPaid, setInstalmentPaid] = useState();
    const [instalmentPaidProof, setInstalmentPaidProof] = useState();
    const [openDeleteNote, setOpenDeleteNote] = useState(false);
    
    const getOrder = async () => {
        try {
            const { data } = await axiosInstance.get('order/detail/' + props.match.params.itemPK + '/')
            const order = data;
            setOrder(order[0].order);
            setOrderItem(order[1].orderitem);
            setInstalment(order[2].payment)
            setLoading(false)
        } catch(error){
    }
}
const handleOpenCancel = (pk) => {
    if (openCancel == true) {
        setOpenCancel(false);
    } else {
        setOpenCancel(true);
        setCancelPk(pk)
    }
}

const handleInstalment = (pk, paid, paid_proof, retur, cancel) => {
    if (openInstalment == true) {
        setOpenInstalment(false);
    } else {
        setOpenInstalment(true);
        setInstalmentPk(pk)
        setInstalmentPaid(paid)
        setInstalmentPaidProof(paid_proof)
        console.log(retur, cancel)
    }
}

const handlePaidOff = (pk) => {
    if (openPaidOff == true) {
        setOpenPaidOff(false);
    } else {
        setOpenPaidOff(true);
        setPaidPK(pk)
    }
}

const handleOpenReturn = (pk) => {
    if (openReturn == true) {
        setOpenReturn(false);
    } else {
        setOpenReturn(true);
        setReturnPk(pk)
    }
}
const handleOpenDeletNote = () => {
    if (openDeleteNote == true) {
        setOpenDeleteNote(false);
    } else {
        setOpenDeleteNote(true);
    }
}
const handleOpenNote = (pk) => {
    if (openNote == true) {
        setOpenNote(false);
    } else {
        setOpenNote(true);
    }
}
const handleCloseSnack = () => {
    setSnack(false)
    setSnackText('')
    setSnackSeverity('')
}
const invisible = (text, severity) => {
    setOpenCancel(false);
    setOpenInstalment(false);
    setOpenPaidOff(false);
    setOpenReturn(false);
    setOpenNote(false);
    setOpenDeleteNote(false)
    if (text !== undefined) {
        setSnack(true)
        setSnackText(text)
        setSnackSeverity(severity)
        getOrder()
    }
}

var payment = instalment.map(pay => {return pay.nilai})
var sum_payment = payment.reduce((partialSum, a) => partialSum + a, 0)
useEffect (() => {
    getOrder();
}, []);
    if (loading) {
        return (
        <Loading/>
        )
    } else {

        return (
        <div className="divControl">
            <h2 style={{ display: 'inline-block' }}>Order Detail</h2> 
            <Card>
                <CardContent>
                        <Typography>
                            <h2>Order - {order.order_code}</h2>
                        </Typography>
                        <Typography>
                            <p>Nama Pemesan: <Link style={{ textDecoration: 'none' }} to={"/Warehouse-1.0/customer/detail/" + order.customer.id}>{order.customer ? order.customer.nama_pelanggan : '' }</Link></p>
                            <p>Alamat: {order.customer ? order.customer.alamat : '' }, {order.customer ? order.customer.kota : '' }, {order.customer ? order.customer.provinsi : ''}</p>
                            <p>No Hp: {order.customer ? order.customer.no_hp : ''}</p>
                            <p>Status Pembayaran: {order.retur ? 'Pesanan Di Retur' : order.cancel ? 'Pesanan Dibatalkan' : order.paid ? 'Lunas' : 'Belum Lunas'}</p>
                            <p>{order.retur ? 'Alasan Retur: ' +  order.retur_reason : order.cancel ?  'Alasan Pembatalan: ' + order.cancel_reason : null  }</p>
                            <p>{order.retur ? 'Tanggal Retur: ' +  new Date(Date.parse(order.retur_date)) : order.cancel ?  'Tanggal Pembatalan: ' + new Date(Date.parse(order.cancel_date)) : null  }</p>
                            <p>Total Order: {order.total_amount ? numberFormat(order.total_amount) : '' }</p>
                            <p>{order.paid ? '' : sum_payment > 0 ? 'Terbayar: ' + numberFormat(sum_payment) : '' }</p>
                            <p>{order.paid ? '' : sum_payment > 0 ? 'Belum Terbayar: ' + numberFormat(order.total_amount - sum_payment) : '' }</p>
                            {order.discount > 0? 
                                <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Harga Sebelum Potongan</TableCell>
                                        <TableCell align="right">Potongan</TableCell>
                                        <TableCell align="right">Harga Akhir</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{numberFormat(order.total_amount + order.discount)}</TableCell>
                                        <TableCell align="right">{numberFormat(order.discount)}</TableCell>
                                        <TableCell align="right">{numberFormat(order.total_amount)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            : null }
                        </Typography>
                    <CardActions>
                        <Link to={"/Warehouse-1.0/order/invoice/" + props.match.params.itemPK} style={{ textDecoration: 'none' }}><Button>Invoice</Button></Link>
                        {order.retur ? '' : order.cancel ? '' : order.paid ? <Button onClick={() => handlePaidOff(order.pk)}>Histori Pelunasan</Button> : <Button onClick={() => handlePaidOff(order.pk)}>Pelunasan</Button>}
                        {order.paid ? <Button onClick={() => handleInstalment(order.pk)} >Histori Pembayaran</Button>  : order.retur ? <Button onClick={() => handleInstalment(order.pk, order.paid, order.paid_proof)} >Histori Pembayaran</Button>  : order.cancel ? <Button onClick={() => handleInstalment(order.pk)} >Histori Pembayaran</Button> : <Button onClick={() => handleInstalment(order.pk)} >Pembayaran</Button>}
                        {order.paid ? '' : order.retur ? '' : order.cancel ? '' : <Button onClick={() => handleOpenCancel(order.pk)} style={{color: 'red'}}>Batalkan</Button>}{order.retur ? '' : order.cancel ? '' : order.paid ? <Button onClick={() => handleOpenReturn(order.pk)} style={{color: 'red'}}>Retur</Button> : ''}
                        <Button onClick={() => handleOpenNote(order.pk)}>Catatan</Button>
                    </CardActions>
                </CardContent>
            </Card>
            <br/>
            {order.note ? 
            <Card>
                <CardContent>
                    <Typography>
                        <h2>Catatan</h2>
                        <p>{order.note}</p>
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button onClick={handleOpenDeletNote}>Hapus</Button>
                </CardActions>
            </Card>
            : null }
            <br/>
                <h2>Item Pesanan</h2>
            <br/>
        {orderitem.map(item => 
            <Card sx={{ marginBottom: 5 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.receipt.parts.name} {item.preorder ? ' - (Pre-Order)' : null}
                    </Typography>
                    <Typography variant="body2">
                            Kode Produk: {item.receipt.parts.product_code}
                        <br/>
                            {item.external_note ? <> Catatan Dari Konsumen: {item.external_note} </> : null }
                        <br/>
                            {item.internal_note ? <> Catatan Untuk Gudang: {item.internal_note} </> : null }
                    </Typography>
                    <br/>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Harga Barang Satuan</TableCell>
                            <TableCell align="right">Potongan (per barang)</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Harga Akhir</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{item.receipt.parts.promo_price ? numberFormat(item.receipt.parts.promo_price) : numberFormat(item.receipt.parts.price)}</TableCell>
                            <TableCell align="right">{numberFormat(item.discount)}</TableCell>
                            <TableCell align="right">{item.quantity}x</TableCell>
                            <TableCell align="right">{numberFormat(item.total_price)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>

                </CardContent>
                <CardActions>
                </CardActions>
            </Card> 
        )}
            <CancelDialog visible = {openCancel} invisible = {invisible} cancelPk = {cancelPk} />
            <Instalment paidStatus = {order.paid} cancelStatus = {order.cancel} returStatus = {order.retur} instalmentPaidProof={instalmentPaidProof} instalmentPaid={instalmentPaid} instalment = {instalment} visible = {openInstalment} invisible = {invisible} instalmentPk = {instalmentPk}/>
            <PaidOff paidDate = {order.paid_date} paidProof = {order.paid_proof} paidStatus = {order.paid} cancelStatus = {order.cancel} returStatus = {order.retur} instalmentPaidProof={instalmentPaidProof} instalmentPaid={instalmentPaid} visible = {openPaidOff} invisible = {invisible} paidPK = {paidPK} />
            <ReturnDialog visible = {openReturn} invisible = {invisible} returnPk = {returnPk}/>   
            <NoteDialog notetext = {order.note} visible = {openNote} notePk = {order.pk} invisible = {invisible} />
            <DeleteNoteDialog visible = {openDeleteNote} notePk = {order.pk} invisible = {invisible} />
            <Snackbar open={snack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
                    {snackText}
                </Alert>
            </Snackbar>
         
        </div>
      );
    }
  }
  
