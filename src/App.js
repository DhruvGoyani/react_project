import logo from "./logo.svg";
import "./App.css";
import Header from "./Commponent/Header";
import Footer from "./Commponent/Footer";
import { Route, Router, Switch } from "react-router-dom";
import Home from "./Container/Home";
import Shop from "./Container/Shop";
import Shop_Details from "./Container/Shop_Details";
import Shopping_Cart from "./Container/Shopping_Cart";
import Checkout from "./Container/Checkout";
import Contact from "./Container/Contact";
import {Provider } from "react-redux";
import {  persistor, store } from "./Redux/Store/Store";
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react'
import Auth from "./Container/Auth";
import Layout from "./Admin/Component/Layout";
import Category from "../src/Admin/Container/Category"
import Product from "./Admin/Container/Product";

function App() {
  

  return (
    <SnackbarProvider  maxSnack={3} >
    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <Header />
      <Switch>
        
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/shop"} component={Shop} />
        <Route exact path={"/shop_details"} component={Shop_Details} />
        <Route exact path={"/shopping_cart"} component={Shopping_Cart} />
        <Route exact path={"/checkout"} component={Checkout} />
        <Route exact path={"/contact"} component={Contact} />
        <Route restricted={true} exact path={"/Auth"} component={Auth} />
        <Layout>
          <Route exact path={"/category"} component={Category}/>
          <Route exact path={"/product"} component={Product} />
        </Layout>
      </Switch>
      <Footer />
      </PersistGate>
      </Provider>
      </SnackbarProvider>
  );
}

export default App;
