import {toggleFunc} from "../redux/invoiceSlice"
import {useAppDispatch} from "../redux/store"

function ItemListInput() {
  const dispatch = useAppDispatch()

  return (
    <>
      <div className="mt-8">
        <p className="text-[#777F98] font-bold text-[18px] tracking-[-0.38px]">
          Item List
        </p>
        <div className="flex mb-[18px] gap-x-4">
          <div>
            <p className="text-[#7E88C3] my-4 text-xs tracking-[-0.25px]">
              Item Name
            </p>
            <input
              type="text"
              placeholder="Type here"
              className="input mb-[18px] input-bordered font-bold text-xs input-md w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered font-bold text-xs input-md w-full max-w-xs"
            />
          </div>
          <div>
            <p className="text-[#7E88C3] my-4 text-xs tracking-[-0.25px]">
              Qty.
            </p>
            <input
              type="text"
              placeholder="1"
              className="input mb-[18px] input-bordered font-bold text-xs input-md w-full max-w-[50px]"
            />
            <input
              type="text"
              placeholder="1"
              className="input input-bordered font-bold text-xs input-md w-full max-w-[50px]"
            />
          </div>
          <div>
            <p className="text-[#7E88C3] my-4 text-xs tracking-[-0.25px]">
              Price
            </p>
            <input
              type="text"
              placeholder="156.00"
              className="input mb-[18px] input-bordered font-bold text-xs input-md w-full max-w-[100px]"
            />
            <input
              type="text"
              placeholder="156.00"
              className="input input-bordered font-bold text-xs input-md w-full max-w-[100px]"
            />
          </div>
          <div className="flex gap-x-9">
            <div>
              <p className="text-[#7E88C3] my-4 text-xs tracking-[-0.25px]">
                Total
              </p>
              <p className="text-[#888EB0] pb-[18px] mt-8 font-bold text-xs tracking-[-0.25px]">
                156.00
              </p>
              <p className="text-[#888EB0] mt-8 font-bold text-xs tracking-[-0.25px]">
                156.00
              </p>
            </div>
          </div>
          <div className="mt-[30px]">
            <img
              className="mt-[30px] pb-[18px]"
              width={30}
              src="/trash.svg"
              alt="Trash photo"
            />
            <img className="mt-[30px]" width={30} src="/trash.svg" alt="" />
          </div>
        </div>
        <button className="bg-[#F9FAFE] w-full h-12 rounded-3xl text-[#7E88C3] font-bold text-xs tracking-[-0.25px] mb-[47px]">
          + Add New Item
        </button>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => dispatch(toggleFunc())}
            className="p-4 tracking-[-0.25px] rounded-[25px] hover:bg-[#DFE3FA] text-[#7E88C3] font-bold text-xs  transition bg-[#F9FAFE]"
          >
            Discard
          </button>
          <div className="flex gap-x-2">
            <button className="p-4 tracking-[-0.25px] rounded-[25px] text-[#888EB0] font-bold text-xs  transition bg-[#373B53]">
              Save as Draft
            </button>
            <button
              type="submit"
              className="p-4 tracking-[-0.25px] rounded-[25px] text-base-100 font-bold text-xs  transition bg-[#7C5DFA]"
            >
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemListInput
