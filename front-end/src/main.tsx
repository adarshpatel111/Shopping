import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from 'react-use-cart';
import { createTheme, ThemeProvider } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import { applyMiddleware, compose, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { reducer } from './redux/reducer.tsx'
import { Provider } from 'react-redux'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});
const store = createStore(reducer, compose(applyMiddleware(thunk)))
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CartProvider>
          <Toaster position='top-center' />
          <ThemeProvider theme={darkTheme}>
            <App />
          </ThemeProvider>
        </CartProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
