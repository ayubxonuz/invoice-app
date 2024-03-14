import {useEffect} from "react"
import {useSelector} from "react-redux"
import {fetchData} from "../redux/invoiceSlice"
import Invoice from "./Invoice"
import {RootState, allInterface} from "../interface/interfaceData"
import {nanoid} from "@reduxjs/toolkit"
import Loading from "./Loading"
import {useAppDispatch} from "../redux/store"
import Nothing from "./Nothing"

function InvoicesList() {
  const {allData, loading, singleData} = useSelector(
    (store: RootState) => store.invoiceSlice
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchData("https://invoicesdata.onrender.com/data"))
  }, [dispatch, singleData])

  return (
    <>
      {loading && (
        <div className="mt-4">
          <Loading />
        </div>
      )}
      <div className="mt-16">
        {allData &&
          allData.map((data: allInterface) => {
            return <Invoice key={nanoid()} data={data} />
          })}
        {allData?.length == 0 && <Nothing />}
      </div>
    </>
  )
}

export default InvoicesList
