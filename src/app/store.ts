import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {loadingReducer} from '../components/loading/loadingSlice'
import {snackBarReducer} from '../components/snackbar/snackbarSlice'
import authReducer from '../feature/auth/auth.slice'
import {campaignReducer} from '../feature/campaign/campaign.slice'
import {campaignDetailReducer} from '../feature/campaign_detail/campaignDetail.slice'
import {campaignFavirateReducer} from '../feature/campaign_favourate/campaignFavirate.slice'
import {cardReducer} from '../feature/card/card.slice'
import {createCampaignReducer} from '../feature/create_campaign/createCampaign.slice'
import {faqReducer} from '../feature/faq/fag.slice'
import {myCampaignReducer} from '../feature/my_campaign/myCampaign.slice'
import {myCampaignAdvertiserReducer} from '../feature/my_campaign_advertiser/myCampaignAdvertiser.slice'
import {inappNotificationReducer} from '../feature/notification/inappNotificationSlice'
import {paymentReducer} from '../feature/payment/payment.slice'
import {pointTransactionReducer} from '../feature/point_transaction/pointTransaction.slice'
import {productReducer} from '../feature/product/product.slice'
import {registerAdvertiserReducer} from '../feature/register_advertiser/registerAdvertiser.slice'
import {registerMemberReducer} from '../feature/register_member/registerMember.slice'
import {reportersReducer} from '../feature/Reporters/reporters.slice'
import {requestReducer} from '../feature/request/request.slice'
import {serviceReducer} from '../feature/service/service.slice'
import {servicesReducer} from '../feature/services/services.slice'
import {tabReducer} from '../feature/tab/tab.slice'
import {topicReducer} from '../feature/topics/topics.slice'
import userReducer from '../feature/user/user.slice'
import {withdrawReducer} from '../feature/withdraw/withdraw.slice'
import {withdrawMoneyReducer} from '../feature/withdraw_money/withdrawMoney.slice'
import rootSaga from './rootSaga'

const rootReducer = combineReducers({
  snackBarReducer,
  loadingReducer,
  campaignReducer,
  myCampaignReducer,
  myCampaignAdvertiserReducer,
  createCampaignReducer,
  campaignDetailReducer,
  userReducer,
  tabReducer,
  cardReducer,
  productReducer,
  servicesReducer,
  reportersReducer,
  serviceReducer,
  authReducer,
  registerMemberReducer,
  topicReducer,
  campaignFavirateReducer,
  faqReducer,
  inappNotificationReducer,
  withdrawReducer,
  withdrawMoneyReducer,
  pointTransactionReducer,
  requestReducer,
  registerAdvertiserReducer,
  paymentReducer,
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
