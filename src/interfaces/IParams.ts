export type IHeader = {
  [search: string]: string | number | undefined
}

export type IParams = {
  header?: IHeader
  params?: IHeader
}

export type IParamsRequest = {
  'Page-Size': number
  'Page-Number': number
}
