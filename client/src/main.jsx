// React tools
import { createRoot } from 'react-dom/client'

// React Router
import { BrowserRouter } from 'react-router';

// App
import App from './App.jsx'

// Toastify
import { ToastContainer } from "react-toastify";

// Providers
import { AuthProvider } from './providers/AuthProvider.jsx'
import { PostProvider } from './providers/PostProvider.jsx';
import { LikeProvider } from './providers/LikeProvider.jsx';
import { CommentProvider } from './providers/CommentProvider.jsx';
import { ChatProvider } from './providers/ChatProvider.jsx';
import { UserProvider } from './providers/UserProvider.jsx';
import { MessageProvider } from './providers/MessageProvider.jsx';
import { GroupProvider } from './providers/GroupProvider.jsx';
import { FriendProvider } from './providers/FriendProvider.jsx';
import { SearchProvider } from './providers/SearchProvider.jsx';
import { AdminProvider } from './providers/AdminProvider.jsx';

// CSS
import "./main.css";

// Connect all context providers to the app
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
                    <FriendProvider>
                      <SearchProvider>
                        <AdminProvider>
                          <App />
                          <ToastContainer position='bottom-left' />
                        </AdminProvider>
                      </SearchProvider>
                    </FriendProvider>
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
