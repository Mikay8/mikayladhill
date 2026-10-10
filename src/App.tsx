import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import CaseStudy from './pages/CaseStudy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/case-studies/:slug" element={<CaseStudy />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
