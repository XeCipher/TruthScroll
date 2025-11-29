import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Feed from './pages/Feed';
import Search from './pages/Search';
import Profile from './pages/Profile';
import SplashScreen from './components/SplashScreen';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </MainLayout>
      </Router>
    </>
  )
}

export default App;