import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div className='container'>
            <Header/>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App