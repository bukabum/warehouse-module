import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../navbar/auth/token/Api';
import { DialogTitle, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export default function ReturnDialog ({props, visible, invisible, returnPk}) {
    const [reason, setReason] = useState();
    const handleClose = () => {
        invisible()
    };

    const returnOrder = async (event) => {
      event.preventDefault();
      try {
          await axiosInstance.put('return/order/' + returnPk + '/', {
            reason: reason,
          }).then(() => {
            setReason('')
            invisible('Item Berhasil Di Retur', 'success')
          })
      } catch(error){
        console.log(error)
        invisible('Item Gagal Untuk Retur', 'error')
  }
}

    return (
    <Dialog fullWidth maxWidth="md" open={visible} onClose={handleClose}>
        <DialogTitle>Retur Pesanan</DialogTitle>
        <form onSubmit={returnOrder}>
          <DialogContent>
            <DialogContentText>
              Harap jelaskan alasan Retur
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
              rows={5}
              required
              onChange={e => setReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button type='submit'style={{ color: 'red' }} >Retur</Button>
          </DialogActions>
        </form>
      </Dialog>

    )
}
