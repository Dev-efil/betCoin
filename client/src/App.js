import './App.css';
import { Route, Routes } from 'react-router-dom';

import Login from './components/auth/login';
import Home from './pages/home';
import Leaderboard from './pages/leaderboard';
import Instruction from './pages/instruction';
import PageNotFound from './pages/pageNotFound';
import ProtectedRoute from './components/auth/protectedRoute';
import MainLayout from './pages/layouts/mainLayout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />} >
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="instruction" element={<Instruction />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
