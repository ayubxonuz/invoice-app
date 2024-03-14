export interface allInterface {
  id: string
  createdAt: string
  paymentDue: string
  description: string
  paymentTerms: number | string
  clientName: string
  clientEmail: string
  status: string
  senderAddress: {
    city: string
    country: string
    postCode: string
    street: string
  }
  clientAddress: {
    city: string
    country: string
    postCode: string
    street: string
  }
  items?: [
    {
      name: string
      price: number
      quantity: number
      total: number
    }
  ]
  total?: number | string
}

export interface RootState {
  invoiceSlice: {
    allData: [] | null
    loading: boolean
    currentStatus: []
    error: any
    toggleSideBar: boolean
    toggleTheme: boolean
    editToggleDrawer: boolean
    singleData: allInterface
  }
}
