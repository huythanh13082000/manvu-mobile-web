export interface OptionType {
  nameOption: string
  image: string | File | FormData
  type?: string
  tag?: string
  price: number
  schedule: number
  id?:number
}
