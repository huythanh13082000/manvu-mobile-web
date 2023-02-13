import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {snackBarReducer} from '../components/snackbar/snackbarSlice'
import {authReducer} from '../feature/auth/authSlice'
import {orderProjectReducer} from '../feature/order_project/orderProjectSlice'
import {portfolioReducer} from '../feature/portfolio/portfolioSlice'
import rootSaga from './rootSaga'

const rootReducer = combineReducers({
  authReducer,
  snackBarReducer,
  portfolioReducer,
  orderProjectReducer,
})

const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
})
sagaMiddleware.run(rootSaga)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
