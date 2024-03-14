import {NavArrowRight} from "iconoir-react"
import StatusBtn from "./button/StatusBtn"
import {allInterface} from "../interface/interfaceData"
import {Link} from "react-router-dom"

type invoiceProps = {
  data: allInterface
}

function Invoice({data}: invoiceProps) {
  return (
    <Link to={`/invoice/${data?.id}`}>
      <div className="max-w-full border border-white hover:border-[#48549F] transition rounded-lg max-[760px]:px-6 py-4 mb-4 w-full dark:bg-[#1E2139] dark:border-[#1E2139] bg-white px-8">
        <div className="flex items-center h-full">
          <div className="flex max-[795px]:block h-full items-center gap-x-11">
            <p className="font-bold w-16 text-start max-[760px]:mb-6 text-xs justify-items-start dark:text-[#FFFFFF] text-[#0C0E16] tracking-[-0.25px]">
              <span className="text-[#7E88C3]">#</span>
              {data?.id}
            </p>
            <div className="flex max-[795px]:block items-center">
              <p className="text-xs w-36 ruby max-[760px]:w-full dark:text-[#DFE3FA] text-start  text-[#888EB0]  tracking-[-0.25px]">
                {data?.paymentDue}
              </p>
              <p className="text-[#858BB2] dark:text-[#FFFFFF] text-xs tracking-[-0.25px]">
                {data?.clientName.length > 16
                  ? data?.clientName?.slice(0, 13) + "..."
                  : data.clientName}
              </p>
            </div>
          </div>
          <div className="flex max-[760px]:grid items-center max-[760px]:justify-items-end ml-auto max-[760px]:gap-y-6">
            <p className="font-bold text-[#0C0E16] dark:text-[#FFFFFF] max-[760px]:mr-0 tracking-[-0.8px] mr-10">
              £ {data?.total?.toLocaleString("en-US")}
            </p>
            <div className="flex items-center max-[760px]:mr-0 clear-start mr-5">
              <StatusBtn status={data?.status} />
            </div>
          </div>
          <NavArrowRight
            width={19}
            height={19}
            className="text-[#7C5DFA] max-[760px]:hidden"
          />
        </div>
      </div>
    </Link>
  )
}

export default Invoice
