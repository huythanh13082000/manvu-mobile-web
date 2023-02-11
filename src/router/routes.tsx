import DevelopmentInquiry from '../pages/development_inquiry'
import CreateDevelopmentInquiry from '../pages/development_inquiry/create'
import EstimateCalculation from '../pages/estimate_calculation'
import CreateEstimateCalculation from '../pages/estimate_calculation/create'
import Login from '../pages/login'
import Portfolio from '../pages/portfolio'
import CreatePortfolio from '../pages/portfolio/create'
import MyRouteProp from './MyRouteProp'

export const ROUTE = {
  HOME: '/',
  PORTFOLIO: '/portfolio',
  ESTIMATE_CALCULATION: '/estimate_calculation',
  DEVELOPMENT_INQUIRY: '/development_inquiry',
  CREATE_DEVELOPMENT_INQUIRY: '/create_development_inquiry',
  CREATE_PORTFOLIO: '/create_portfolio',
  UPDATE_PORTFOLIO: '/update_portfolio/:id',
  CREATE_ESTIMATE_CALCULATION: '/create_estimate_calculation',
  LOGIN: '/login',
}

const routes: Array<MyRouteProp> = [
  {
    path: ROUTE.HOME,
    element: <Portfolio />,
    private: true,
  },
  {
    path: ROUTE.PORTFOLIO,
    element: <Portfolio />,
    private: true,
  },
  {
    path: ROUTE.DEVELOPMENT_INQUIRY,
    element: <DevelopmentInquiry />,
    private: true,
  },
  {
    path: ROUTE.ESTIMATE_CALCULATION,
    element: <EstimateCalculation />,
    private: true,
  },
  {
    path: ROUTE.CREATE_DEVELOPMENT_INQUIRY,
    element: <CreateDevelopmentInquiry />,
    private: true,
  },
  {
    path: ROUTE.CREATE_PORTFOLIO,
    element: <CreatePortfolio />,
    private: true,
  },
  {
    path: ROUTE.UPDATE_PORTFOLIO,
    element: <CreatePortfolio />,
    private: true,
  },
  {
    path: ROUTE.CREATE_ESTIMATE_CALCULATION,
    element: <CreateEstimateCalculation />,
    private: true,
  },
  {
    path: ROUTE.LOGIN,
    element: <Login />,
  },
]
export default routes
