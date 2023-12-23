import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@material-tailwind/react";
import App from './App.tsx'
import './index.css'
import store from './redux/configStore';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import NavigateSetter from './context/NavigateSetter.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
        <NavigateSetter />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  </AuthProvider>

)
