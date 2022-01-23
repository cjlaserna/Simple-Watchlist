import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { Watched } from './components/Watched';
import { Watchlist } from './components/Watchlist';
import { Add } from './components/Add';
import { Homepage } from './components/Homepage';

import './App.css';

import { GlobalProvider } from './components/context/GlobalState';

function App() {
  return (
    <GlobalProvider>
    <BrowserRouter>
      <Header/>
      
      <Routes>
        <Route exact path='/' element={<Homepage/>}>
        </Route>

        <Route path='/watchlist' element={<Watchlist/>}>
        </Route>
        <Route path='/watched' element={<Watched/>}>
        </Route>
        <Route path='/add' element={<Add/>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
