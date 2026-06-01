import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Discovery from './pages/Discovery';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import EditProfile from './pages/EditProfile';
import SafetySettings from './pages/SafetySettings';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chat/:matchId" element={<Chat />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/safety" element={<SafetySettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
