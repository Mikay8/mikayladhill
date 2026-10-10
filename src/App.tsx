import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import CaseStudy from './pages/CaseStudy';

// Old /case-studies/:slug links keep working.
function LegacyProjectRedirect() {
  const { slug } = useParams();
  const { hash } = useLocation();
  return <Navigate to={`/projects/${slug}${hash}`} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<CaseStudy />} />
      <Route path="/case-studies/:slug" element={<LegacyProjectRedirect />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
