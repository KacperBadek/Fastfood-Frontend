import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import ProductLoader from './components/ProductLoader.jsx'
import './index.css'
import {GlobalProvider} from "./GlobalContext.jsx";

createRoot(document.getElementById('root')).render(
    <GlobalProvider>
        <ProductLoader/>
        <App/>
    </GlobalProvider>
)
