import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { SavedUsersPage } from './pages/SavedUsersPage';
import { store } from './store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/saved" element={<Layout><SavedUsersPage /></Layout>} />
              <Route path="/profile/:email" element={<Layout><ProfilePage /></Layout>} />
            </Routes>
          </div>
        </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
