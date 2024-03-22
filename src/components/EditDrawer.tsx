import {useSelector} from "react-redux"
import {editToggle, fetchUpdate, setSingleData} from "../redux/invoiceSlice"
import {FormEvent, useState} from "react"
import {paymentDueFunc, validateInputOnlyNumber} from "../utils"
import {RootState, allInterface} from "../interface/interfaceData"
import {nanoid} from "@reduxjs/toolkit"
import {useAppDispatch} from "../redux/store"
import {toast} from "sonner"

function EditDrawer() {
  const {singleData, editToggleDrawer} = useSelector(
    (store: RootState) => store.invoiceSlice
  )
  editToggleDrawer
    ? document.body.classList.add("overflow-hidden")
    : document.body.classList.remove("overflow-hidden")

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

    const newInvoice: allInterface = {
      id: singleData.id,
      createdAt: singleData.createdAt,
      paymentDue: paymentDueFunc(invoiceDate),
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status: singleData.status,
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
    }
    try {
      setLoading(true)
      toast.loading("Please wait, the invoice is being updated")
      dispatch(fetchUpdate(newInvoice)).then(() => {
        dispatch(setSingleData(newInvoice))
        setLoading(false)
        toast.success("Invoice updated successfully !")
        toast.dismiss()
        dispatch(editToggle())
      })
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
      toast.dismiss()
    }
  }

  return (
    <div>
      {editToggleDrawer && (
        <div
          onClick={() => {
            if (!loading) {
              dispatch(editToggle())
            }
          }}
          className="fixed bg-black bg-opacity-50 w-full top-0 left-0 bottom-0"
        ></div>
      )}
      <div
        className={`fixed pl-[100px] max-[1040px]:pl-0 max-[1040px]:mt-[80px] overflow-scroll rounded-br-[20px] rounded-tr-[20px] bg-[#FFFFFF] bottom-0 left-0 dark:bg-[#141625] top-0 max-w-[729px] max-[1040px]:max-w-[619px] w-full z-20 -translate-x-full ${
          editToggleDrawer && "translate-x-0"
        } transition duration-500`}
      >
        <form onSubmit={handleSubmit}>
          <div className="px-14 pt-14 pb-8 max-[550px]:p-5">
            <h3 className="text-2xl dark:text-[#FFFFFF] text-[#0C0E16] font-bold tracking-[-0.5px]">
              Edit <span className="text-[#888EB0]">#</span>
              {singleData?.id}
            </h3>
            <div className="mt-12">
              <p className="text-[#7C5DFA] pb-6 font-bold text-xs tracking-[-0.25px]">
                Bill From
              </p>
              <span className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                Street Address
              </span>
              <input
                disabled={loading}
                required
                defaultValue={singleData?.senderAddress?.street}
                name="senderStreet"
                type="text"
                placeholder="19 Union Terrace"
                className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs mt-2 tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
              />

              <div className="grid grid-cols-3 gap-x-6 mt-6 max-[550px]:grid-cols-2">
                <label className="form-control w-full max-w-full">
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    City
                  </span>
                  <input
                    disabled={loading}
                    required
                    defaultValue={singleData?.senderAddress?.city}
                    name="senderCity"
                    type="text"
                    placeholder="London"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
                  />
                </label>
                <label className="form-control w-full max-w-full">
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Post Code
                  </span>
                  <input
                    disabled={loading}
                    required
                    defaultValue={singleData?.senderAddress?.postCode}
                    name="senderPostCode"
                    type="text"
                    placeholder="E1 3EZ"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
                  />
                </label>
                <label className="form-control w-full max-[550px]:mt-6 max-w-full">
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Country
                  </span>
                  <input
                    disabled={loading}
                    required
                    defaultValue={singleData?.senderAddress?.country}
                    name="senderCountry"
                    type="text"
                    placeholder="United Kingdom"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] font-bold text-xs  tracking-[-0.25px] input-bordered text-[#0C0E16] bg-white w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
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
                    disabled={loading}
                    required
                    defaultValue={singleData?.clientName}
                    name="clientName"
                    type="text"
                    placeholder="Alex Grim"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold  mt-2 text-xs tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
                  />
                </div>
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Client’s Email
                  </span>
                  <input
                    disabled={loading}
                    required
                    defaultValue={singleData?.clientEmail}
                    name="clientEmail"
                    type="email"
                    placeholder="alexgrim@mail.com"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] font-bold text-xs mt-2  tracking-[-0.25px] input-bordered text-[#0C0E16] bg-white w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
                  />
                </div>
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Street Address
                  </span>
                  <input
                    disabled={loading}
                    required
                    defaultValue={singleData?.clientAddress?.street}
                    name="clientStreet"
                    type="text"
                    placeholder="84 Church Way"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs mt-2  tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 max-[550px]:grid-cols-2 gap-x-6 mt-6">
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    City
                  </span>
                  <input
                    disabled={loading}
                    required
                    defaultValue={singleData?.clientAddress?.city}
                    name="clientCity"
                    type="text"
                    placeholder="Bradford"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold mt-2  text-xs tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
                  />
                </div>
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Post Code
                  </span>
                  <input
                    disabled={loading}
                    required
                    defaultValue={singleData?.clientAddress?.postCode}
                    name="clientPostCode"
                    type="text"
                    placeholder="BD1 9PB"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold mt-2 text-xs tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
                  />
                </div>
                <div className="max-[550px]:mt-6">
                  <div>
                    <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                      Country
                    </span>
                    <input
                      disabled={loading}
                      required
                      defaultValue={singleData?.clientAddress?.country}
                      name="clientCountry"
                      type="text"
                      placeholder="United Kingdom"
                      className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold mt-2 text-xs tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
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
                    disabled={loading}
                    required
                    name="invoiceDate"
                    type="date"
                    placeholder="Please write"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white font-bold text-xs tracking-[-0.25px] input-bordered w-full mt-2 max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
                  />
                </div>
                <div>
                  <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                    Payment Terms
                  </span>
                  <input
                    disabled={loading}
                    required
                    title="number"
                    defaultValue={singleData?.paymentTerms}
                    onChange={validateInputOnlyNumber}
                    name="paymentTerms"
                    placeholder="Net 30 Days"
                    className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white mt-2 font-bold text-xs tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <span className="text-[#7E88C3] text-xs tracking-[-0.25px] mb-2">
                  Project Description
                </span>
                <input
                  disabled={loading}
                  required
                  defaultValue={singleData?.description}
                  name="description"
                  type="text"
                  placeholder="Graphic Design"
                  className="input dark:bg-[#1E2139] dark:text-[#FFFFFF] text-[#0C0E16] bg-white mt-2 font-bold text-xs tracking-[-0.25px] input-bordered w-full max-w-full disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400"
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
                {singleData?.items?.map((item) => (
                  <input
                    disabled
                    required
                    key={nanoid()}
                    defaultValue={item.name}
                    name={`itemName`}
                    type="text"
                    placeholder="Apple"
                    className="input disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400 w-[214px] h-[48px] font-bold text-xs tracking-[-0.25px] max-[625px]:w-full"
                  />
                ))}
              </div>

              <div className="flex gap-x-4 w-full max-[625px]:justify-start">
                <div
                  data-tip={"number"}
                  className="tooltip tooltip-bottom w-min grid gap-y-4"
                >
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                    Qty.
                  </p>
                  {singleData?.items?.map((item, index) => (
                    <input
                      disabled
                      required
                      key={nanoid()}
                      type="text"
                      name={`itemQty${index}`}
                      pattern="[0-9]*"
                      defaultValue={item.quantity}
                      maxLength={2}
                      placeholder="1"
                      className="input disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400 w-[50px] h-[48px] font-bold text-xs tracking-[-0.25px]"
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
                  {singleData?.items?.map((item, index) => (
                    <input
                      disabled
                      required
                      key={nanoid()}
                      name={`itemPrice${index}`}
                      defaultValue={item.price}
                      type="text"
                      placeholder="422.13"
                      className="input disabled:bg-white disabled:input-bordered disabled:text-gray-400 dark:disabled:bg-[#1E2139] dark:disabled:text-gray-400 max-w-[100px] w-auto h-[48px] font-bold text-xs tracking-[-0.25px]"
                    />
                  ))}
                </div>
                <div className="grid gap-y-4 w-full justify-end">
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                    Total
                  </p>
                  {singleData?.items?.map((item) => {
                    const itemQty = item?.quantity
                    const itemPrice = item?.price
                    const total = itemQty * itemPrice

                    return (
                      <div
                        key={nanoid()}
                        className="flex h-[48px] items-center"
                      >
                        <p className="text-[#888EB0] w-full dark:text-[#DFE3FA] font-bold tracking-[-0.25px] text-[11px]">
                          £
                          {total.toFixed(2).length > 6
                            ? total.toFixed(2).slice(0, 5) + "..."
                            : total.toFixed(2)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div>
              <button
                disabled
                type="button"
                className="bg-[#F9FAFE] cursor-not-allowed w-full h-12 rounded-3xl text-[#7E88C3] dark:bg-[#252945] dark:text-[#DFE3FA] font-bold text-xs tracking-[-0.25px] mb-[47px] transition"
              >
                + Add New Item
              </button>
              <div className="flex justify-between gap-x-2">
                {loading ? (
                  <button
                    type="button"
                    disabled
                    className="p-4 cursor-not-allowed transition max-[422px]:p-3 max-[422px]:text-[11px] tracking-[-0.25px] rounded-[25px] text-[#888EB0] dark:text-[#DFE3FA] font-bold text-xs bg-[#F9FAFE]"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch(editToggle())}
                    type="button"
                    className="p-4 max-[422px]:p-3 max-[422px]:text-[11px]  tracking-[-0.25px] rounded-[25px] text-[#7E88C3] font-bold text-xs transition hover:bg-[#DFE3FA] bg-[#F9FAFE]"
                  >
                    Cancel
                  </button>
                )}

                {loading ? (
                  <button
                    type="button"
                    disabled
                    className="p-4 cursor-not-allowed max-[422px]:p-3 max-[422px]:text-[11px] tracking-[-0.25px] rounded-[25px] text-white font-bold items-center flex text-xs transition bg-[#7C5DFA] opacity-75"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="p-4 hover:bg-[#9277FF] max-[422px]:p-3 max-[422px]:text-[11px] tracking-[-0.25px] rounded-[25px] text-white font-bold text-xs  transition bg-[#7C5DFA]"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditDrawer
