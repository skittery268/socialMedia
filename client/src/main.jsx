import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './providers/AuthProvider.jsx'
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from 'react-router';
import { PostProvider } from './providers/PostProvider.jsx';
import { LikeProvider } from './providers/LikeProvider.jsx';
import { CommentProvider } from './providers/CommentProvider.jsx';
import { ChatProvider } from './providers/ChatProvider.jsx';
import { UserProvider } from './providers/UserProvider.jsx';
import { MessageProvider } from './providers/MessageProvider.jsx';
import { GroupProvider } from './providers/GroupProvider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PostProvider>
        <LikeProvider>
          <CommentProvider>
            <ChatProvider>
              <UserProvider>
                <MessageProvider>
                  <GroupProvider>
                    <App />
                    <ToastContainer position='bottom-left' />
                  </GroupProvider>
                </MessageProvider>
              </UserProvider>
            </ChatProvider>
          </CommentProvider>
        </LikeProvider>
      </PostProvider>
    </AuthProvider>
  </BrowserRouter>
)
