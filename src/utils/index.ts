import moment from 'moment'

export const sum = (data: any[]) => {
  let sum = 0
  data.forEach((item) => (sum = sum + Number(item.price)))
  return sum
}

export const exportResults = (res: any) => {
  return res.data
}
export const numberWithCommas = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getTimeAgo = (params: string) => {
  if (moment().date() === moment(params).date()) {
    return moment(params).format('LT')
  } else {
    return moment(params, 'YYYYMMDD').fromNow()
  }
}
