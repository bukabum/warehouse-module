import React, { useEffect, useState } from 'react';
import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Paper, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, Button } from '@mui/material';
import { axiosInstance } from '../navbar/auth/token/Api';

export default function PaidOff ({visible, invisible, paidPK, instalmentPaid, instalmentPaidProof, cancelStatus, returStatus, paidProof, paidStatus, paidDate}) {
    const [uploadImage1, setUploadImage1] = useState();

    const handleClose = () => {
        invisible()
    };

    const paidOrder = async (event) => {
      event.preventDefault();
      let data = new FormData();
      data.append('payment_proof', uploadImage1)
      try {
          await axiosInstance.put('full/paid/' + paidPK + '/', data, {
          }).then(() => {
            invisible('File Berhasil Diunggah', 'success')
          })
      } catch(error){
        invisible(error.response.status === 400 ? error.response.data.message : error.response.status === 500 ? 'File Gagal Diunggah - Silahkan perbarui stock preorder terlebih dahulu sebelum melakukan pelunasan' : 'File Gagal Diunggah', 'error')
  }
}

    return (
    <Dialog fullWidth maxWidth="md" open={visible} onClose={handleClose}>
        <DialogTitle>Pelunasan</DialogTitle>
        <form onSubmit={paidOrder}>
        {cancelStatus ? 
        null
        :
        returStatus ?
        null
        :
        <>
        <DialogContent>
          <DialogContentText>
          {paidStatus ? 
          <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell align="right">Bukti</TableCell>
                    <TableCell align="right">Aksi</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{new Date(Date.parse(paidDate)).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell align="right">{paidProof.name}</TableCell>
                    <TableCell align="right"><Button size='small'><a style={{ textDecoration: 'none' }} download href={paidProof.url}>Download</a></Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
            <br/>
          </>
          :
          null}
            <b>Untuk pelunasan dan pembayaran penuh secara langsung silahkan gunakan bagian ini</b>
            
          </DialogContentText>
          <br/><br/>
          <input onChange={(e) => setUploadImage1(e.target.files[0])} required accept="image/*" type='file'/>
        </DialogContent>
        <DialogContent>
            <DialogContentText>
              <b style={{ color: 'red' }}>*Pastikan bukti pembayaran asli dengan melakukan konfirmasi ke bagian keuangan, segera bentuk kelalaian adalah tanggung jawab pengunggah</b>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'red' }} onClick={handleClose}>Batal</Button>
          <Button type='submit'>Unggah</Button>
        </DialogActions>
        </>
        
        }
        </form>
      </Dialog>

    )
}
