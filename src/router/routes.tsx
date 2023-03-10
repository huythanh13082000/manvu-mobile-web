import CampaignAdvertiserManager from '../pages/campaign_advertiser_manager'
import CampaignDetail from '../pages/campaign_detail'
import CampaignFavourite from '../pages/campaign_favourite'
import ChatPage from '../pages/chat'
import CreateCampaignPage from '../pages/create_campaign'
import Faq from '../pages/faq'
import ForgotPassword from '../pages/forgot_password'
import Home from '../pages/home'
import Login from '../pages/Login'
import MessageDetail from '../pages/message_detail'
import MyCampaign from '../pages/my_campaign'
import MyCampaignAdvertiser from '../pages/my_campaign_advertiser'
import Notification from '../pages/notification'
import PageSearch from '../pages/page_search'
import Payment from '../pages/payment'
import PaymentBankCredit from '../pages/payment_bank_credit'
import PaymentHistory from '../pages/payment_history'
import PointManagement from '../pages/point_management'
import ProductPage from '../pages/product'
import Register from '../pages/register'
import RegisterAdvertiser from '../pages/register_advertiser'
import RegisterMember from '../pages/register_member'
import ReportersPage from '../pages/reporters'
import ServicePage from '../pages/service'
import ServicesPage from '../pages/services'
import ServiceCenter from '../pages/service_center'
import ServiceCenterAdvertiser from '../pages/service_center_advertiser'
import TermOfUse from '../pages/teams_of_use'
import MyRouteProp from './MyRouteProp'

export const ROUTE = {
  HOME: '/',
  PRODUCT: '/product',
  SERVICE: '/service',
  SERVICES: '/services',
  REPORTERS: '/reporters',
  LOGIN: '/login',
  CAMPAIGN_DETAIL: '/campaign_detail/:id',
  TERMS_OF_USE: '/terms_of_use',
  REGISTER: '/register',
  RESISTER_MEMBER: '/register_member',
  UPDATE_MEMBER: '/update_member',
  RESISTER_ADVERTISER: '/register_advertiser',
  UPDATE_ADVERTISER: '/update_advertiser',
  SERVICE_CENTER: '/service_center',
  SERVICE_CENTER_ADVERTISER: '/service_center_advertiser',
  CAMPAIGN_FAVOURITE: '/campaign_favourite',
  FAQ: '/faq',
  NOTIFICATION: '/notification',
  POINT_MANAGEMENT: '/point_management',
  MY_CAMPAIGN: '/my_campaign',
  MY_CAMPAIGN_ID: '/my_campaign/:id',
  MY_CAMPAIGN_ADVERTISER: '/my_campaign_advertiser',
  CHAT: '/chat',
  MESSAGE_DETAIL: '/message_detail/:id',
  UPDATE_CAMPAIGN: '/update_campaign/:id',
  CREATE_CAMPAIGN: '/create_campaign',
  PAYMENT_HISTORY: '/payment_history',
  FORGOT_PASSWORD: '/forgot_password',
  CAMPAIGN_ADVERTISER_MANAGER: '/campaign_advertiser_manager/:id',
  PAGE_SEARCH: '/page_search',
  PAYMENT: '/payment',
  PAYMENT_BANK_CREDIT: '/payment_bank_credit/:id',
}

const routes: Array<MyRouteProp> = [
  {
    path: ROUTE.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE.HOME,
    element: <Home />,
  },
  {path: ROUTE.CAMPAIGN_DETAIL, element: <CampaignDetail />},
  {path: ROUTE.TERMS_OF_USE, element: <TermOfUse />},
  {path: ROUTE.REGISTER, element: <Register />},
  {path: ROUTE.RESISTER_MEMBER, element: <RegisterMember />},
  {path: ROUTE.UPDATE_MEMBER, element: <RegisterMember />},
  {path: `${ROUTE.RESISTER_MEMBER}/sns`, element: <RegisterMember />},
  {path: ROUTE.UPDATE_ADVERTISER, element: <RegisterAdvertiser />},
  {path: ROUTE.RESISTER_ADVERTISER, element: <RegisterAdvertiser />},
  {path: `${ROUTE.RESISTER_ADVERTISER}/sns`, element: <RegisterAdvertiser />},
  {path: ROUTE.PRODUCT, element: <ProductPage />},
  {path: ROUTE.SERVICES, element: <ServicesPage />},
  {path: ROUTE.SERVICE, element: <ServicePage />},
  {path: ROUTE.REPORTERS, element: <ReportersPage />},
  {path: ROUTE.SERVICE_CENTER, element: <ServiceCenter />},
  {path: ROUTE.SERVICE_CENTER_ADVERTISER, element: <ServiceCenterAdvertiser />},
  {path: ROUTE.CAMPAIGN_FAVOURITE, element: <CampaignFavourite />},
  {path: ROUTE.FAQ, element: <Faq />},
  {path: ROUTE.NOTIFICATION, element: <Notification />},
  {path: ROUTE.POINT_MANAGEMENT, element: <PointManagement />},
  {path: ROUTE.MY_CAMPAIGN_ID, element: <MyCampaign />},
  {path: ROUTE.MY_CAMPAIGN_ADVERTISER, element: <MyCampaignAdvertiser />},
  {path: ROUTE.CHAT, element: <ChatPage />},
  {path: ROUTE.MESSAGE_DETAIL, element: <MessageDetail />},
  {path: ROUTE.CREATE_CAMPAIGN, element: <CreateCampaignPage />},
  {path: ROUTE.UPDATE_CAMPAIGN, element: <CreateCampaignPage />},
  {path: ROUTE.PAYMENT_HISTORY, element: <PaymentHistory />},
  {path: ROUTE.FORGOT_PASSWORD, element: <ForgotPassword />},
  {
    path: ROUTE.CAMPAIGN_ADVERTISER_MANAGER,
    element: <CampaignAdvertiserManager />,
  },
  {path: ROUTE.PAGE_SEARCH, element: <PageSearch />},
  {path: ROUTE.PAYMENT, element: <Payment />},
  {path: ROUTE.PAYMENT_BANK_CREDIT, element: <PaymentBankCredit />},
]
export default routes
