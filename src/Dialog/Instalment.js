import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../navbar/auth/token/Api';
import { Paper, TableBody, TableContainer, Table, TableHead, TableRow, TableCell, DialogTitle, Button, TextField, Dialog, DialogActions, DialogContentText, DialogContent } from '@mui/material';
import { numberFormat } from '../numberformat';
export default function Instalment ({visible, invisible, instalmentPk, instalment, instalmentPaid, instalmentPaidProof, cancelStatus, returStatus, paidStatus}) {
    const [note, setNote] = useState();
    const [amount, setAmount] = useState();
    const [uploadImage1, setUploadImage1] = useState();
    const [openDelete, setOpenDelete] = useState(false);
    const [deletePK, setDeletePK] = useState("");

    const handleClose = () => {
      invisible()
  };
  const handleDeleteDialog = (pk) => {
    if (openDelete == true){
      setOpenDelete(false)
      setDeletePK("")
    } else {
      setOpenDelete(true)
      setDeletePK(pk)
    }
  };

    const returnOrder = async (event) => {
      event.preventDefault();
      let data = new FormData();
      data.append('amount', amount)
      data.append('note', note)  
      data.append('proof', uploadImage1)
      try {
          await axiosInstance.post('down/payment/order/' + instalmentPk + '/', data, {
          }).then(() => {
            setNote('')
            setAmount('')
            invisible('File Berhasil Diunggah', 'success')
          })
      } catch(error){
        invisible(error.response.data.message, 'error')
  }
}

  const deleteOrder = async (event) => {
    event.preventDefault();
    try {
        await axiosInstance.delete('down/payment/order/' + deletePK + '/', {
        }).then(() => {
          setOpenDelete(false)
          setNote('')
          setAmount('')
          invisible('File Berhasil Dihapus', 'success')
        })
    } catch(error){
      console.log(error)
      invisible('File Gagal Dihapus', 'error')
  }
}

  return (
    <>
    <Dialog scroll={'paper'} fullWidth maxWidth="md" open={visible} onClose={handleClose}>
        <DialogTitle>Pembayaran Cicilan atau Bertahap</DialogTitle>
        <form onSubmit={returnOrder}>
        <DialogContent>
        {instalment.length > 0 ?
          <DialogContentText>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width="15%">Tanggal</TableCell>
                <TableCell width="20%">Nilai</TableCell>
                <TableCell width="50%">Catatan</TableCell>
                <TableCell width="10%">Bukti</TableCell>
                <TableCell width="10%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instalment.map(install => 
                <TableRow              
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date(Date.parse(install.creation_date)).toLocaleDateString("id-ID")}
                    <br/>
                  </TableCell>
                  <TableCell>{numberFormat(install.nilai)}</TableCell>
                  <TableCell>{install.note !== 'undefined' ? install.note : ''}</TableCell>
                  <TableCell><Button size='small'><a style={{ textDecoration: 'none' }} download href={install.proof.url}>Download</a></Button></TableCell>
                  <TableCell><Button size='small' onClick = {() => handleDeleteDialog(install.pk)} style={{ color: 'red' }}>Hapus</Button></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
          </DialogContentText>
        :          
        <div>
          <h2 style={{ textAlign: 'center' }}>Tidak ada histori pembayaran bertahap</h2>
        </div>
           }
          {cancelStatus ? 
          null
          :
          returStatus ?
          null
          :
          paidStatus ? 
          null 
          :
          <>
          <br/><br/>
          <DialogContentText>
            <b>Harap gunakan bagian ini jika pembayaran dilakukan secara 
            bertahap atau menggunakan metode cicilan, untuk pelunasan silahkan ke bagian pelunasan
            </b>
            <br/><br/>
            <b>Jika langsung membayar lunas harap gunakan bagian pelunasan</b>
          </DialogContentText>
          <br/>
          </>}
          {cancelStatus ? 
          null
          :
          returStatus ?
          null
          :
          paidStatus ? 
          null 
          :
          <>
            <TextField
                margin="dense"
                id="name"
                label="Nominal"
                type="number"
                fullWidth
                variant="standard"
                name="amount"
                required
                onChange={e => setAmount(e.target.value)}
        />
        <br/>
            <TextField
              margin="dense"
              id="name"
              label="Catatan"
              type="text"
              fullWidth
              variant="standard"
              name="note"
              multiline
              onChange={e => setNote(e.target.value)}
            />
        <br/><br/>
         <input onChange={(e) => setUploadImage1(e.target.files[0])} required accept="image/*" type='file'/>
         </>}
        </DialogContent>
        {cancelStatus ? 
          null
          :
          returStatus ?
          null
          :
          paidStatus ? 
          null 
          :
          <>
        <DialogContent>
            <DialogContentText>
                <b style={{ color: 'red' }}>*Pastikan bukti pembayaran asli dengan melakukan konfirmasi ke bagian keuangan, segera bentuk kelalaian adalah tanggung jawab pengunggah</b>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'red' }} onClick={handleClose}>Batal</Button>
          <Button type='submit'>Unggah</Button>
        </DialogActions>
        </>}
        </form>
      </Dialog>

      <Dialog fullWidth={true} maxWidth="sm" open={openDelete} onClose={handleDeleteDialog}>
        <form onSubmit={deleteOrder}>
        <DialogTitle>Hapus Bukti Transaksi ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialog}>Batal</Button>
          <Button style={{ color: 'red' }} type="submit">Hapus</Button>
        </DialogActions>
        </form>
      </Dialog>

      </>
    )
}
