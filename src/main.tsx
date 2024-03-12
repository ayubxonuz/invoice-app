import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import {Provider} from "react-redux"
import {store} from "./redux/store.ts"
import {Toaster} from "sonner"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster
      position="top-center"
      richColors
      visibleToasts={1}
      duration={2500}
    />
  </Provider>
)
