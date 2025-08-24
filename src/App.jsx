import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import CommunityPage from '@/pages/CommunityPage';
import PlaydatesPage from '@/pages/PlaydatesPage';
import CarePoolPage from '@/pages/CarePoolPage';
import ResourcesPage from '@/pages/ResourcesPage';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <Helmet>
              <title>The Village: App - Connect, Support, Thrive</title>
              <meta name="description" content="A secure community platform for parents of special needs children to find trusted connections, arrange playdates, and access mutual support." />
              <meta property="og:title" content="The Village: App - Connect, Support, Thrive" />
              <meta property="og:description" content="A secure community platform for parents of special needs children to find trusted connections, arrange playdates, and access mutual support." />
            </Helmet>
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              } />
              <Route path="/playdates" element={
                <ProtectedRoute>
                  <PlaydatesPage />
                </ProtectedRoute>
              } />
              <Route path="/care-pool" element={
                <ProtectedRoute>
                  <CarePoolPage />
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <ResourcesPage />
                </ProtectedRoute>
              } />
            </Routes>
            
            <Toaster />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;