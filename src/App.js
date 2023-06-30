import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import CartPage from './components/pages/CartPage';
import EventEntire from './components/pages/EventEntire';
import LogIn from './components/pages/LogIn';
import Main from './components/pages/Main';
import Mypage from './components/pages/Mypage';
import ProductDetail from './components/pages/ProductDetail';
import { RecoilRoot } from 'recoil';
import Join from './components/pages/Join';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/events" element={<EventEntire />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/product-detail/:id' element={<ProductDetail />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/join' element={<Join />}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
