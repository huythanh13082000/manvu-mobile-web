import {all} from 'redux-saga/effects'
import authSaga from '../feature/auth/auth.saga'
import campaignSaga from '../feature/campaign/campaign.saga'
import campaignDetailSaga from '../feature/campaign_detail/campaignDetail.saga'
import campaignFavirateSaga from '../feature/campaign_favourate/campaignFavirate.saga'
import cardSaga from '../feature/card/card.saga'
import createCampaignSaga from '../feature/create_campaign/createCampaign.Saga'
import faqSaga from '../feature/faq/faq.saga'
import myCampaignSaga from '../feature/my_campaign/myCampaign.saga'
import myCampaignAdvertiserSaga from '../feature/my_campaign_advertiser/myCampaignAdvertiser.saga'
import inappNotificationSaga from '../feature/notification/inappNotification.saga'
import PointTransactionSaga from '../feature/point_transaction/pointTransaction.saga'
import productSaga from '../feature/product/product.saga'
import registermemberSaga from '../feature/register_member/registerMember.saga'
import reportersSaga from '../feature/Reporters/reporters.saga'
import RequestSaga from '../feature/request/request.saga'
import serviceSaga from '../feature/service/service.saga'
import servicesSaga from '../feature/services/services.saga'
import topicsSaga from '../feature/topics/topics.saga'
import userSaga from '../feature/user/user.saga'
import withdrawSaga from '../feature/withdraw/withdraw.saga'
import withdrawMoneySaga from '../feature/withdraw_money/withdrawMoney.saga'
export default function* rootSaga() {
  yield all([
    campaignSaga(),
    myCampaignSaga(),
    myCampaignAdvertiserSaga(),
    createCampaignSaga(),
    campaignDetailSaga(),
    cardSaga(),
    productSaga(),
    servicesSaga(),
    reportersSaga(),
    serviceSaga(),
    userSaga(),
    authSaga(),
    registermemberSaga(),
    topicsSaga(),
    campaignFavirateSaga(),
    faqSaga(),
    inappNotificationSaga(),
    withdrawSaga(),
    withdrawMoneySaga(),
    PointTransactionSaga(),
    RequestSaga(),
  ])
}
