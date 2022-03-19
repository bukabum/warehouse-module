import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../navbar/auth/token/Api';
import { DialogTitle, TextField, DialogContentText, DialogContent, Button, DialogActions, Dialog } from '@mui/material';

export default function CancelDialog ({props, visible, invisible, cancelPk}) {
    const [reason, setReason] = useState();
    const handleClose = () => {
        invisible()
    };

    const cancelOrder = async (event) => {
      event.preventDefault();
      try {
          await axiosInstance.put('cancel/order/' + cancelPk + '/', {
            reason: reason,
          }).then(() => {
            setReason('')
            invisible('Item Berhasil Dibatalkan', 'success')
          })
      } catch(error){
        console.log(error)
        invisible('Item Gagal Untuk Dibatalkan', 'error')
  }
}

    return (
    <Dialog fullWidth maxWidth="md" open={visible} onClose={handleClose}>
        <DialogTitle>Batalkan Pesanan</DialogTitle>
        <form onSubmit={cancelOrder}>
          <DialogContent>
            <DialogContentText>
              Harap jelaskan alasan pembatalan
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Alasan"
              type="text"
              fullWidth
              variant="standard"
              name="alasan"
              multiline
              required
              rows={5}
              onChange={e => setReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button type="submit" style={{ color: 'red' }}>Batalkan</Button>
          </DialogActions>
        </form>
      </Dialog>

    )
}
