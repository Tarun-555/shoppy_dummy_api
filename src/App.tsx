import { useState } from 'react';
import './App.css';
import Navbar, { Overlay } from './components/Navbar';
import ProductsContainer from './container/ProductsContainer';

import { Routes, Route } from 'react-router-dom';
import ProductDetailContainer from './container/ProductDetailContainer';

function App() {
  const [searchResult, setSearchResult] = useState<string>('');
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const handleSetSearch = (val: string) => {
    setSearchResult(val);
  };

  const handleOverlayVisible = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };
  return (
    <div>
      <Navbar
        handleSetSearch={handleSetSearch}
        handleOverlay={handleOverlayVisible}
      />
      <Routes>
        <Route index element={<ProductsContainer search={searchResult} />} />
        <Route path="product/:id" element={<ProductDetailContainer />} />
        <Route
          path="products"
          element={<ProductsContainer search={searchResult} />}
        />
        <Route
          path="*"
          element={
            <h1 style={{ paddingTop: '100px', textAlign: 'center', margin: 0 }}>
              Page not found
            </h1>
          }
        />
      </Routes>
      {isOverlayVisible ? <Overlay /> : null}
    </div>
  );
}

export default App;
