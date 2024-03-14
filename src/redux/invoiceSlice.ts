import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {toast} from "sonner"
import {allInterface} from "../interface/interfaceData"

const BASE_URL: string = "https://invoicesdata.onrender.com/data"

export const fetchData = createAsyncThunk(
  "invoices/fetchData",
  async (API?: string) => {
    try {
      const response = await fetch(API || BASE_URL)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      return await response.json()
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const fetchPost = createAsyncThunk(
  "invoices/fetchPost",
  async (newInvoice: allInterface) => {
    try {
      const req = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoice),
      })
      if (!req.ok) {
        throw new Error("Failed to create invoice")
      }
      return newInvoice
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const fetchDelete = createAsyncThunk(
  "invoices/fetchDelete",
  async (id: string) => {
    try {
      const req = await fetch(`https://invoicesdata.onrender.com/data/${id}`, {
        method: "DELETE",
      })
      if (!req.ok) {
        throw new Error("Failed to delete invoice")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)
export const fetchUpdate = createAsyncThunk(
  "invoices/fetchUpdate",
  async (invoice: allInterface) => {
    try {
      const req = await fetch(
        `https://invoicesdata.onrender.com/data/${invoice.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoice),
        }
      )
      if (!req.ok) {
        throw new Error("Failed invoice update")
      }
    } catch (error: any) {
      toast.error(error)
    }
  }
)

const initialState = () => {
  return {
    allData: null,
    loading: false,
    error: null,
    toggleSideBar: false,
    toggleTheme: false,
    currentStatus: [],
    editToggleDrawer: false,
    singleData: {},
  }
}

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: initialState(),
  reducers: {
    toggleFunc: (state) => {
      state.toggleSideBar = !state.toggleSideBar
    },
    editToggle: (state) => {
      state.editToggleDrawer = !state.editToggleDrawer
    },
    setSingleData: (state, {payload}) => {
      state.singleData = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.allData = action.payload
      })
      .addCase(fetchData.rejected, (state, action: any) => {
        state.error = action.payload
        state.loading = false
        toast.error(state.error)
      })
  },
})

export const {toggleFunc, editToggle, setSingleData} = invoiceSlice.actions

export default invoiceSlice.reducer
