import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useLocation, BrowserRouter as Router, Switch , Route, Link, useRouteMatch } from 'react-router-dom';
import PrivateRoute from "./navbar/auth/components/PrivateRoute";
import PublicRoute from "./navbar/auth/components/PublicRoute";
import Home from './Home';
import Customer from './Customer';
import Viewitem from './view_item';
import Login from './login';
import ViewCustomer from './View_cutomer';
import AddProduct from './Add_product';
import Order from './Order';
import Cart from './Cart';
import AddCustomer from './Add_Customer';
import StockIn from './StockIn';
import StockOut from './StockOut';
import StockHistory from './StockHistory';
import FullHistory from './FullStockHistory';
import OrderDetail from './OrderDetail';
import Invoice from './Invoice';
import ResponsiveAppBar from "./Header";
import BulkIn from "./BulkIn";
import BulkOut from './BulkOut';
import BulkCart from './BulkCart';

function App(props, location) {
  var txt = window.location.href;
  var numb = txt.match(/\d/g);
  numb = numb.join("");
  //alert (numb);

  var ret = window.location.href.replace('http://localhost:3000','').replace('/order/invoice/', '');
  //console.log(ret);   

  useEffect (() => {
    //console.log(window.location.href)
}, [])

  return (
    <React.Fragment>
      <Route
        render={({ props, location }) =>
          window.location.href.replace('http://localhost:3000','') === "/Warehouse-1.0/order/invoice/" + window.location.href.replace('http://localhost:3000/Warehouse-1.0/order/invoice/','') ? 
          //props.location.pathname == "/order/invoice/" + id ?
            null
          : 
            <ResponsiveAppBar />
          
        }
    />
      <Switch >
        <PublicRoute restricted={false} exact path='/'  component={Home} />
        <PublicRoute restricted={false} exact path='/Warehouse-1.0/:page'  component={Home} />
        <PublicRoute restricted={false} exact path='/Warehouse-1.0/'  component={Home} />
        <PublicRoute restricted={true} exact path='/Warehouse-1.0/log/in'  component={Login} />
        
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/view/item/:itemPK'  component={Viewitem} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/view/customer' component={Customer} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/customer/detail/:cusPK' component={ViewCustomer} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/add/product/' component={AddProduct} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/order/list/' component={Order} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/cart/list' component={Cart} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/add/customer' component={AddCustomer} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/stock/in/:itemPK' component={StockIn} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/stock/out/:itemPK' component={StockOut} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/monthly/history/:itemPK' component={StockHistory} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/full/history/:itemPK' component={FullHistory} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/order/detail/:itemPK' component={OrderDetail} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/order/invoice/:orderPK' component={Invoice} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/bulk/in' component={BulkIn} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/bulk/out' component={BulkOut} />
        <PrivateRoute restricted={false} exact path='/Warehouse-1.0/bulk/cart' component={BulkCart} />
        
      </Switch >
    </React.Fragment>
    );
}

export default App;
