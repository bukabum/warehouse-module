import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { axiosInstance } from './navbar/auth/token/Api';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElBulk, setAnchorElBulk] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenBulkMenu = (event) => {
    setAnchorElBulk(event.currentTarget);
  };
  
  const handleCloseBulkMenu = () => {
    setAnchorElBulk(null);
    setAnchorElNav(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.post('/blacklist/', {
          "refresh_token": localStorage.getItem("refresh_token"),
      }).then(()=> {
        setAnchorElUser(null);
        localStorage.clear()
        window.location.href = '/';
  
      });
  }
  catch (e) {
      console.log(e);
  }
};
function getToken() {
  const tokenString = localStorage.getItem('access_token');
  return tokenString
}
const token = getToken();
if(token) {

  return (
    <div className="header">
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0">
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
            >
                Warehouse 1.0
            </Typography>
        </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              style={{
                display: { xs: 'block', md: 'none' },
              }}
              PaperProps={{  
                style: {  
                  width: 200,
                },  
             }} 
            
            >
            <Link disableRipple={true} style={{ textDecoration: 'none' }} to="/Warehouse-1.0/add/product/">
              <MenuItem disableRipple={true} style={{ marginLeft: 10 }}  onClick={handleCloseNavMenu}>
                  <Typography style={{ color: 'black' }}>Tambah Produk</Typography>
              </MenuItem>
            </Link>
            <br/>
            <Link disableRipple={true} style={{ textDecoration: 'none' }} to="/Warehouse-1.0/cart/list">
              <MenuItem disableRipple={true} style={{ marginLeft: 10 }} onClick={handleCloseNavMenu}>
                  <Typography style={{ color: 'black' }}>Keranjang</Typography>
              </MenuItem>
            </Link>
            <br/>
            <Link disableRipple={true} style={{ textDecoration: 'none' }} to="/Warehouse-1.0/order/list">
              <MenuItem disableRipple={true} style={{ marginLeft: 10 }} textAlign="center" onClick={handleCloseNavMenu}>
                  <Typography style={{ color: 'black' }}>Order</Typography>
              </MenuItem>
            </Link>
            <br/>
            <Link disableRipple={true} style={{ textDecoration: 'none' }} to="/Warehouse-1.0/view/customer">
              <MenuItem disableRipple={true} style={{ marginLeft: 10 }} onClick={handleCloseNavMenu}>
                  <Typography style={{ color: 'black' }}>Pelanggan</Typography>
              </MenuItem>
            </Link>
            <br/>
              <MenuItem disableRipple={true} style={{ marginLeft: 10 }}>
                  <Typography onClick={handleOpenBulkMenu} style={{ color: 'black' }}>Bulk</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/Warehouse-1.0">
            Warehouse 1.0
          </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0/add/product/">
              <Button style={{ my: 2, color: 'white', display: 'block' }}>Tambah Produk</Button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0/cart/list">
              <Button style={{ my: 2, color: 'white', display: 'block' }}>Keranjang</Button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0/order/list">
              <Button style={{ my: 2, color: 'white', display: 'block' }}>Order</Button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0/view/customer">
              <Button style={{ my: 2, color: 'white', display: 'block' }}>Pelanggan</Button>
            </Link>
              <Button onClick={handleOpenBulkMenu} style={{ my: 2, color: 'white', display: 'block' }}>Bulk</Button>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElBulk}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElBulk)}
                onClose={handleCloseBulkMenu}
            >
                <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0/bulk/in">
                  <MenuItem disableRipple={true} onClick={handleCloseBulkMenu}>
                    <Button style={{ my: 2, color: 'black', display: 'block' }}>Bulk In</Button>
                  </MenuItem>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0/bulk/out">
                  <MenuItem disableRipple={true} onClick={handleCloseBulkMenu}>
                    <Button style={{ my: 2, color: 'black', display: 'block' }}>Bulk Out</Button>
                  </MenuItem>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0/bulk/cart">
                  <MenuItem disableRipple={true} onClick={handleCloseBulkMenu}>
                    <Button style={{ my: 2, color: 'black', display: 'block' }}>Bulk Cart</Button>
                  </MenuItem>
                </Link>

            </Menu>

          </Box>
          <Box sx={{ flexGrow: 0 }}>
              <Button style={{ color: 'white' }} size='small' onClick={logout}>
                Logout
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
} else {
  return (
    <div className="header">
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0">
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
            >
                Warehouse 1.0
            </Typography>
        </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/Warehouse-1.0">
            Warehouse 1.0
          </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Pengaturan">
            <Link style={{ textDecoration: 'none' }} to="/Warehouse-1.0/log/in/">
              <Button style={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
            </Link>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}
};
export default withRouter(ResponsiveAppBar);
