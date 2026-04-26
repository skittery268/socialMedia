import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.jsx'
import { AuthProvider } from './providers/AuthProvider.jsx'
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from 'react-router';
import { PostProvider } from './providers/PostProvider.jsx';
import { LikeProvider } from './providers/LikeProvider.jsx';
import { CommentProvider } from './providers/CommentProvider.jsx';
import { ChatProvider } from './providers/ChatProvider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PostProvider>
        <LikeProvider>
          <CommentProvider>
            <ChatProvider>
              <App />
              <ToastContainer position='bottom-left' />
            </ChatProvider>
          </CommentProvider>
        </LikeProvider>
      </PostProvider>
    </AuthProvider>
  </BrowserRouter>
)
