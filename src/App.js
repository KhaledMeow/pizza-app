import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './components/Payment';
import MenuPage from './components/MenuPage';

function App() {
return (
<Router>
<Routes>
  <Route path="/" element={<MenuPage />} />
  <Route path="/payment" element={<Payment />} />
</Routes>
</Router>
);
}
export default App;
