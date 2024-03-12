import {Outlet} from "react-router-dom"
import SideBar from "../components/SideBar"
import Drawer from "../components/Drawer"

function RootLayout() {
  return (
    <>
      <div className="flex max-[1040px]:mt-[56px] ">
        <SideBar />
        <Drawer />
      </div>
      <div className="maxContainer">
        <Outlet />
      </div>
    </>
  )
}

export default RootLayout
