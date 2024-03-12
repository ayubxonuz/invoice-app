import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {allInterface} from "../interface/interfaceData"
import {toast} from "sonner"

const BASE_URL: string = "https://invoicesdata.onrender.com/data"

export const fetchData = createAsyncThunk("invoices/fetchData", async () => {
  try {
    const response = await fetch(BASE_URL)
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    return await response.json()
  } catch (error: any) {
    toast.error(error.message)
  }
})

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

const invoicesStorage = localStorage.getItem("invoices")
const initialState = () => {
  const storedData = invoicesStorage ? JSON.parse(invoicesStorage) : null
  return (
    storedData || {
      allData: null,
      loading: false,
      error: null,
      toggleSideBar: false,
      toggleTheme: false,
      currentStatus: [],
    }
  )
}

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: initialState(),
  reducers: {
    toggleFunc: (state) => {
      state.toggleSideBar = !state.toggleSideBar
      localStorage.setItem("invoices", JSON.stringify(state))
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
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
        toast.error(state.error)
      })
  },
})

export const {toggleFunc} = invoiceSlice.actions

export default invoiceSlice.reducer
