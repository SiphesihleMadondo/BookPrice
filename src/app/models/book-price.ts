export interface BookPrice {
  partner: string
  clientName: string
  policynumber: string
  productProvider: string
  adjustedRevenue: any
  adjustedAssetValue: any
  bookPrice1: any
  statementDate: Date

  // Properties needs to be exact to the ones from the response
}
