import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Movieprovider } from './context/movieContext';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <Movieprovider>
      {/* <AuthProvider> */}
        <Provider store={store}>
         <App />
      </Provider>
      {/* </AuthProvider> */}
    </Movieprovider>
  </BrowserRouter>
 
)
