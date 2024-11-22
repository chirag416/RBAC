import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;