export const sum = (a: number, b: number) => a + b

export const exportResults = (res: any) => {
  return res.data
}
export const numberWithCommas = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
