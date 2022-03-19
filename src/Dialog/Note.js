import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../navbar/auth/token/Api';
import { DialogTitle, TextField, DialogContentText, DialogContent, Button, DialogActions, Dialog } from '@mui/material';

export default function NoteDialog ({props, visible, invisible, notePk, notetext}) {
    const [note, setNote] = useState(notetext);
    const handleClose = () => {
        invisible()
    };

    const noteOrder = async (event) => {
      event.preventDefault();
      try {
          await axiosInstance.put('note/order/' + notePk + '/', {
            note: note,
          }).then(() => {
            setNote('')
            invisible('Catatan Berhasil Ditambahakan', 'success')
          })
      } catch(error){
        console.log(error)
        invisible('Catatan Gagal Ditambahakan', 'error')
  }
}

    return (
    <Dialog fullWidth maxWidth="md" open={visible} onClose={handleClose}>
        <DialogTitle>Tambahkan Catatan</DialogTitle>
        <form onSubmit={noteOrder}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Catatan"
              type="text"
              fullWidth
              variant="standard"
              name="catatan"
              multiline
              required
              rows={5}
              onChange={e => setNote(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button type="submit" style={{ color: 'red' }}>Kirim</Button>
          </DialogActions>
        </form>
      </Dialog>

    )
}
