import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.jsx'
import { AuthProvider } from './providers/AuthProvider.jsx'
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from 'react-router';
import { PostProvider } from './providers/PostProvider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PostProvider>
        <App />
        <ToastContainer position='bottom-left' />
      </PostProvider>
    </AuthProvider>
  </BrowserRouter>
)
