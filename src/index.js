import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './app/store'

import { fetchUsers } from './features/users/usersSlice'
import testCreateSliceAPI from './reduxjs_toolkit_api/index'

import './index.css'

import './api/server'

store.dispatch(fetchUsers())
testCreateSliceAPI()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
