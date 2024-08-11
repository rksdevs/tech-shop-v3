import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductCard from './components/ProductCard';
import ProductScreen from './Screens/ProductScreen';
import AllProducts from './Screens/AllProducts';
import AccountSettings from './Screens/AccountSettings';
import Login from './Screens/Login';
import Register from './Screens/Register';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './Screens/CartScreen';
import CheckoutScreen from './Screens/CheckoutScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import PrebuiltPCScreen from './Screens/PrebuiltPCScreen';
import BuildCustomPCScreen from './Screens/BuildCustomPCScreen';
import AdminRoute from './components/AdminRoute';
import AdminAllProducts from './Screens/Admin/AdminAllProducts';
import AdminAllOrders from './Screens/Admin/AdminAllOrders';
import AdminAllUsers from './Screens/Admin/AdminAllUsers';
import AdminCreateOffer from './Screens/Admin/AdminCreateOffer';
import EditProduct from './Screens/Admin/EditProduct';
import MyOrders from './Screens/MyOrders';
import ContactUs from './Screens/ContactUs';
import AboutUs from './Screens/AboutUs';
import ConfigurePrebuiltPc from './Screens/Admin/ConfigurePrebuiltPc';
import EditPrebuiltPc from './Screens/Admin/EditPrebuiltPc';
import ForgotPassword from './Screens/ForgotPassword';
import EditAdminDetails from './Screens/Admin/EditAdminDetails';
import ErrorPage from './Screens/ErrorPage';
import AllOfferScreen from './Screens/AllOfferScreen';
import ShiprocketScreen from './Screens/Admin/ShiprocketScreen';

const router = createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<App />}>
  <Route path='/' index={true} element={<HomeScreen/>} />
  <Route path='/productCard' index element={<ProductCard />} />
  <Route path='/product/:id' element={<ProductScreen />} />
  <Route path='/allproducts' element={<AllProducts />} />
  <Route path='/allproducts/search/:keyword' element={<AllProducts />} />
  <Route path='/allproducts/page/:pageNumber' element={<AllProducts />} />
  <Route path='/allproducts/search/:keyword/page/:pageNumber' element={<AllProducts />} />
  <Route path='/login' element={<Login />} />
  <Route path='/register' element={<Register />} />
  <Route path='/cart' element={<CartScreen />} />
  <Route path='/prebuilt-pc' element={<PrebuiltPCScreen />} />
  <Route path='/contactus' element={<ContactUs />} />
  <Route path='/aboutus' element={<AboutUs />} />
  <Route path='/forgotPassword' element={<ForgotPassword />} />
  <Route path='/allOffers' element={<AllOfferScreen />} />


  <Route path='' element={<PrivateRoute />}>
    <Route path='/myaccount' element={<AccountSettings />} />
    <Route path='/myorders' element={<MyOrders />} />
    <Route path='/checkout' element={<CheckoutScreen />} />
    <Route path='/order/:id' element={<PlaceOrderScreen />} />
    <Route path='/buildcustompc' element={<BuildCustomPCScreen />} />
    <Route path='/myorders/viewOrder/:id' element={<PlaceOrderScreen />} />
  </Route>

  <Route path='' element={<AdminRoute />}>
    <Route path='/admin/all-products' element={<AdminAllProducts />} />
    <Route path='/admin/all-products/:pagenumber' element={<AdminAllProducts />} />
    <Route path='/admin/all-orders' element={<AdminAllOrders />} />
    <Route path='/admin/all-offers' element={<AdminCreateOffer />} />
    <Route path='/admin/all-users' element={<AdminAllUsers />} />
    <Route path='/admin/allproducts/editProduct/:id' element={<EditProduct />} />
    <Route path='/admin/allorders/editOrder/:id' element={<PlaceOrderScreen />} />
    <Route path='/admin/configurePrebuiltPc' element={<ConfigurePrebuiltPc />} />
    <Route path='/admin/editPrebuiltPc/:id' element={<EditPrebuiltPc />} />
    <Route path='/admin/edit-admin-details' element={<EditAdminDetails />} />
    <Route path='/admin/orderUpdate/shiprocket/:id' element={<ShiprocketScreen />} />
  </Route>
  
  {/* Error route */}
  <Route path='*' element={<ErrorPage />} />
</Route>))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
