import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';

import { ChakraProvider, ColorModeScript,extendTheme } from '@chakra-ui/react'

ReactDOM.render(
  <ChakraProvider theme={extendTheme({ config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  } })}>
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>
  </ChakraProvider> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
