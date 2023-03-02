
import { PaymentModel } from '../types/payment.type';
import axiosClient from './axiosClient'
import { PAYMENT_API, VERIFY_PHONE_NUMBER } from './urlConfig'

export const paymentApi = {
  verifyPhoneNumber(params: {firebaseIdToken: string}) {
    return axiosClient.post(VERIFY_PHONE_NUMBER, params)
  },
  getPaymentHistory(params: {limit: number; offset?: number}) {
    return axiosClient.get(PAYMENT_API, {params})
  },
  buyPackage(params: {package: string; numberOfMonths: string; price: string}) {
    return axiosClient.post(`${PAYMENT_API}`, params)
  },
  createPayment(params: PaymentModel) {
    return axiosClient.post(
      params.package === 'FREE' ? `${PAYMENT_API}/use-free` : `${PAYMENT_API}`,
      params
    )
  },
}
