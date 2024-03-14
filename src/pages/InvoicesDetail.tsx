import {NavArrowLeft} from "iconoir-react"
import {NavLink, useParams} from "react-router-dom"
import StatusBtn from "../components/button/StatusBtn"
import Modal from "../components/Modal"
import {useEffect, useState} from "react"
import {RootState, allInterface} from "../interface/interfaceData"
import {nanoid} from "@reduxjs/toolkit"
import Loading from "../components/Loading"
import {animateScroll} from "react-scroll"
import {toast} from "sonner"
import ModalBottom from "../components/ModalBottom"
import {useAppDispatch} from "../redux/store"
import {editToggle, setSingleData} from "../redux/invoiceSlice"
import {useSelector} from "react-redux"
import MarkButton from "../components/button/MarkButton"

function InvoicesDetail() {
  const [invoice, setInvoice] = useState<allInterface | null>(null)
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const {singleData} = useSelector((store: RootState) => store.invoiceSlice)

  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 500,
      smooth: true,
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`https://invoicesdata.onrender.com/data/${id}`)
        if (!req.ok) {
          throw new Error("Failed to retrieve data")
        }
        const data = await req.json()

        setInvoice(data)
      } catch (error: any) {
        toast.error(error.message)
      }
    }

    fetchData()
  }, [id, singleData])

  return (
    <div className="h-screen">
      <NavLink
        to={"/"}
        className="flex hover:text-[#7E88C3] transition font-bold gap-1 mt-12 text-xs tracking-[-0.25px] items-center dark:text-[#FFFFFF] text-[#0C0E16]"
      >
        <NavArrowLeft color="#7C5DFA" />
        Go Back
      </NavLink>
      {!invoice && (
        <div className="mt-4">
          <Loading />
        </div>
      )}
      {invoice && (
        <>
          <div className="bg-[#FFFFFF] dark:bg-[#1E2139] rounded-lg mb-6 mt-8 flex justify-between h-[88px] px-8 max-[641px]:px-5">
            <div className="flex w-full max-[641px]:justify-between items-center gap-x-4">
              <p className="text-[#858BB2] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                Status
              </p>
              <StatusBtn status={invoice.status} />
            </div>
            <div className="flex items-center gap-x-2 max-[641px]:hidden">
              <button
                onClick={() => {
                  dispatch(editToggle())
                  dispatch(setSingleData(invoice))
                }}
                className="w-[73px] dark:hover:text-[#7E88C3] h-[48px] rounded-[25px] font-bold text-xs hover:bg-[#DFE3FA] transition text-[#7E88C3] dark:bg-[#252945] dark:text-[#DFE3FA] bg-[#F9FAFE]"
              >
                Edit
              </button>
              <Modal id={invoice.id} />

              <MarkButton invoice={invoice} />
            </div>
          </div>
          <div className="bg-[#FFFFFF] dark:bg-[#1E2139] p-12 max-[688px]:px-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base dark:text-[#FFFFFF] text-[#0C0E16] font-bold">
                  <span className="text-[#888EB0]">#</span>
                  {invoice.id}
                </h3>
                <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs mt-2">
                  {invoice.description}
                </p>
              </div>
              <div className="text-[#7E88C3] dark:text-[#DFE3FA] text-end tracking-[-0.23px] text-[11px]">
                <p>{invoice.senderAddress.street}</p>
                <p>{invoice.senderAddress.city}</p>
                <p>{invoice.senderAddress.postCode}</p>
                <p>{invoice.senderAddress.country}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 max-[688px]:grid-cols-2 gap-y-2 mt-[21px] items-start max-[688px]:mt-6">
              <div>
                <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                  Invoice Date
                </p>
                <h3 className="font-bold max-[420px]:text-[14px] dark:text-[#FFFFFF] text-[#0C0E16] mt-3 text-[15px] tracking-[-0.31px]">
                  {invoice.createdAt}
                </h3>
                <div className="mt-6 max-[688px]:mt-5">
                  <p className="text-[#7E88C3] mb-3 dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                    Payment Due
                  </p>
                  <h3 className="font-bold max-[420px]:text-[14px] ruby  dark:text-[#FFFFFF] text-[#0C0E16] text-[15px] tracking-[-0.31px]">
                    {invoice.paymentDue}
                  </h3>
                </div>
              </div>
              <div className="max-[688px]:ml-auto max-[688px]:text-end">
                <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                  Bill To
                </p>
                <h3 className="font-bold text-[calc(0.3vw+0.6rem)] mt-3 dark:text-[#FFFFFF] text-[#0C0E16] tracking-[-0.31px]">
                  {invoice.clientName}
                </h3>
                <div className="grid gap-y-1 mt-2 max-[688px]:mt-5">
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[11px] tracking-[-0.25px]">
                    {invoice.clientAddress.street}
                  </p>
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[11px] tracking-[-0.25px]">
                    {invoice.clientAddress.city}
                  </p>
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[11px] tracking-[-0.25px]">
                    {invoice.clientAddress.postCode}
                  </p>
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[11px] tracking-[-0.25px]">
                    {invoice.clientAddress.country}
                  </p>
                </div>
              </div>

              <div className="max-[688px]:mt-9">
                <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
                  Sent to
                </p>
                <p className="font-bold text-[#0C0E16] dark:text-[#FFFFFF] text-[calc(0.3vw+0.6rem)] mt-3 tracking-[-0.31px]">
                  {invoice.clientEmail}
                </p>
              </div>
            </div>
            <div className="bg-[#F9FAFE] dark:bg-[#252945] p-8 mt-11 max-[795px]:p-5">
              <div className="grid grid-cols-2">
                <div className="gap-y-8 grid">
                  <p className="text-[#7E88C3] dark:text-[#DFE3FA] max-[795px]:hidden text-[11px] tracking-[-0.25px]">
                    Item Name
                  </p>

                  {invoice.items?.map((item) => (
                    <h4
                      key={nanoid()}
                      className="font-bold dark:text-[#FFFFFF] text-[#0C0E16] w-max text-xs tracking-[-0.25px]"
                    >
                      {item.name}

                      <p
                        key={nanoid()}
                        className="font-bold mt-2 hidden max-[795px]:block text-[#7E88C3] text-xs tracking-[-0.25px]"
                      >
                        {item.quantity} x £ {item.price}
                      </p>
                    </h4>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-x-16 max-[795px]:contents">
                  <div className="gap-y-8 grid text-center max-[795px]:hidden">
                    <p className="text-[#7E88C3] dark:text-[#DFE3FA] max-[795px]:hidden text-[11px] tracking-[-0.25px]">
                      QTY.
                    </p>
                    {invoice.items?.map((item) => (
                      <p
                        key={nanoid()}
                        className="font-bold dark:text-[#DFE3FA] text-[#7E88C3] text-xs tracking-[-0.25px]"
                      >
                        {item.quantity}
                      </p>
                    ))}
                  </div>
                  <div className="gap-y-8 grid text-right max-[795px]:hidden">
                    <p className="text-[#7E88C3] dark:text-[#DFE3FA] max-[795px]:hidden text-[11px] tracking-[-0.25px]">
                      Price
                    </p>
                    {invoice.items?.map((item) => (
                      <p
                        key={nanoid()}
                        className="font-bold max-[795px]:hidden ruby text-[#7E88C3] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]"
                      >
                        £ {item.price}
                      </p>
                    ))}
                  </div>
                  <div className="gap-y-8 grid text-right items-center">
                    <p className="text-[#7E88C3] max-[795px]:hidden text-[11px] dark:text-[#DFE3FA] tracking-[-0.25px]">
                      Total
                    </p>
                    {invoice.items?.map((item) => (
                      <p
                        key={nanoid()}
                        className="font-bold dark:text-[#FFFFFF] ruby text-[#0C0E16] text-xs tracking-[-0.25px]"
                      >
                        £ {item.total}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#373B53] dark:bg-[#0C0E16] rounded-bl-lg rounded-br-lg p-8 flex justify-between items-center text-base-100 max-[795px]:p-5">
              <p className="text-[11px]  tracking-[-0.23px] text-white">
                Amount Due
              </p>
              <h2 className="text-[24px] max-[795px]:text-[20px] max-[795px]:tracking-[-0.42px] text-white tracking-[-0.5px] font-bold">
                £ {invoice.total}
              </h2>
            </div>
          </div>
          <div className="w-full hidden mb-[22px] max-[641px]:block mt-10">
            <div className="flex items-center justify-between gap-x-2 ">
              <button
                onClick={() => {
                  dispatch(editToggle())
                  dispatch(setSingleData(invoice))
                }}
                className="px-5 py-4 text-[11px] rounded-[25px] font-bold text-xs transition dark:hover:text-[#7E88C3] dark:bg-[#252945] hover:bg-[#DFE3FA] dark:text-[#DFE3FA] bg-[#f0f0f0]"
              >
                Edit
              </button>
              <div className="flex items-center gap-x-2">
                <ModalBottom id={invoice.id} />
                <MarkButton invoice={invoice} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default InvoicesDetail
