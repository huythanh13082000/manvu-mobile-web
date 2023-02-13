import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './app/store'
import reportWebVitals from './reportWebVitals'
import './index.scss'
import BaseLayout from './layouts/base'
import Router from './router'
import CustomizedSnackbars from './components/snackbar'
import {setTokenAxios} from './apis/axiosClient'
import moment from 'moment'
import 'moment/locale/ko'  // without this line it didn't work

const container = document.getElementById('root')!
const root = createRoot(container)
moment.locale('ko');  

setTokenAxios()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CustomizedSnackbars />
        <BaseLayout>
          <Router />
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
