import moment from 'moment'
import {User} from '../types/user.type'

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

interface TypeArray {
  id: number
  [key: string]: any
}

export const mereListById = (array1: TypeArray[], array2: TypeArray[]) => {
  const set1 = new Set(array1.map((item) => item.id))
  const array3 = array2.filter((item) => !set1.has(item.id))
  return [...array1, ...array3]
}
export const mereAndSortListById = (
  array1: TypeArray[],
  array2: TypeArray[]
) => {
  const set1 = new Set(array1.map((item) => item.id))
  const array3 = array2.filter((item) => !set1.has(item.id))
  return [...array1, ...array3].sort((a, b) => b.id - a.id)
}

export const getRoleUser = (user?: User) => {
  return user?.roles[0].name
}
export const timeSpace = (a: string) => {
  const b = moment(a)
  const c = moment()
  return b.diff(c, 'days')
}
export const getDate = (params: string): string => {
  return `${moment(params).format('MM')}월${moment(params).format('DD')}일`
}
export function numberWithCommasNew(x: string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
