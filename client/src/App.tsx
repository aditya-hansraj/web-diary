import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/SIgnUp";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/theme.context.tsx";
import { useAuth } from "./contexts/auth.context.tsx";
import Footer from "./components/Footer.tsx";
import NotFound from "./pages/NotFound.tsx";
import DiaryEntries from "./pages/DiaryEntries";
import { EntryProvider } from "./contexts/entry.context.tsx";
import AddEntry from "./pages/AddEntry.tsx";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <ThemeProvider>
      <EntryProvider>
        <BrowserRouter>
          <div className="main-content">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
              />
              <Route
                path="/diaries"
                element={
                  // isAuthenticated ? 
                  <DiaryEntries /> 
                  // : <Navigate to="/" />
                }
              />
              <Route
                path="/addentry"
                element={
                  isAuthenticated ? <AddEntry /> : <Navigate to="/" />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </EntryProvider>
    </ThemeProvider>
  );
}

export default App;
