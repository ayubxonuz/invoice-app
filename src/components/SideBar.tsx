import {useEffect} from "react"

function SideBar() {
  useEffect(() => {
    const mode = localStorage.getItem("mode")

    if (mode) {
      document.documentElement.dataset.mode = mode
    }
  }, [])

  const toggleMode = () => {
    const currentMode = document.documentElement.dataset.mode
    const newMode = currentMode === "dark" ? "light" : "dark"
    document.documentElement.dataset.mode = newMode
    localStorage.setItem("mode", newMode)
  }

  return (
    <div className="bg-[#373B53] dark:bg-[#1E2139] max-[1040px]:bottom-auto max-[1040px]:w-full max-[1040px]:flex max-[1040px]:rounded-none max-[1040px]:h-20 max-[1040px]:justify-between h-auto fixed bottom-0 top-0 max-h-full w-[103px] rounded-br-[20px] rounded-tr-[20px] grid z-30">
      <div className="max-[1040px]:w-20">
        <img src="/sideBarImg.svg" alt="" />
      </div>
      <div className="grid max-[1040px]:mx-8 max-[1040px]:gap-x-8 max-[1040px]:flex justify-items-center content-end">
        <img
          onClick={toggleMode}
          className="mb-8 max-[1040px]:w-5 cursor-pointer max-[1040px]:m-0"
          src="/moon.svg"
          alt=""
        />
        <p className="border w-full max-[1040px]:h-full max-[1040px]:w-[2px] border-[#494E6E]"></p>
        <img
          className="my-6 max-[1040px]:m-0 max-[1040px]:w-8"
          width={50}
          height={50}
          src="/user.svg"
          alt=""
        />
      </div>
    </div>
  )
}

export default SideBar
