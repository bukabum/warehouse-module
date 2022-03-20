'use strict';
import axios from 'axios';
import React, { useEffect } from 'react';
import login_api from './navbar/auth/token/Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { axiosInstance } from './navbar/auth/token/Api';
import { TextField, Button } from '@mui/material';
import './Style/media.css'

const e = React.createElement;
function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [activation, setActivation] = React.useState("");
  const [verify, setVerify] = React.useState("");

  const success = async (text)=> {
    await localStorage.setItem('access_token', text.access);
    await localStorage.setItem('refresh_token', text.refresh);

    window.location = "/";
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    //console.log("Loggin in with", username, password);
    await login_api(username, password, success, (text)=>{setMessage(text)});

  };

  
  return (
    <>
      <div className="divControl">

        <br/><br/>
        <form>
          <TextField helperText={<b style={{ color: 'red' }}> </b>} required fullWidth id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
          <br/><br/>
          <TextField type="password" required fullWidth id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
          <div style={{margin: "1em", color: "red"}}>{message}</div>
          <Button style={{ float: 'right', backgroundColor: '#2196f3', color: 'white' }} type="submit" onClick={tryLogin}>Login</Button>
          <Link to="/Warehouse-1.0/forgot/password">
            <Button type="submit" className="btn btn-primary">Lupa Password ?</Button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;