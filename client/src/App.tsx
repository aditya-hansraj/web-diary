import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/SIgnUp';
import Navbar from './components/Navbar';
import { ThemeProvider } from './contexts/theme.context.tsx';
import { useAuth } from './contexts/auth.context.tsx';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
      </Routes> 
      <div className='position-fixed top-0 w-100'>
        <Navbar />
      </div>
    </ThemeProvider>
  )
}

export default App
