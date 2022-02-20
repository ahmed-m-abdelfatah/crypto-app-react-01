import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CoinDataPage from './pages/CoinDataPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  console.log('#'.repeat(10));
  console.log('~ App');

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/coin' element={<CoinDataPage />}>
        <Route path=':coinId' element={<CoinDataPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
