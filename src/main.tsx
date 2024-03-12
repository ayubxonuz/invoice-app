import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import {Provider} from "react-redux"
import {store} from "./redux/store.ts"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// const mode = localStorage.getItem("mode")
// function theme() {
//   if (mode === "dark") {
//     return "dark"
//   } else {
//     return "light"
//   }
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <ToastContainer draggable limit={3} />
  </Provider>
)
