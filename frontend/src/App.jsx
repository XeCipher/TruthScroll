import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <div className="bg-truth-bg min-h-screen font-sans text-truth-text">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<div className='p-10 text-center font-bold text-gray-500 mt-20'>Profile Page (Coming Soon)</div>} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  )
}

export default App;
