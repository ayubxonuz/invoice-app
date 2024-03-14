function Nothing() {
  return (
    <div className="mt-36 grid justify-items-center">
      <img width={241} height={200} src="/nothing.svg" alt="" />
      <h4 className="text-[#0C0E16] dark:text-[#FFFFFF] mt-16 text-xl font-bold tracking-[-0.63px]">
        There is nothing here
      </h4>
      <p className="max-w-[220px] dark:text-[#DFE3FA] mt-6 w-full tracking-[-0.25px] text-[#888EB0] text-xs text-center">
        Create an invoice by clicking the{" "}
        <span className="font-bold">New Invoice</span> button and get started
      </p>
    </div>
  )
}

export default Nothing
