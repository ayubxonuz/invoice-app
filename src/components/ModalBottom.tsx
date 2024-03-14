import {fetchDelete} from "../redux/invoiceSlice"
import {useNavigate} from "react-router-dom"
import {useState} from "react"
import {useAppDispatch} from "../redux/store"
import {toast} from "sonner"

type modalProps = {
  id: string
}

function ModalBottom({id}: modalProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id: string) => {
    setLoading(true)
    dispatch(fetchDelete(id))
      .then(() => {
        navigate("/")
        toast.success("Invoice deleted successfully !")
        setLoading(false)
      })
      .catch((error: any) => {
        setLoading(false)
        toast.error(error.message)
      })
  }

  return (
    <>
      <button
        className="w-[89px] max-[600px]:w-auto max-[600px]:px-5 max-[600px]:py-4 max-[600px]:text-[11px] max-[600px]:h-auto transition hover:bg-[#FF9797] h-[48px] text-xs bg-[#EC5757] text-white rounded-[25px] font-bold"
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_3"
          ) as HTMLDialogElement | null
          modal?.showModal()
        }}
      >
        Delete
      </button>

      <dialog id="my_modal_3" className="modal p-7">
        <div className="modal-box p-8 max-w-[400px] w-full bg-[#FFFFFF] dark:bg-[#1E2139]">
          <h3 className="font-bold text-[#0C0E16] dark:text-[#FFFFFF] text-[20px] mb-[13px] tracking-[-0.5px]">
            Confirm Deletion
          </h3>
          <p className="text-[#888EB0] dark:text-[#DFE3FA] text-xs tracking-[-0.25px]">
            Are you sure you want to delete invoice #XM9141? This action cannot
            be undone.
          </p>
          <div className="flex justify-end gap-x-3 mt-4">
            <form method="dialog">
              <button className="h-[48px] hover:text-[#7E88C3] hover:bg-[#DFE3FA] p-6 flex items-center rounded-[25px] text-[#7E88C3] dark:text-[#DFE3FA] bg-[#F9FAFE] dark:bg-[#252945] font-bold text-xs transition">
                Cancel
              </button>
            </form>

            {loading ? (
              <button className="p-6 items-center btn-disabled opacity-75 flex text-xs tracking-[-0.25px] transition h-[48px] gap-x-3 text-[#FFFFFF] bg-[#EC5757] rounded-[25px] font-bold">
                Delete <span className="loading loading-xs"></span>
              </button>
            ) : (
              <button
                onClick={() => handleDelete(id)}
                className="p-6 flex items-center text-xs tracking-[-0.25px] transition hover:bg-[#FF9797] h-[48px] text-[#FFFFFF] bg-[#EC5757] rounded-[25px] font-bold"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}

export default ModalBottom
