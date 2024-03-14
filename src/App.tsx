import {RouterProvider, createBrowserRouter} from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Home from "./pages/Home"
import InvoicesDetail from "./pages/InvoicesDetail"
import {useEffect} from "react"
import {fetchData} from "./redux/invoiceSlice"
import {useAppDispatch} from "./redux/store"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchData('https://invoicesdata.onrender.com/data'))
  }, [dispatch])

  const routest = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/invoice/:id",
          element: <InvoicesDetail />,
        },
      ],
    },
  ])
  return <RouterProvider router={routest} />
}

export default App
