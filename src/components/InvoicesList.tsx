import {useEffect} from "react"
import {useSelector} from "react-redux"
import {fetchData} from "../redux/invoiceSlice"
import Invoice from "./Invoice"
import {RootState, allInterface} from "../interface/interfaceData"
import {nanoid} from "@reduxjs/toolkit"
import Loading from "./Loading"
import {useAppDispatch} from "../redux/store"

function InvoicesList() {
  const {allData, loading} = useSelector(
    (store: RootState) => store.invoiceSlice
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

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
      </div>
    </>
  )
}

export default InvoicesList
