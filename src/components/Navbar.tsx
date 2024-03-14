import {NavLink} from "react-router-dom"
import {fetchData, toggleFunc} from "../redux/invoiceSlice"
import {NavArrowUp} from "iconoir-react"
import {useAppDispatch} from "../redux/store"
import {useSelector} from "react-redux"
import {RootState} from "../interface/interfaceData"
import {useEffect, useState} from "react"

function Navbar() {
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState(() => "all")
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
  }

  useEffect(() => {
    let statusParams = ""
    if (status !== "all") {
      statusParams = `status=${status}`
    }
    dispatch(
      fetchData(`https://invoicesdata.onrender.com/data?${statusParams}`)
    )
  }, [status, dispatch])
  const {allData, toggleSideBar} = useSelector(
    (store: RootState) => store.invoiceSlice
  )

  useEffect(() => {
    if (toggleSideBar) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [toggleSideBar])
  return (
    <div className="flex justify-between items-center max-[1040px]:mt-[56px] max-[570px]:mt-8">
      <div>
        <NavLink
          className="font-bold text-black dark:text-[#FFFFFF] tracking-[-1px] text-[32px] max-[570px]:text-[20px] max-[570px]:tracking-[-0.63px]"
          to={"/"}
        >
          Invoices
        </NavLink>
        <p className="text-xs text-[#888EB0] dark:text-[#DFE3FA] max-[570px]:hidden tracking-[-0.25px]">
          There are {allData?.length ? allData.length : 0} total invoices
        </p>
        <p className="text-xs text-[#888EB0] hidden max-[570px]:block tracking-[-0.25px]">
          {allData?.length} invoices
        </p>
      </div>
      <div className="flex items-center gap-x-6 max-[570px]:gap-x-[18px]">
        <div className="dropdown max-[570px]:dropdown-end max-[570px]:w-min w-44 font-bold text-[12px] mt-2">
          <div className="max-[570px]:hidden" tabIndex={0} role="button">
            <div className="flex gap-x-2 dark:text-[#FFFFFF] text-black max-[570px]:justify-end">
              Filter by status
              <NavArrowUp color="#888EB0" />
            </div>
          </div>
          <div className="hidden max-[570px]:block" tabIndex={0} role="button">
            <div className="flex dark:text-[#FFFFFF] text-black gap-x-2 max-[570px]:justify-end">
              Filter
              <NavArrowUp color="#888EB0" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content  z-[1] menu p-2 shadow text-black bg-white dark:bg-[#252945] dark:text-[#FFFFFF] rounded-box w-56"
          >
            <label className="label cursor-pointer gap-x-3 justify-start">
              <input
                checked={status === "draft"}
                onChange={() => handleStatusChange("draft")}
                type="checkbox"
                className="checkbox checkbox-info"
              />
              <span className="text-[12px]">Draft</span>
            </label>
            <label className="label cursor-pointer gap-x-3 justify-start">
              <input
                checked={status === "pending"}
                onChange={() => handleStatusChange("pending")}
                type="checkbox"
                className="checkbox checkbox-info"
              />
              <span className="text-[12px]">Pending</span>
            </label>
            <label className="label cursor-pointer gap-x-3 justify-start">
              <input
                checked={status === "paid"}
                onChange={() => handleStatusChange("paid")}
                type="checkbox"
                className="checkbox checkbox-info"
              />
              <span className="text-[12px]">Paid</span>
            </label>
            <label className="label cursor-pointer gap-x-3 justify-start">
              <input
                checked={status === "all"}
                onChange={() => handleStatusChange("all")}
                type="checkbox"
                className="checkbox checkbox-info"
              />
              <span className="text-[12px]">All Status</span>
            </label>
          </ul>
        </div>
        <button
          onClick={() => dispatch(toggleFunc())}
          className="bg-[#7C5DFA] hover:bg-[#967cff] transition max-[570px]:hidden max-w-[150px] w-full text-base-200 text-xs font-bold tracking-[-0.25px] h-[48px] px-2 rounded-3xl items-center"
        >
          <h1 className="flex text-white items-center gap-x-3">
            <img src="/add.svg" alt="Add photo" />
            New Invoice
          </h1>
        </button>
        <button
          onClick={() => dispatch(toggleFunc())}
          className="bg-[#7C5DFA] hidden max-[570px]:block text-base-100 text-xs font-bold tracking-[-0.25px] h-[48px] pr-2 rounded-3xl items-center"
        >
          <h1 className="flex text-white items-center gap-x-3 px-[6px]">
            <img src="/add.svg" alt="Add photo" />
            New
          </h1>
        </button>
      </div>
    </div>
  )
}

export default Navbar
