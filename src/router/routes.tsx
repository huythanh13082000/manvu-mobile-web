import DevelopmentInquiry from '../pages/development_inquiry'
import CreateDevelopmentInquiry from '../pages/development_inquiry/create'
import EstimateCalculation from '../pages/estimate_calculation'
import CreateEstimateCalculation from '../pages/estimate_calculation/create'
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
  CREATE_ESTIMATE_CALCULATION: '/create_estimate_calculation',
}

const routes: Array<MyRouteProp> = [
  {
    path: ROUTE.HOME,
    element: <Portfolio />,
  },
  {
    path: ROUTE.PORTFOLIO,
    element: <Portfolio />,
  },
  {
    path: ROUTE.DEVELOPMENT_INQUIRY,
    element: <DevelopmentInquiry />,
  },
  {
    path: ROUTE.ESTIMATE_CALCULATION,
    element: <EstimateCalculation />,
  },
  {
    path: ROUTE.CREATE_DEVELOPMENT_INQUIRY,
    element: <CreateDevelopmentInquiry />,
  },
  {
    path: ROUTE.CREATE_PORTFOLIO,
    element: <CreatePortfolio />,
  },
  {
    path: ROUTE.CREATE_ESTIMATE_CALCULATION,
    element: <CreateEstimateCalculation />,
  },
]
export default routes
