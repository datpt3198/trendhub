import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import ShopPage from './pages/Shop';
import Cart from './pages/Cart';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import PageNotFound from './pages/Error404';
import CategoriesList from './pages/CategoriesList';
import CategoryView from './pages/CategoryView';

import Dashboard from './pages/user/Dashboard';
import UserProfile from './pages/user/Profile';
import UserOrders from './pages/user/Orders';

import AdminDashboard from './pages/admin/Dashboard';
import AdminCategory from './pages/admin/Category';
import AdminProduct from './pages/admin/Product';
import Products from './pages/admin/Products';
import ProductUpdate from './pages/admin/ProductUpdate';
import AdminOrders from './pages/admin/Orders';

import Menu from './components/nav/Menu';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';

function App() {
  return (
    <BrowserRouter>
    <Menu />
    <Toaster position='top-right' />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/categories' element={<CategoriesList />} />
        <Route path='/category/:slug' element={<CategoryView />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/search' element={<Search />} />
        <Route path='/product/:slug' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<UserProfile />} />
          <Route path='user/orders' element={<UserOrders />} />
        </Route>

        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/category' element={<AdminCategory />} />
          <Route path='admin/product' element={<AdminProduct />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/product/update/:slug' element={<ProductUpdate />} />
          <Route path='admin/orders' element={<AdminOrders />} />
        </Route>

        <Route path='*' element={<PageNotFound />} replace />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
