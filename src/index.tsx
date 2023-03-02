import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './app/store'
import reportWebVitals from './reportWebVitals'
import './index.scss'
import Router from './router'
import CustomizedSnackbars from './components/snackbar'
import moment from 'moment'
import 'moment/locale/ko'
import Loading from './components/loading'
import BaseLayout from './layouts/base'
import {createTheme, ThemeProvider} from '@mui/material/styles'

const container = document.getElementById('root')!
const root = createRoot(container)
moment.locale('ko')
const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          height: '48px',
          fontSize: '16px',
          fontWeight: 700,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '16px',
          fontStyle: 'normal',
          color: '#000000',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {},
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: '0.3rem 0.5rem',
        },
      },
    },
  },
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Loading />
        <CustomizedSnackbars />
        <ThemeProvider theme={theme}>
          <BaseLayout>
            <Router />
          </BaseLayout>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
