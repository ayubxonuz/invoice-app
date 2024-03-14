import {useState} from "react"
import {allInterface} from "../../interface/interfaceData"
import {fetchUpdate, setSingleData} from "../../redux/invoiceSlice"
import {useAppDispatch} from "../../redux/store"
import {toast} from "sonner"

type propsMark = {
  invoice: allInterface
}

function MarkButton({invoice}: propsMark) {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  return (
    <>
      {loading ? (
        <button
          disabled
          className="w-[151px] gap-x-2 pl-5 flex items-center text-xs transition opacity-60 h-[48px] text-[#FFFFFF] bg-[#7C5DFA] rounded-[25px] font-bold"
        >
          Mark as Paid <span className="loading"></span>
        </button>
      ) : (
        <button
          onClick={async () => {
            if (invoice.status === "paid") {
              return toast.warning("Mark's status has already been paid !")
            }

            try {
              setLoading(true)
              await dispatch(
                fetchUpdate({
                  id: invoice.id,
                  createdAt: invoice.createdAt,
                  paymentDue: invoice.paymentDue,
                  description: invoice.description,
                  paymentTerms: invoice.paymentTerms,
                  clientName: invoice.clientName,
                  clientEmail: invoice.clientEmail,
                  status: "paid",
                  senderAddress: {
                    city: invoice.senderAddress.city,
                    country: invoice.senderAddress.country,
                    postCode: invoice.senderAddress.postCode,
                    street: invoice.senderAddress.street,
                  },
                  clientAddress: {
                    city: invoice.clientAddress.city,
                    country: invoice.clientAddress.country,
                    postCode: invoice.clientAddress.postCode,
                    street: invoice.clientAddress.street,
                  },
                })
              ).then(() => {
                setLoading(false)
                dispatch(setSingleData(invoice))
                toast.success("Mark changed successfully !")
              })
            } catch (error: any) {
              setLoading(false)
              toast.error(error)
            }
          }}
          className="w-[131px] text-xs hover:bg-[#9277FF] transition h-[48px] text-[#FFFFFF] bg-[#7C5DFA] rounded-[25px] font-bold"
        >
          Mark as Paid
        </button>
      )}
    </>
  )
}

export default MarkButton
