import moment from 'moment'
export const sum = (a: number, b: number) => a + b

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
