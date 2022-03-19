import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../navbar/auth/token/Api';
import { DialogTitle, TextField, DialogContentText, DialogContent, Button, DialogActions, Dialog } from '@mui/material';

export default function DeleteNoteDialog ({props, visible, invisible, notePk}) {
    const handleClose = () => {
        invisible()
    };

    const cancelOrder = async (event) => {
      event.preventDefault();
      try {
          await axiosInstance.put('delete/note/order/' + notePk + '/', {
          }).then(() => {
            invisible('Catatan Berhasil Dihapus', 'success')
          })
      } catch(error){
        console.log(error)
        invisible('Catatan Gagal Untuk Dihapus', 'error')
  }
}

    return (
    <Dialog fullWidth maxWidth="md" open={visible} onClose={handleClose}>
        <DialogTitle>Hapus Catatan ?</DialogTitle>
        <form onSubmit={cancelOrder}>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button type="submit" style={{ color: 'red' }}>Hapus</Button>
          </DialogActions>
        </form>
      </Dialog>

    )
}
