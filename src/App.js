import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Watched } from "./components/Watched";
import { Watchlist } from "./components/Watchlist";
import { Add } from "./components/Add";
import { Homepage } from "./components/Homepage";
import { AuthProvider } from "./components/context/Auth";
import { PrivateRoute } from "./components/PrivateRoute";

import "./App.css";
import { Footer } from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="content-wrapper">
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>

          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/watchlist" element={<Watchlist />}></Route>
          </Route>

          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/watched" element={<Watched />}></Route>
          </Route>

          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/add" element={<Add />}></Route>
          </Route>
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
