import { Route, Routes } from "react-router";
import "./App.css";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import SavedPage from "./components/Main/pages/SavedPage";
import ProfilePage from "./components/Main/pages/ProfilePage";
import NotFoundPage from "./components/Main/pages/NotFoundPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Any URL that didn't match above shows the 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
