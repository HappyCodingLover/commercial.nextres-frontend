import 'flowbite'
import 'react-toastify/dist/ReactToastify.css'
import './index.scss'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { persistor,store } from './reducers'
import reportWebVitals from './reportWebVitals'

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
        <ToastContainer theme="colored" />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
