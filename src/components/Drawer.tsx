import {useSelector} from "react-redux"
import {fetchPost, toggleFunc} from "../redux/invoiceSlice"
import {FormEvent, useState} from "react"
import {createdAt, invoiceId, paymentDueFunc} from "../utils"
import {RootState, allInterface} from "../interface/interfaceData"
import {nanoid} from "@reduxjs/toolkit"
import {useAppDispatch} from "../redux/store"
import {useNavigate} from "react-router-dom"
import {animateScroll} from "react-scroll"
import {toast} from "sonner"

interface Row {
  [key: string]: string
  itemName: string
  itemQty: string
  itemPrice: string
}

function Drawer() {
  const [rows, setRows] = useState<Row[]>([
    {itemName: "", itemQty: "", itemPrice: ""},
  ])
  const navigate = useNavigate()
  const {toggleSideBar} = useSelector((state: RootState) => state.invoiceSlice)

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement),
      senderStreet = formData.get("senderStreet") as string,
      senderCity = formData.get("senderCity") as string,
      senderPostCode = formData.get("senderPostCode") as string,
      senderCountry = formData.get("senderCountry") as string,
      clientName = formData.get("clientName") as string,
      clientStreet = formData.get("clientStreet") as string,
      clientCity = formData.get("clientCity") as string,
      clientPostCode = formData.get("clientPostCode") as string,
      clientCountry = formData.get("clientCountry") as string,
      invoiceDate = formData.get("invoiceDate") as string,
      clientEmail = formData.get("clientEmail") as string,
      paymentTerms = formData.get("paymentTerms") as string,
      description = formData.get("description") as string

    let total = 0
    const items = Array.from(formData.getAll("itemName")).map((name, index) => {
      const itemName = name as string
      const itemQty = parseInt(formData.getAll(`itemQty${index}`)[0] as string)
      const itemPrice = parseFloat(
        formData.getAll(`itemPrice${index}`)[0] as string
      )
      const itemTotal = itemQty * itemPrice
      return {
        name: itemName,
        quantity: itemQty,
        price: itemPrice,
        total: itemTotal,
      }
    }) as allInterface["items"]

    items.forEach((item) => {
      total += item.total
    })

    const newInvoice: allInterface = {
      id: invoiceId(),
      createdAt: createdAt(),
      paymentDue: paymentDueFunc(invoiceDate),
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status: "pending",
      senderAddress: {
        street: senderStreet,
        city: senderCity,
        postCode: senderPostCode,
        country: senderCountry,
      },
      clientAddress: {
        street: clientStreet,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      items,
      total,
    }
    try {
      setLoading(true)
      dispatch(fetchPost(newInvoice)).then(() => {
        setLoading(false)
        navigate(`/invoice/${newInvoice.id}`)
        toast.success("Invoice created successfully")
        dispatch(toggleFunc())
      })
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: string
  ) => {
    const {value} = e.target

    if (/^\d*$/.test(value) || value === "") {
      setRows((prevRows) =>
        prevRows.map((row, rowIndex) => {
          if (rowIndex === index) {
            return {...row, [type]: value}
          }
          return row
        })
      )
    }
  }

  const handleButtonDelete = (index: number) => {
    if (index > 0) {
      setRows((prevRows) =>
        prevRows.filter((_, rowIndex) => rowIndex !== index)
      )
    }
  }

  const handleButtonAdd = () => {
    const newRow: Row = {itemName: "", itemQty: "", itemPrice: ""}
    setRows((prevRows) => [...prevRows, newRow])
  }

  return (
    <div>
      {toggleSideBar && (
        <div
          onClick={() => dispatch(toggleFunc())}
          className="fixed bg-black bg-opacity-50 w-full top-0 left-0 bottom-0"
        ></div>
      )}
      <div
        className={`fixed pl-[100px] max-[1040px]:pl-0 max-[1040px]:mt-[80px] overflow-scroll rounded-br-[20px] rounded-tr-[20px] bg-[#FFFFFF] bottom-0 left-0 dark:bg-[#141625] top-0 max-w-[729px] max-[1040px]:max-w-[619px] w-full z-20 -translate-x-full ${
          toggleSideBar && "translate-x-0"
        } transition duration-500`}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-14 max-[550px]:p-5">
            <h3 className="text-2xl dark:text-[#FFFFFF] text-[#0C0E16] font-bold tracking-[-0.5px]">
              New Invoice
            </h3>
            <div className="mt-12">
              <p className="text-[#7C5DFA] pb-6 font-bold text-xs tracking-[-0.25px]">
                Bill From
              </p>
              <span className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                Street Address
              </span>
              <input
                name="senderStreet"
                type="text"
                placeholder="19 Union Terrace"
                className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs mt-2 tracking-[-0.25px] input-bordered w-full max-w-full"
              />

              <div className="grid grid-cols-3 gap-x-6 mt-6 max-[550px]:grid-cols-2">
                <label className="form-control w-full max-w-full">
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    City
                  </span>
                  <input
                    name="senderCity"
                    type="text"
                    placeholder="London"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs tracking-[-0.25px] input-bordered w-full max-w-full"
                  />
                </label>
                <label className="form-control w-full max-w-full">
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Post Code
                  </span>
                  <input
                    name="senderPostCode"
                    type="text"
                    placeholder="E1 3EZ"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs tracking-[-0.25px] input-bordered w-full max-w-full "
                  />
                </label>
                <label className="form-control w-full max-[550px]:mt-6 max-w-full">
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Country
                  </span>
                  <input
                    name="senderCountry"
                    type="text"
                    placeholder="United Kingdom"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] font-bold text-xs  tracking-[-0.25px] input-bordered text-[#0C0E16] bg-white w-full max-w-full"
                  />
                </label>
              </div>

              <p className="text-[#7C5DFA] mt-12 pb-6 font-bold text-xs tracking-[-0.25px]">
                Bill To
              </p>
              <div className="grid gap-y-6">
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Client's Name
                  </span>
                  <input
                    name="clientName"
                    type="text"
                    placeholder="Alex Grim"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold  mt-2 text-xs tracking-[-0.25px] input-bordered w-full max-w-full "
                  />
                </div>
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Client’s Email
                  </span>
                  <input
                    name="clientEmail"
                    type="email"
                    placeholder="alexgrim@mail.com"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] font-bold text-xs mt-2  tracking-[-0.25px] input-bordered text-[#0C0E16] bg-white w-full max-w-full "
                  />
                </div>
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Street Address
                  </span>
                  <input
                    name="clientStreet"
                    type="text"
                    placeholder="84 Church Way"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs mt-2  tracking-[-0.25px] input-bordered w-full max-w-full "
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 max-[550px]:grid-cols-2 gap-x-6 mt-6">
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    City
                  </span>
                  <input
                    name="clientCity"
                    type="text"
                    placeholder="Bradford"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold mt-2  text-xs tracking-[-0.25px] input-bordered w-full max-w-full "
                  />
                </div>
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Post Code
                  </span>
                  <input
                    name="clientPostCode"
                    type="text"
                    placeholder="BD1 9PB"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold mt-2 text-xs tracking-[-0.25px] input-bordered w-full max-w-full "
                  />
                </div>
                <div className="max-[550px]:mt-6">
                  <div>
                    <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                      Country
                    </span>
                    <input
                      name="clientCountry"
                      type="text"
                      placeholder="BD1 9PB"
                      className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold mt-2 text-xs tracking-[-0.25px] input-bordered w-full max-w-full "
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-y-4 my-6">
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Invoice Date
                  </span>
                  <input
                    name="invoiceDate"
                    type="date"
                    placeholder="Please write"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs tracking-[-0.25px] input-bordered w-full mt-2  max-w-full "
                  />
                </div>
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Payment Terms
                  </span>
                  <input
                    name="paymentTerms"
                    placeholder="Net 30 Days"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white mt-2 font-bold text-xs tracking-[-0.25px] input-bordered w-full max-w-full "
                  />
                </div>
              </div>
              <div>
                <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                  Project Description
                </span>
                <input
                  name="description"
                  type="text"
                  placeholder="Graphic Design"
                  className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white mt-2 font-bold text-xs tracking-[-0.25px] input-bordered w-full max-w-full "
                />
              </div>
            </div>
            <p className="mt-8 mb-4 text-[#777F98] font-bold text-[18px] tracking-[-0.38px]">
              Item List
            </p>
            <div className="flex gap-x-4 mb-5 max-[625px]:block">
              <div
                data-tip={"Item name"}
                className="tooltip tooltip-bottom max-[625px]:w-full w-min grid gap-y-4 max-[625px]:mb-6"
              >
                <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-left text-xs tracking-[-0.25px]">
                  Item Name
                </p>
                {rows.map((_, index) => (
                  <input
                    key={index}
                    name={`itemName`}
                    type="text"
                    placeholder="Apple"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white input-bordered w-[214px] h-[48px] font-bold text-xs tracking-[-0.25px] max-[625px]:w-full"
                  />
                ))}
              </div>

              <div className="flex gap-x-4 max-[625px]:justify-start">
                <div
                  data-tip={"number"}
                  className="tooltip tooltip-bottom w-min grid gap-y-4"
                >
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                    Qty.
                  </p>
                  {rows.map((row, index) => (
                    <input
                      key={nanoid()}
                      type="text"
                      name={`itemQty${index}`}
                      pattern="[0-9]*"
                      value={row.itemQty}
                      onChange={(e) => handleInputChange(e, index, "itemQty")}
                      maxLength={2}
                      placeholder="1"
                      className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white input-bordered w-[50px] h-[48px] font-bold text-xs tracking-[-0.25px]"
                    />
                  ))}
                </div>

                <div
                  data-tip={"number"}
                  className="grid text-left gap-y-4 tooltip tooltip-bottom"
                >
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                    Price
                  </p>
                  {rows.map((row, index) => (
                    <input
                      key={nanoid()}
                      name={`itemPrice${index}`}
                      value={row.itemPrice}
                      onChange={(e) => handleInputChange(e, index, "itemPrice")}
                      type="text"
                      placeholder="422.13"
                      className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white input-bordered max-w-[100px] w-auto h-[48px] font-bold text-xs tracking-[-0.25px]"
                    />
                  ))}
                </div>
                <div className="grid gap-y-4 max-[625px]:w-full">
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                    Total
                  </p>
                  {rows.map((row, index) => {
                    const itemQty = parseInt(row.itemQty) || 0
                    const itemPrice = parseFloat(row.itemPrice) || 0
                    const total = itemQty * itemPrice

                    return (
                      <div
                        key={index}
                        className="flex h-[48px] justify-between items-center"
                      >
                        <p className="text-[#888EB0] dark:text-[#DFE3FA] font-bold tracking-[-0.25px] text-xs">
                          £{total.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleButtonDelete(index)}
                        >
                          <img className="ml-12 mb-1" src="/trash.svg" alt="" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="">
              <button
                onClick={handleButtonAdd}
                type="button"
                className="bg-[#F9FAFE] w-full h-12 rounded-3xl text-[#7E88C3] dark:bg-[#252945] dark:text-[#DFE3FA] font-bold text-xs tracking-[-0.25px] mb-[47px]"
              >
                + Add New Item
              </button>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    animateScroll.scrollToTop({
                      duration: 500,
                      smooth: true,
                    })
                    dispatch(toggleFunc())
                  }}
                  className="p-4 max-[422px]:p-3 max-[422px]:text-[11px]  tracking-[-0.25px] rounded-[25px] text-[#7E88C3] font-bold text-xs  transition bg-[#F9FAFE]"
                >
                  Discard
                </button>
                <div className="flex gap-x-2">
                  <button
                    type="button"
                    className="p-4 max-[422px]:p-3 max-[422px]:text-[11px] tracking-[-0.25px] rounded-[25px] text-[#888EB0] dark:text-[#DFE3FA] font-bold text-xs  transition bg-[#373B53]"
                  >
                    Save as Draft
                  </button>

                  {loading ? (
                    <button
                      type="button"
                      className="p-4 max-[422px]:p-3 max-[422px]:text-[11px] btn-disabled tracking-[-0.25px] rounded-[25px] text-white font-bold items-center flex text-xs transition bg-[#7C5DFA] opacity-75 gap-x-2"
                    >
                      Save & Send <span className="loading-xs loading"></span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="p-4 max-[422px]:p-3 max-[422px]:text-[11px] tracking-[-0.25px] rounded-[25px] text-white font-bold text-xs  transition bg-[#7C5DFA]"
                    >
                      Save & Send
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Drawer
