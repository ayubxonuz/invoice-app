import {animateScroll} from "react-scroll"
import {useAppDispatch} from "../../redux/store"
import {toggleFunc} from "../../redux/invoiceSlice"

function DiscardButton({loading}: {loading: boolean}) {
  const dispatch = useAppDispatch()
  return (
    <>
      {loading ? (
        <button
          type="button"
          disabled
          className="p-4 cursor-not-allowed max-[422px]:p-3 max-[422px]:text-[11px] opacity-75 tracking-[-0.25px] rounded-[25px] text-[#7E88C3] font-bold text-xs transition bg-[#F9FAFE]"
        >
          Discard
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            animateScroll.scrollToTop({
              duration: 500,
              smooth: true,
            })
            dispatch(toggleFunc())
          }}
          className="p-4 max-[422px]:p-3 max-[422px]:text-[11px]  tracking-[-0.25px] rounded-[25px] text-[#7E88C3] font-bold text-xs transition hover:bg-[#DFE3FA] bg-[#F9FAFE]"
        >
          Discard
        </button>
      )}
    </>
  )
}

export default DiscardButton
