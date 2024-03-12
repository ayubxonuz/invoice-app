type btnProps = {
  status: string
}
function StatusBtn({status}: btnProps) {
  return (
    <>
      {status == "paid" && (
        <button className="w-[114px] justify-center bg-[#33D69F] bg-opacity-[6%] py-3 px-7 flex gap-x-2 text-[#33D69F] text-xs font-bold rounded-md">
          <span className="mb-0">●</span>
          Paid
        </button>
      )}
      {status == "draft" && (
        <button className="w-[114px] dark:text-[#DFE3FA] justify-center bg-[#373B53] bg-opacity-[6%] py-3 px-7 text-[#373B53] flex gap-x-2  text-xs font-bold rounded-md">
          <span className="mb-0">●</span>
          Draft
        </button>
      )}
      {status == "pending" && (
        <button className="w-[114px] justify-center bg-[#FF8F00] bg-opacity-[6%] py-3 px-7 flex gap-x-2 text-[#FF8F00] text-xs font-bold rounded-md">
          <span className="mb-0">●</span>
          Pending
        </button>
      )}
    </>
  )
}

export default StatusBtn
