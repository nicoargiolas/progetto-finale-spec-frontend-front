// Importazione Route
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importazione layout
import DefaultLayout from "./layouts/DefaultLayout";

// Importazione provider
import GlobalProvider from "./context/GlobalContext";

// Importazione pagine
import HomePage from './pages/HomePage';
import PlayerDetails from "./pages/PlayerDetail";
import ComparePage from "./pages/ComparePage";
import Favorites from "./pages/Favorites";

// Importazione CSS
import './App.css'

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/players/:id" element={<PlayerDetails />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
