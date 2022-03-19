import React, { useEffect, useState } from "react";
import { Snackbar, Alert, DialogContent, DialogActions, Dialog, Card, CardContent, Typography, CardActions, TextField, Button, Autocomplete } from "@mui/material";
import axios from "axios";
import { axiosInstance } from "./navbar/auth/token/Api";
import { numberFormat } from "./numberformat";
import './Style/media.css'

function BulkCart() {
    const [inputList, setInputList] = useState([{ Amount: "", sparePK: "" }]);
    const [sparepart, setSparepart] = useState([]);
    const [snack, setSnack] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("");
    const handleClose = () => {
        setSnack(false)
      };
    
    
    // handle input change
    const handleInputChange = (e, index) => {
        //console.log(e.target)
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleAutoComplete = (e, index) => {
        const list = [...inputList];
        list[index]['sparePK'] = e;
        setInputList(list);
    };
                
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };    
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { Amount: "", sparePK: "" }]);
        };
        const getCustomer = async () => {
            try {
                const { data } = await axiosInstance.get('bulk/all/sparepart/')
                const spare = data;
                setSparepart(spare);
            } catch(error){
        }
    }
    const BulkCart = async (event) => {
        event.preventDefault();
        console.log(inputList)
        try {
            await axiosInstance.post('bulk/cart/', {
                inputList: inputList,
            }).then(() => {
                setInputList([{ Amount: "", sparePK: "" }])
                setSnack(true)
                setSnackSeverity("success")
                setSnackText("Berhasil Memasukan ke Keranjang")
            })
        } catch(error){
            setSnack(true)
            setSnackSeverity("error")
            setSnackText("Gagal Memasukan ke Keranjang")
    }  
    }
    useEffect (() => {
        getCustomer();
}, []);
    const spare = sparepart.map(sparepart => {return {'name': sparepart.name + ' - ' + sparepart.product_code  + ' - ' +  numberFormat(sparepart.price ? sparepart.price : 0), 'pk': sparepart.pk}})
    const selected_spare = inputList.map(x => {return x.sparePK})
    const spare_filter =  sparepart.filter(x => selected_spare.includes(x.pk))
    const fix_spare_filter = spare_filter.map(x => {return {'name': x.name + ' - ' + x.product_code  + ' - ' +  numberFormat(x.price ? x.price : 0), 'pk': x.pk}})
    const fix_spare_filter_pk = fix_spare_filter.map(x => {return x.pk})
    const fixed_spare_filter = spare.filter(x => {return !fix_spare_filter_pk.includes(x.pk)})
    //console.log(fix_spare_filter_pk)
    //console.log(fixed_spare_filter)
    return (
        <div className="divControl">
        <h1>Bulk Keranjang</h1>
        <p>Menambahkan Banyak Item Secara Bersamaan ke Keranjang</p>
        <form onSubmit={BulkCart}>
        {inputList.map((x, i) => {
        return (
            <Card sx={{ minWidth: 275, marginBottom: 5 }}>
                <CardContent>

                <Autocomplete
                    name="sparePK"
                    onChange={(e, val) => handleAutoComplete(val.pk, i)}
                    //onChange={(e, val) => console.log(val)}
                    options={fixed_spare_filter}
                    style={{ width: '100%' }}
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.pk}
                    required
                    sx={{ width: 300 }}
                    renderInput={(params) =>  <TextField required fullwidth {...params} label="Pilih Sparepart" />}
                />
                <br/>
                <TextField
                    fullWidth
                    required
                    name="Amount"
                    placeholder="Jumlah"
                    type='number'
                    value={x.Amount}
                    onChange={e => (handleInputChange(e, i), console.log(e.target))}    
                />
                <br/><br/>
                </CardContent>
                <CardActions>
                    {inputList.length !== 1 && <Button
                    style = {{ color: 'red' }}
                    onClick={() => handleRemoveClick(i)}>Hapus</Button>}
                    {inputList.length - 1 === i && <Button onClick={handleAddClick}>Tambah</Button>}
                </CardActions>
            </Card>

        );
        })}
        
            <Button type="submit" style={{ float: 'right' }}>Submit</Button>
        </form>
        <div style={{ marginTop: 20, display: 'none' }}>{JSON.stringify(inputList)}</div>
        <br/><br/><br/>

        <Snackbar open={snack} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackSeverity} sx={{ width: '100%' }}>
                {snackText}
            </Alert>
        </Snackbar>

    </div>
    );
}
    
export default BulkCart;
