import CircularProgress from '@mui/material/CircularProgress';

export default function Loading () {
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '93vh'}}>
            <CircularProgress size={100}/>
        </div>
    )
}
